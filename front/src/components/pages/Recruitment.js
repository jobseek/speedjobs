import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import Banner from '../components/Banner';
import RecruitCard from '../components/RecruitCard';
import Tags from '../components/Tags';
import Line from '../components/Line';

const RecruitContent = styled.div`
  border-radius: 15px;
  background-color: white;
`;

export default function Recruitment(props) {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
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
      <Banner></Banner>
      <div className="container">
        <div style={{ textAlign: 'start', marginBottom: '10px' }}>
          <Tags tagList={tags}>filter</Tags>
        </div>

        <RecruitContent>{dummyOut}</RecruitContent>
      </div>
    </>
  );
}
