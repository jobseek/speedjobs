import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import Banner from '../components/banner/Banner';
import Tags from '../components/Tags';
import { TagBody } from '../components/Styled';
import Post from '../components/Post';
import { POST_LIST_DONE, POST_LIST_REQUEST } from '../../reducers/post';

export const Blank = styled.div`
  display: inline-block;
  width: 1px;
  height: 25px;
`;

export default function Community(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const page = useRef(0);
  const prevY = useRef(99999);
  const isLast = useRef(false);
  const targetRef = useRef();
  const observe = useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;
        if (prevY.current > y && !isLast.current) {
          loadMore();
        }
        prevY.current = y;
      },
      { threshold: 1 }
    )
  );

  const loadMore = () => {
    dispatch({
      type: POST_LIST_REQUEST,
      data: {
        size: 10,
        page: page.current,
      },
    });
  };
  const rootRef = useRef();
  const { post, user } = useSelector((state) => state);

  const [, setLoading] = useState(false);
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

  useEffect(() => {
    console.log();
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
  }, [user.me, refresh]);

  useEffect(() => {
    if (post.postListLoading) {
      setLoading((prev) => true);
    }
    if (post.postListDone) {
      setLoading((prev) => false);
      setPostList((prev) => [...prev, ...post.postList.content]);
      if (post.postList.last) {
        isLast.current = true;
      } else {
        page.current++;
      }
      dispatch({ type: POST_LIST_DONE });
    }
  }, [post, setPostList, setLoading, page, dispatch]);

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
              <Tags tagList={taglist} selected={setTaglist}>
                filter
              </Tags>
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
