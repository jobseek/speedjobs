import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
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
      type={'recruit'}
      tags={['backEnd']}
      title={pl.title}
      writer="아직미구현"
      date={`${pl.openDate[0]}/${pl.openDate[1]}/${pl.openDate[2]}`}
      fav="미구현"
      key={pl.id}
    />
  ));

  // const dummyOut = dummyData.map((temp) => {
  //   return (
  //     <div key={v4()}>
  //       <RecruitCard
  //         title={temp.title}
  //         date={temp.date}
  //         job={temp.job}
  //         tags={temp.tag}
  //         favorite={temp.favorite}
  //         setFav={(fav) => {
  //           temp.favorite = fav;
  //           setUpdate(update + 1);
  //         }}
  //       ></RecruitCard>
  //       <Line margin={'20px'} />
  //     </div>
  //   );
  // });

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
