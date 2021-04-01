import React from 'react';
import { Private, ResumeImg, ResumeTitle, Warning } from '../Styled';
import ResumeInputs from './ResumeInputs';

export default function ResumeBasic() {
  return (
    <>
      <ResumeTitle>
        기본 정보
        <Warning>
          입력하신 정보는 절대 사용자 동의 없이 외부로 유출, 공개되지 않습니다.
        </Warning>
        <Private>비공개</Private>
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
          {/* 이름 */}
          <ResumeInputs name={'이름'} />
          {/* 이메일 */}
          <ResumeInputs name={'이메일'} />
          {/* 연락처 */}
          <ResumeInputs name={'연락처'} />
        </div>
        <div className={'col-12 col-lg-4 '}>
          {/* 생년월일 */}
          <ResumeInputs name={'생년월일'} />
          {/* 성별 */}
          <ResumeInputs name={'성별'} />
        </div>
      </div>
      <div
        className={'col-12'}
        style={{
          width: '100%',
          marginBottom: '30px',
        }}
      >
        <ResumeInputs wide name={'주소'} />
        <ResumeInputs wide name={'SNS'} />
      </div>
    </>
  );
}
