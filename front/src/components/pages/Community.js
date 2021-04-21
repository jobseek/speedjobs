import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Banner from '../components/banner/Banner';
import Tags from '../components/Tags';
import { StyledLeftLayout, TagBody } from '../components/Styled';
import Post from '../components/Post';
import { POST_LIST_DONE, POST_LIST_REQUEST } from '../../reducers/post';

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
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);

  useEffect(() => {
    const currentObserver = observe.current;
    const divElm = targetRef.current;
    if (divElm) {
      currentObserver.observe(divElm);
    }
    return () => {
      if (divElm) {
        currentObserver.unobserve(divElm);
      }
    };
  }, []);

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
      id={pl.id}
      tags={['backEnd']}
      title={pl.title}
      writer="아직미구현"
      date={`${pl.createdDate[0]}/${pl.createdDate[1]}/${pl.createdDate[2]}`}
      fav="미구현"
      key={pl.id}
    />
  ));

  return (
    <>
      <Banner />
      <div className={'container'}>
        <div className={'row justify-content-center'}>
          <StyledLeftLayout className={'col-12 col-lg-3 text-left'}>
            <Tags tagList={taglist}>직무</Tags>
          </StyledLeftLayout>

          {/* 게시글*/}
          <div ref={rootRef} className={'col-12 col-lg-9'}>
            <div
              className={'text-right'}
              style={{
                position: 'relative',
                height: '60px',
              }}
            >
              <div
                className={'row justify-content-end'}
                style={{ padding: '10px', paddingTop: '0' }}
              >
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
            {mapPost}
          </div>
          {/* 게시글 end*/}
        </div>
        <div
          style={{ top: '50px', position: 'relative', marginBottom: '100px' }}
          ref={targetRef}
        />{' '}
      </div>
    </>
  );
}
