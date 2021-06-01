import React from 'react';
import styled from 'styled-components';
import AnnounceCard from './home/AnnounceCard';
import Banner from '../components/banner/Banner';

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 60px 0;
  font-weight: lighter;
  @media (max-width: 692px) {
    margin: 20px 0;
  }
`;

const TitleText = styled.span`
  font-size: 30px;
  @media (max-width: 692px) {
    font-size: 18px;
  }
`;

const SubTitle = styled.span`
  @media (max-width: 692px) {
    font-size: 12px;
  }
`;

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container">
        {/* 타이틀*/}
        <TitleContainer>
          <SubTitle>개발자 정보공유와 채용을 동시에</SubTitle>
          <br />
          <b>
            <TitleText>커리어 성장과 행복을 위한 여정, SPEEDJOBS</TitleText>
          </b>
          <br />
          <SubTitle>
            개발자를 위한 다양한 필터 옵션으로 나를 위한 포지션을 찾아보세요.{' '}
          </SubTitle>
          <br />
        </TitleContainer>
        {/* 공고*/}
        <AnnounceCard />
      </div>
    </>
  );
}
