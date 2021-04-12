import React, { useState } from 'react';
import styled from 'styled-components';
import { ToggleOff } from '@styled-icons/bootstrap/ToggleOff';
import { ToggleOn } from '@styled-icons/bootstrap/ToggleOn';
import { Private, ResumeImg, ResumeTitle, Warning } from '../Styled';
import ResumeInputs from './ResumeInputs';

const Toggle1 = styled(ToggleOff)`
  width: 30px;
  float: right;
  color: gray;
  margin-top: 5px;
`;

const Toggle2 = styled(ToggleOn)`
  width: 30px;
  float: right;
  color: #f5df4d;
  padding-top: 5px;
`;

export default function ResumeBasic() {
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };
  return (
    <>
      <ResumeTitle>
        기본 정보
        <Warning>
          입력하신 정보는 절대 사용자 동의 없이 외부로 유출, 공개되지 않습니다.
        </Warning>
        <span onClick={handleBookmark}>
          <div
            style={{
              float: 'right',
              marginLeft: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            {bookmark ? <Toggle2 /> : <Toggle1 />}
          </div>
        </span>
        {bookmark ? <Private>공개</Private> : <Private>비공개</Private>}
      </ResumeTitle>
      <div
        className={'row w-100'}
        style={{
          margin: '0px 1px 10px 1px',
        }}
      >
        <div className={'col-12 col-lg-4 text-center'}>
          <ResumeImg>이미지 업로드</ResumeImg>
        </div>
        <div className={'col-12 col-lg-4'}>
          <ResumeInputs name={'이름'} />
          <ResumeInputs name={'생년월일'} />
          <ResumeInputs name={'주소'} />
        </div>
        <div className={'col-12 col-lg-4 '}>
          <ResumeInputs name={'성별'} />
          <ResumeInputs name={'연락처'} />
        </div>
      </div>
      <div
        className={'col-12'}
        style={{
          width: '100%',
          marginBottom: '30px',
        }}
      >
        <ResumeInputs name={'GitHub'} />
        <ResumeInputs name={'기술 블로그'} />
      </div>
    </>
  );
}
