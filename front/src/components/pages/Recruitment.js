import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { v4 } from 'uuid';
import Banner from '../components/banner/Banner';
import RecruitCard from '../components/RecruitCard';
import Tags from '../components/Tags';
import Line from '../components/Line';
import { TagBody } from '../components/Styled';

const RecruitContent = styled.div`
  border-radius: 15px;
  background-color: white;
`;

export default function Recruitment(props) {
  const history = useHistory();

  const [update, setUpdate] = useState(0);
  const [tags] = useState([
    { name: 'backEnd', id: 0, selected: false },
    { name: 'frontEnd', id: 1, selected: false },
    { name: 'machineLearning', id: 2, selected: false },
    { name: 'infra', id: 3, selected: false },
  ]);
  // const [tagList, setTagList] = useState([]);

  const dummy = useCallback(() => {
    const dummyData = [];

    for (let i = 0; i < 10; i++) {
      dummyData[i] = {};
      dummyData[i].title = i + '번 더미 데이터';
      dummyData[i].job = i + '번 더미 데이터 JOB';
      dummyData[i].date = '1999.01.01~2021.06.01';
      dummyData[i].tag = ['backEnd', 'frontEnd', 'java'];
      dummyData[i].favorite = i % 2 === 1 && true;
    }
    dummyData.push({ title: 'hello' });
    dummyData.shift();
    dummyData.shift();
    return dummyData;
  }, []);

  const [dummyData] = useState(dummy);

  const dummyOut = dummyData.map((temp) => {
    return (
      <div key={v4()}>
        <RecruitCard
          title={temp.title}
          date={temp.date}
          job={temp.job}
          tags={temp.tag}
          favorite={temp.favorite}
          setFav={(fav) => {
            temp.favorite = fav;
            setUpdate(update + 1);
          }}
        ></RecruitCard>
        <Line margin={'20px'} />
      </div>
    );
  });

  return (
    <>
      <Banner />
      <div className="container">
        <div style={{ textAlign: 'start', marginBottom: '10px' }}>
          <Tags tagList={tags}>filter</Tags>
        </div>
        <div className={'col-12 col-lg-9'}>
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
              {/* <Tags*/}
              {/*  tagList={orderList}*/}
              {/*  style={{ margin: '10px', marginTop: '0' }}*/}
              {/* >*/}
              {/*  조회순*/}
              {/* </Tags>*/}
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
        </div>

        <RecruitContent>{dummyOut}</RecruitContent>
      </div>
    </>
  );
}
