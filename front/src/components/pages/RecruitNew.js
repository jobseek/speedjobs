import React, { useEffect } from 'react';
import {
  StyledButton,
  StyledHeaderDiv,
  StyledLike,
  TagBody,
} from '../components/Styled';
import ResumeInputs from '../components/resume/ResumeInputs';

export default function RecruitNew() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div
      className="container text-left"
      style={{
        padding: '30px 0px 0px',
        textAlign: 'left',
      }}
    >
      {/* 헤더*/}
      <StyledHeaderDiv>
        <div
          className={'container row justify-content-end'}
          style={{ paddingTop: '15px' }}
        >
          <div className={'col-md-8 col-4 p-0'} style={{ marginTop: '14px' }}>
            <h2>공고이름</h2>
          </div>
          <div className={'col-md-3 col-4 text-right'}></div>
          <div className={'col-md-1 col-3 text-right'}>
            <StyledButton white>공고저장</StyledButton>
          </div>
        </div>
        <div className={'row'}></div>
      </StyledHeaderDiv>
      {/* 작성자*/}
      <div className={'container'}>
        <div style={{ margin: '10px 0px 20px 0px' }}>작성자 2020-01-01</div>
        {/* 본문*/}
        <div>
          <div>
            <ResumeInputs name={'공고시작일자'} />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <ResumeInputs name={'공고마감일자'} />
          </div>
        </div>
        {/* 태그*/}
        <div
          style={{
            marginTop: '20px',
          }}
        >
          <TagBody grey>백엔드</TagBody>
          <TagBody grey>백엔드</TagBody>
          <TagBody grey>백엔드</TagBody>
          <TagBody grey>백엔드</TagBody>
        </div>
      </div>
    </div>
  );
}
