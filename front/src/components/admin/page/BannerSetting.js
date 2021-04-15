import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Content, Header } from '../component/adminStyled';
import InfoCard from '../component/InfoCard';

const DragAndDrop = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 15px;
  width: 95%;
  background-color: white;
  padding: 10px 10px;
`;

const Img = styled.img`
  background-color: white;
  width: 400px;
  height: 120px;
`;

export default function BannerSetting(props) {
  const [src, set] = useState([]);
  const dropHandler = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files[0]);
    const reader = new FileReader();
    reader.onload = function (event) {
      set((p) => [...p, event.target.result]);
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Container>
        <Header>배너관리</Header>
        <Content>
          4장미만의 사진으론 배너를 구성할수없습니다
          <br />
          3:1혹은 4:1 비율의 사진이 배너로쓰기에 적합합니다
        </Content>
      </Container>
      <Container right>
        <InfoCard>
          <div
            style={{ width: '100%', height: '100%', border: '#eee 1px solid' }}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={dropHandler}
          >
            오호이
          </div>
        </InfoCard>
        <InfoCard
          height={200}
          styleProps={{
            overflowX: 'scroll',
            display: 'flex',
          }}
        >
          {src.length === 0 && '사진이없습니다'}
          {src.map((s) => (
            <Img src={s} alt={'hello'} />
          ))}
        </InfoCard>
      </Container>
    </>
  );
}
