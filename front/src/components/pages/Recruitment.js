import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import Banner from '../components/banner/Banner';
import Tags from '../components/Tags';
import { TagBody } from '../components/Styled';
import {
  RECRUIT_LIST_DONE,
  RECRUIT_LIST_REQUEST,
} from '../../reducers/recruit';
import Post from '../components/Post';
import { COMPANY_GET_REQUEST } from '../../reducers/company';

export default function Recruitment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const page = useRef(0);
  const prevY = useRef(99999);
  const isLast = useRef(false);
  const targetRef = useRef();
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
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
      type: RECRUIT_LIST_REQUEST,
      data: {
        size: 10,
        page: page.current,
      },
    });
  };

  const rootRef = useRef();
  const { user, recruit } = useSelector((state) => state);
  const me = useState({ ...user.me });

  const [, setLoading] = useState(false);
  const [recruitList, setRecruitList] = useState([]);
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
    if (recruit.recruitListLoading) {
      setLoading((prev) => true);
    }
    if (recruit.recruitListDone) {
      setLoading((prev) => false);
      setRecruitList((prev) => [...prev, ...recruit.recruitList.content]);
      if (recruit.recruitList.last) {
        isLast.current = true;
      } else {
        page.current++;
      }
      dispatch({ type: RECRUIT_LIST_DONE });
    }
  }, [recruit, setRecruitList, setLoading, page, dispatch]);

  const mapRecruit = recruitList.map((pl) => (
    <Post
      id={pl.id}
      tags={[...(pl.tags.POSITION ?? [])]}
      type={'recruit'}
      title={pl.title}
      writer={pl.companyName}
      date={`${pl.openDate[0]}/${pl.openDate[1]}/${pl.openDate[2]}`}
      fav={pl.favorite}
      key={pl.id}
      viewCount={pl.viewCount}
      favoriteCount={pl.favoriteCount}
    />
  ));

  return (
    <>
      <Banner />
      <div className="container">
        <div className={'row justify-content-center'}>
          {' '}
          <div ref={rootRef} className={'container'}>
            <div
              className={'text-right'}
              style={{
                position: 'relative',
                height: '60px',
              }}
            >
              <div
                className={'row justify-content-between'}
                style={{
                  padding: '10px',
                  paddingTop: '0',
                }}
              >
                <Tags tagList={taglist} selected={setTaglist}>
                  직무
                </Tags>
                {me[0].role === 'ROLE_COMPANY' ? (
                  <TagBody
                    style={{ marginTop: '0', border: '1px solid #f5df4d' }}
                    onClick={() => {
                      history.push('./recruitment/add');
                      dispatch({
                        type: COMPANY_GET_REQUEST,
                        data: user.me,
                      });
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
            {mapRecruit}
          </div>
        </div>
        <div
          style={{ top: '50px', position: 'relative', marginBottom: '100px' }}
          ref={targetRef}
        />
      </div>
    </>
  );
}
