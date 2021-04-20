import React from 'react';
import TitleCards from './home/TitleCards';
import AnnounceCard from './home/AnnounceCard';
import Banner from '../components/banner/Banner';

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container">
        {/* 타이틀*/}
        <div className="row">
          <TitleCards />
          <TitleCards />
        </div>
        {/* 공고*/}
        <AnnounceCard />
        <AnnounceCard />
      </div>
    </>
  );
}
