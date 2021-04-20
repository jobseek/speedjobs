import React, { useState } from 'react';
import styled from 'styled-components';
import { Content, Header } from '../component/adminStyled';
import InfoCard from '../component/InfoCard';

const Img = styled.img`
  background-color: white;
  width: 100%;
  height: 120px;
  margin: 20px 0 0;
`;

export default function BannerSetting(props) {
  const [src, set] = useState([]);
  const dropHandler = (e) => {
    e.preventDefault();
    // const reader = new FileReader();
    // reader.onload = function (event) {
    //   set((p) => [...p, event.target.result]);
    // };
    // reader.readAsDataURL(e.dataTransfer.files[0]);
    for (const f of e.dataTransfer.files) {
      console.log(f);
      const reader = new FileReader();
      reader.onload = function (event) {
        set((p) => [...p, event.target.result]);
      };
      reader.readAsDataURL(f);
    }
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
      <div className={'row'} style={{ height: '100%' }}>
        <div className={'col-6'}>
          <InfoCard index={1} height={'100%'}>
            <div
              style={{
                width: '100%',
                height: '100%',
                border: '#eee 1px solid',
              }}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={dropHandler}
            >
              <Header>배너관리</Header>
              <Content>
                4장미만의 사진으론 배너를 구성할수없습니다
                <br />
                3:1혹은 4:1 비율의 사진이 배너로쓰기에 적합합니다
                {src.length === 0 && '사진이없습니다'}
                {src.map((s) => (
                  <Img src={s} alt={'hello'} />
                ))}
              </Content>
            </div>
          </InfoCard>
        </div>
        <div className={'col-6'}>
          <InfoCard index={0}>
            <Header>태그관리</Header>
          </InfoCard>
        </div>
      </div>
    </>
  );
}
