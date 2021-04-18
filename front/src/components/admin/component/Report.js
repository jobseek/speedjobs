import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  padding-top: 100px;
  font-size: 50px;
  text-align: left;
  padding-left: 70px;
`;

const Content = styled.div`
  background-color: #f5f5f7;
  width: 100%;
  padding-left: 70px;
  color: gray;
  text-align: left;
  height: 350px;
`;

const SubHeader = styled.div`
  text-align: left;
  font-size: 20px;
  padding-left: 70px;
`;

export default function Report(props) {
  return (
    <>
      <Header>최근동향</Header>
      <Content>
        여기엔 정보를 약간 유저리스트 같은거 넣으면 좋을꺼같아요
        게시글리스트라던가
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Content>
      <SubHeader>어쩌구</SubHeader>
      <Content>
        오예오예
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Content>
    </>
  );
}
