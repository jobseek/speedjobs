import React from 'react';
import RegisterInput from './RegisterInput';
import { StyledButton } from '../Styled';

export default function RegisterContents(props) {
  return (
    <>
      <div className="container">
        <h3 style={{ marginBottom: '15px' }}>기업 회원가입</h3>
        <RegisterInput name="회사 이메일" type="text" />
        <RegisterInput name="비밀번호" type="password" />
        <RegisterInput name="비밀번호 확인" type="password" />
        <h5 style={{ marginTop: '20px' }}>기업 정보</h5>
        <RegisterInput name="기업명" type="text" />
        <RegisterInput name="담당자명" type="text" />
        <RegisterInput name="담당자 연락처" type="text" />
        <RegisterInput name="채팅방 닉네임" type="text" />
        <div>
          <StyledButton style={{ width: '100%', margin: '15px 0 30px 0' }}>
            회원가입
          </StyledButton>
        </div>
      </div>
    </>
  );
}
