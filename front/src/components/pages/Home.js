import React from 'react';
import AnnounceCard from './home/AnnounceCard';
import Banner from '../components/banner/Banner';

export default function Home() {
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
            fontWeight: 'lighter',
          }}
        >
          개발자 정보공유와 채용을 동시에
          <br />
          <b>
            <i style={{ fontSize: '30px' }}>
              커리어 성장과 행복을 위한 여정, SPEEDJOBS
            </i>
          </b>
          <br />
          개발자를 위한 다양한 필터 옵션으로 나를 위한 포지션을 찾아보세요.{' '}
          <br />
        </div>
        {/* 공고*/}
        <AnnounceCard />
      </div>
    </>
  );
}
