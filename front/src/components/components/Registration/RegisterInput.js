import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { InputText, ProfileTitles, RequiredItems } from '../Styled';

const RegInput = styled.div`
  position: relative;
  margin-bottom: 10px;
  &:after {
    content: '${(props) => props.message}';
    position: absolute;
    visibility: hidden;
    bottom: 0;
    left: 10px;
    color: red;
    font-size: 11px;
  }

  ${(props) =>
    props.test === -1 &&
    css`
      &:after {
        visibility: visible;
      }
    `}
`;

export default function RegisterInput(props) {
  const caseMsg = useMemo(
    () => ({
      name: '2자 이상 15자 이하의 영어나 한글',
      password: '8자 이상 20자 이하의 영어, 숫자 및 특수문자(_-#$%!.)',
      checkPassword: '비밀번호가 다릅니다.',
      email: '유효한 이메일을 입력해주세요.',
      contact: '유효한 연락처를 입력해주세요.',
      companyName: '기업 이름을 입력해주세요.',
      homepage: 'http:// 또는 https://로 시작해주세요.',
      registrationNumber: '사업자번호를 입력해주세요.',
    }),
    []
  );

  return (
    <>
      <RegInput message={caseMsg[props.name]} test={props.test}>
        <ProfileTitles style={{ fontSize: '15px', marginBottom: '0' }}>
          <RequiredItems>*&nbsp;&nbsp;</RequiredItems>
          {props.id}
        </ProfileTitles>
        <InputText
          name={props.name}
          type={props.type}
          value={props.value}
          test={props.test}
          maxLength={props.maxLength}
          onChange={props.onChange}
          onKeyUp={props.onChange}
          style={{ marginBottom: '15px', height: '25px', paddingBottom: '2px' }}
        />
      </RegInput>
    </>
  );
}
