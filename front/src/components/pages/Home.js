import React, { useEffect } from 'react';
import axios from 'axios';
import TitleCards from './home/TitleCards';
import AnnounceCard from './home/AnnounceCard';
import Banner from '../components/Banner';

export default function Home(props) {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Banner></Banner>
      <div className={'btn btn-primary'} onClick={() => axios.get('/user/me')}>
        버튼
      </div>
      <div className="container">
        {/* 타이틀*/}
        <TitleCards></TitleCards>
        {/* 공고*/}
        <AnnounceCard></AnnounceCard>
      </div>
    </>
  );
}
