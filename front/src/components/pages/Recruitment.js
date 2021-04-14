import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// import styled from 'styled-components';
import Banner from '../components/banner/Banner';
import Tags from '../components/Tags';
import { StyledLeftLayout, TagBody } from '../components/Styled';
import {
  RECRUIT_LIST_DONE,
  RECRUIT_LIST_REQUEST,
} from '../../reducers/recruit';
import Post from '../components/Post';

// const RecruitContent = styled.div`
//   border-radius: 15px;
//   background-color: white;
// `;

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
  const recruit = useSelector((state) => state.recruit);

  const [, setLoading] = useState(false);
  const [recruitList, setRecruitList] = useState([]);

  const [tags] = useState([
    { name: 'backEnd', id: 0, selected: false },
    { name: 'frontEnd', id: 1, selected: false },
    { name: 'machineLearning', id: 2, selected: false },
    { name: 'infra', id: 3, selected: false },
  ]);

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
      tags={['backEnd']}
      title={pl.title}
      writer="아직미구현"
      date={`${pl.createdDate[0]}/${pl.createdDate[1]}/${pl.createdDate[2]}`}
      fav="미구현"
      key={pl.id}
    />
  ));

  // const dummy = useCallback(() => {
  //   const dummyData = [];
  //
  //   for (let i = 0; i < 10; i++) {
  //     dummyData[i] = {};
  //     dummyData[i].title = i + '번 더미 데이터';
  //     dummyData[i].job = i + '번 더미 데이터 JOB';
  //     dummyData[i].date = '1999.01.01~2021.06.01';
  //     dummyData[i].tag = ['backEnd', 'frontEnd', 'java'];
  //     dummyData[i].favorite = i % 2 === 1 && true;
  //   }
  //   dummyData.push({ title: 'hello' });
  //   dummyData.shift();
  //   dummyData.shift();
  //   return dummyData;
  // }, []);

  // const [dummyData] = useState(dummy);

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
          <StyledLeftLayout className={'col-12 col-lg-3 text-left'}>
            <Tags tagList={tags}>filter</Tags>
          </StyledLeftLayout>
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
                <TagBody
                  style={{ marginTop: '0', border: '1px solid #f5df4d' }}
                  onClick={() => {
                    history.push('./recruitment/add');
                  }}
                >
                  글쓰기
                </TagBody>
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
