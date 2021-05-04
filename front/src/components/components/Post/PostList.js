import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Post from '../Post';

// 글불러오는 컴포넌트.
// 글을 불러오는 레프 설정.
// typeRequest: '',
//     listLoading: false,
//     done: false,
//     typeDone: '',
//     list: [],
export default function PostList({
  targetRef,
  typeRequest,
  typeDone,
  listLoading,
  done,
  type,
  list,
}) {
  const dispatch = useDispatch();
  const page = useRef(0);
  const prevY = useRef(99999);
  const isLast = useRef(false);

  const { user } = useSelector((state) => state);
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
      type: typeRequest,
      data: {
        size: 10,
        page: page.current,
        type,
      },
    });
  };

  const [, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);

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
  }, [user.me, refresh, targetRef]);

  useEffect(() => {
    if (listLoading) {
      setLoading((prev) => true);
    }
    if (done) {
      setLoading((prev) => false);
      setPostList((prev) => [...prev, ...list.content]);
      if (list.last) {
        isLast.current = true;
      } else {
        page.current++;
      }
      dispatch({ type: typeDone });
    }
  }, [
    setPostList,
    setLoading,
    page,
    dispatch,
    done,
    list,
    listLoading,
    typeDone,
  ]);

  const mapPost = postList.map((pl) => (
    <Post
      type={type}
      id={pl.id}
      tags={[...(pl.tags.SKILL ?? []), ...(pl.tags.POSITION ?? [])]}
      title={pl.title}
      writer={pl.author}
      viewCount={pl.viewCount}
      date={`${pl.createdDate[0]}/${pl.createdDate[1]}/${pl.createdDate[2]}`}
      fav={pl.favorite}
      key={pl.id}
    />
  ));
  return <>{mapPost}</>;
}
