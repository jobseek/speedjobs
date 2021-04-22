import React, { useState } from 'react';
import TitleCards from './home/TitleCards';
import AnnounceCard from './home/AnnounceCard';
import Banner from '../components/banner/Banner';

export default function Home() {
  const [info] = useState([
    { title: '네이버 경력직 모집', date: '2021-04-01 ~ 2021-04-30' },
    {
      title: '카카오 경력직 상시모집',
      date: '2021-04-01 ~ 2021-04-30',
    },
    { title: '라인 신입공채 모집', date: '2021-04-01 ~ 2021-04-30' },
    {
      title: '쿠팡 신입, 경력직 모집',
      date: '2021-04-01 ~ 2021-04-30',
    },
  ]);
  const [newest] = useState([
    { title: '안녕하세요.', date: '2021-05-01' },
    { title: '반갑습니다.', date: '2021-04-30' },
    { title: '여기 별로네요ㅋㅋ', date: '2021-04-29' },
    { title: '취업문의', date: '2021-04-28' },
    { title: '별다줄', date: '2021-04-27' },
  ]);
  return (
    <>
      <Banner />
      <div className="container">
        {/* 타이틀*/}
        <div className="row">
          <TitleCards title="공고일정" list={info} />
          <TitleCards title="최신글목록" list={newest} />
        </div>
        {/* 공고*/}
        <AnnounceCard />
      </div>
    </>
  );
}
