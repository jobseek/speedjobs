import React, { useState } from 'react';
import TitleCards from './home/TitleCards';
import AnnounceCard from './home/AnnounceCard';
import Banner from '../components/banner/Banner';

export default function Home() {
  const [info] = useState([
    { title: '네이버 경력직 모집중', date: '2021-04-01 ~ 2021-04-30' },
    {
      title: '카카오 경력직 상시모집중',
      date: '2021-04-01 ~ 2021-04-30',
    },
    { title: '라인 신입공채 모집중', date: '2021-04-01 ~ 2021-04-30' },
    {
      title: '쿠팡 신입, 경력직 모집중',
      date: '2021-04-01 ~ 2021-04-30',
    },
  ]);
  const [newest] = useState([
    { title: '안녕하세요.', date: '2021-05-01' },
    { title: '반갑습니다.', date: '2021-04-30' },
    { title: '여기 어떤가요ㅋㅋ', date: '2021-04-29' },
    { title: '취업문의', date: '2021-04-28' },
    { title: '별다줄', date: '2021-04-27' },
    { title: '메인화면 카드를 꾸며주세요.', date: '2021-04-27' },
  ]);
  return (
    <>
      <Banner />
      <div className="container">
        {/* 타이틀*/}
        <div
          // className="row"
          style={{
            width: '100%',
            textAlign: 'center',
            margin: '60px 0',
          }}
        >
          {/* <TitleCards title="공고일정" list={info} />*/}
          {/* <TitleCards title="최신글목록" list={newest} />*/}
          <b>
            <i style={{ fontSize: '45 px' }}>글이 작품이 되는 공간, 브런치</i>
          </b>
          <br />
          브런치에 담긴 아름다운 작품을 감상해 보세요. 그리고 다시 꺼내 보세요.{' '}
          <br />
          서랍 속 간직하고 있는 글과 감성을. <br />
        </div>
        {/* 공고*/}
        <AnnounceCard />
      </div>
    </>
  );
}
