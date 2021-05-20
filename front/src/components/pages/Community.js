import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import Banner from '../components/banner/Banner';
import { Order, SearchBox, TagBody } from '../components/Styled';
import Post from '../components/Post';
import { POST_LIST_DONE, POST_LIST_REQUEST } from '../../reducers/post';
import TagSelector from '../components/tag/TagSelector';
import TagShower from '../components/tag/TagShower';
import { RECRUIT_LIST_REQUEST } from '../../reducers/recruit';

export const Blank = styled.div`
  display: inline-block;
  width: 1px;
  height: 25px;
`;

export default function Community(props) {
  const postOrder = [
    { name: '조회순', sort: 'viewCount' },
    { name: '추천순', sort: 'favoriteCount' },
    { name: '댓글순', sort: 'commentCount' },
  ];
  const initialList = [
    { name: '제 목', state: false, target: 'title' },
    { name: '내 용', state: false, target: 'content' },
    { name: '제목+내용', state: false, target: '' },
    { name: '작성자', state: false, target: 'author' },
  ];
  const history = useHistory();
  const dispatch = useDispatch();
  const prevY = useRef(99999);
  const isLast = useRef(false);
  const targetRef = useRef();
  const observe = useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;
        if (prevY.current > y && !isLast.current) {
          if (prevY.current !== 99999) loadMore();
        }
        prevY.current = y;
      },
      { threshold: 1 }
    )
  );
  const newObserve = () => {
    observe.current.unobserve(targetRef.current);
    return new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;
        if (prevY.current > y && !isLast.current) {
          if (prevY.current !== 99999) loadMore();
        }
        prevY.current = y;
      },
      { threshold: 1 }
    );
  };

  // 게시물 목록 불러오기

  const rootRef = useRef();
  const { post, user } = useSelector((state) => state);

  // 태그 정보 불러오기
  const [, setLoading] = useState(false);
  const paging = useRef(false);
  const [postList, setPostList] = useState([]);
  const [taglist, setTaglist] = useState([]);
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION ?? []);
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);
  const [form, setForm] = useState({
    size: 10,
    page: 0,
  });
  useEffect(() => {
    const currentObserver = observe.current;
    const divElm = targetRef.current;
    if (refresh['REFRESH_TOKEN'] === undefined || user.me !== null) {
      if (divElm) {
        currentObserver.observe(divElm);
      }
    }
    return () => {
      if (divElm) {
        currentObserver.unobserve(divElm);
      }
    };
  }, [user.me, refresh, form, observe.current]);

  useEffect(() => {
    if (post.postListLoading) {
      setLoading((prev) => true);
    }
    if (post.postListDone) {
      setLoading((prev) => false);
      if (paging.current) {
        setPostList((prev) => [...prev, ...post.postList.content]);
      } else {
        setPostList([...post.postList.content]);
      }
      if (post.postList.last) {
        isLast.current = true;
        paging.current = false;
      }
      dispatch({ type: POST_LIST_DONE });
      observe.current = newObserve();
    }
  }, [post, setPostList, setLoading, dispatch]);

  useEffect(() => {
    setForm((p) => {
      const ids = taglist
        .filter((t) => t.selected)
        .map((t) => t.id)
        .join(',');
      if (ids === '') {
        // eslint-disable-next-line
        const { tagIds, ...res } = p;
        return { ...res, page: 0 };
      } else {
        return { ...p, page: 0, tagIds: ids };
      }
    });
  }, [taglist, dispatch]);

  useEffect(() => {
    dispatch({
      type: POST_LIST_REQUEST,
      data: form,
    });
    paging.current = false;
    isLast.current = false;
    observe.current.unobserve(targetRef.current);
    // eslint-disable-next-line
  }, [form.tagIds, dispatch, form.order]);

  const mapPost = postList.map((pl) => (
    <Post
      type={'community'}
      id={pl.id}
      tags={[...(pl.tags.SKILL ?? []), ...(pl.tags.POSITION ?? [])]}
      title={pl.title}
      writer={pl.author}
      commentCount={pl.commentCount}
      viewCount={pl.viewCount}
      favoriteCount={pl.favoriteCount}
      date={`${pl.createdDate[0]}/${pl.createdDate[1]}/${pl.createdDate[2]}`}
      fav={pl.favorite}
      key={pl.id}
    />
  ));

  // 게시물 검색하기
  const OrderHandler = (sort) => {
    setForm({ ...form, order: sort, page: 0 });
  };
  const InputHandler = (e, i) => {
    setForm((p) => ({
      size: p.size,
      page: 0,
      [i.target]: e.target.value,
    }));
  };
  const SearchHandler = () => {
    dispatch({
      type: POST_LIST_REQUEST,
      data: form,
    });
    isLast.current = false;
    paging.current = false;
  };
  const EnterHandler = (e) => {
    if (e.key === 'Enter') SearchHandler();
  };
  const loadMore = useCallback(() => {
    dispatch({
      type: POST_LIST_REQUEST,
      data: { ...form, page: form.page + 1 },
    });
    paging.current = true;
  }, [paging.current, dispatch, form]);

  return (
    <>
      <Banner />
      <div className={'container'}>
        {/* 게시글*/}
        <div ref={rootRef}>
          <div
            className={'text-right'}
            style={{
              position: 'relative',
              height: '60px',
            }}
          >
            <div
              className={'row justify-content-between'}
              style={{ padding: '10px', paddingTop: '0' }}
            >
              <div>
                <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                  <Order inOrder={OrderHandler} orderItem={postOrder} />
                </div>
                <div style={{ display: 'inline-block' }}>
                  <TagSelector tagList={taglist} setTagList={setTaglist}>
                    필터
                  </TagSelector>
                </div>
              </div>
              <div>
                <SearchBox
                  onInput={InputHandler}
                  onClick={SearchHandler}
                  onKeyPress={EnterHandler}
                  setForm={setForm}
                  initial={initialList}
                />
                {user.me !== null ? (
                  <TagBody
                    style={{ marginTop: '0', border: '1px solid #f5df4d' }}
                    onClick={() => {
                      history.push('./community/add');
                    }}
                  >
                    글쓰기
                  </TagBody>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className={'text-left'}>
            <TagShower tagList={taglist} setTagList={setTaglist}></TagShower>
          </div>
          <div style={{ height: '30px' }}></div>
          {mapPost}
        </div>
        {/* 게시글 end*/}
      </div>
      <div
        style={{ top: '50px', position: 'relative', marginBottom: '100px' }}
        ref={targetRef}
      />
    </>
  );
}
