import React, { useCallback, useState } from 'react';
import {
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import RecruitCard from '../components/RecruitCard';
import Line from '../components/Line';

export default function CommunityLike(props) {
  const [update, setUpdate] = useState(0);
  // const [tags] = useState([
  //   { name: 'backEnd', id: 0, selected: false },
  //   { name: 'frontEnd', id: 1, selected: false },
  //   { name: 'machineLearning', id: 2, selected: false },
  //   { name: 'infra', id: 3, selected: false },
  // ]);

  const dummy = useCallback(() => {
    const dummyData = [];

    for (let i = 0; i < 10; i++) {
      dummyData[i] = {};
      dummyData[i].title = i + '번 더미 데이터';
      dummyData[i].job = i + '번 더미 데이터 JOB';
      dummyData[i].date = '1999.01.01~2021.06.01';
      dummyData[i].tag = ['backEnd', 'frontEnd', 'java'];
      dummyData[i].key = i;
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
      <div key={temp.key}>
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
      <div className={'container text-left'}>
        <StyledHeaderDiv padding>
          <div className={'container row justify-content-end'}>
            <div
              className={'col-md-9 col-8'}
              style={{ marginTop: '14px', paddingTop: '5px' }}
            >
              <h5>공고 찜목록</h5>
            </div>
            <div className={'col-md-3 col-4 text-right'}>
              <StyledButton wide>수정</StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        <div style={{ marginTop: '100px' }}>
          <div className="row justify-content-center">
            <StyledLeftLayout
              borderNone
              className={'col-12 col-lg-2 text-left'}
            >
              <SideMenu />
            </StyledLeftLayout>
            <div
              className={'col-12 col-lg-10'}
              style={{ paddingLeft: '60px', paddingRight: '60px' }}
            >
              {/* {mapPost}*/}
              {dummyOut}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
