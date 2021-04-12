import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { StyledButton, StyledHeaderDiv } from '../components/Styled';
import ChatIcon from '../components/Chatting/ChatIcon';
import ChatBox from '../components/Chatting/ChatBox';

const Chatting = styled.div`
  width: 100%;
  height: 650px;
  @media (max-width: 992px) {
    height: 0;
  }
`;

export default function RecruitmentDetail(props) {
  const [pop, setPop] = useState('none');
  const ButtonEvent = () => {
    if (pop === 'none') {
      setPop('inline-block');
    } else {
      setPop('none');
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (pop === 'none') {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [pop]);

  return (
    <>
      <div
        className={'container'}
        style={{
          padding: '30px 0px 0px',
          textAlign: 'left',
        }}
      >
        {/* 제목 지원 찜하기 */}
        <StyledHeaderDiv>
          <div className={'container row justify-content-end'}>
            <div className={'col-md-8 col-4 p-0'} style={{ marginTop: '14px' }}>
              <h5>더미제목</h5>
            </div>
            <div className={'col-md-3 col-4 text-right'}>
              <StyledButton wide>지원하기</StyledButton>
            </div>
            <div className={'col-md-1 col-3 text-right'}>
              <StyledButton white>찜하기</StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>

        {/* 제목 end*/}
        {/* 본문*/}
        <div className={'row container m-0 p-0'}>
          <div className={'col-12 col-lg-7'}>
            {/* 요약정보*/}
            <div
              className={'container'}
              style={{
                display: 'block',
                borderBottom: '1px solid #eee',
              }}
            >
              <p>요약</p>
              <p>직무 : 백엔드 프론트엔드</p>
              <p>고용형태 : 정규직</p>
              <p>경력 : 경력무관</p>
              <p>회사규모 : 100명</p>
              <p>주요서비스 : 앱개발</p>
              <p>채용기간 : 상시채용</p>
            </div>
            {/* 업무소개*/}
            <div className={'container'} style={{ padding: '14px' }}>
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
              안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
            </div>
          </div>
          {/* 요약 end*/}
          {/* 채팅컴포넌트*/}
          <ChatIcon />
          <div
            className={'col-lg-5 col-12'}
            style={{ padding: '15px 5px 0px' }}
          >
            <Chatting>
              <ChatBox pop={pop} button={ButtonEvent} />
              <ChatIcon onclick={ButtonEvent} />
            </Chatting>
          </div>
        </div>
        {/* <StyledButton hcenter wide>*/}
        {/*  지원*/}
        {/* </StyledButton>*/}
        {/* 본문end*/}
      </div>
    </>
  );
}
