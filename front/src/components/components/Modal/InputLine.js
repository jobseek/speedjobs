import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

const MyInput = styled.div`
  position: relative;
  &:after {
    content: '${(props) => props.message}';
    position: absolute;
    top: 50px;
    left: 0;
    color: red;
    font-size: 10px;
    visibility: collapse;
  }
  ${(props) =>
    props.test === -1 &&
    css`
      &:after {
        visibility: visible;
      }
    `}
  ${(props) =>
    props.test === 1 &&
    css`
      &:after {
        visibility: collapse;
      }
    `}

  label {
    margin-bottom: 0;
  }

  input {
    @media (max-width: 768px) {
      height: 30px;
      padding: 0;
    }
    padding: 3px;
    border: none;
    border-bottom: 2px solid #d3d3d3;
    ${(props) =>
      props.change &&
      css`
        border-bottom: 2px solid black;
      `}
    width: 100%;
    height: 20px;
    &:focus {
      border-bottom: 2px solid black;
      outline: none;
    }
  }
`;

export default function InputLine({ type, value, name, handleChange, test }) {
  const [bottom, setBottom] = useState(false);

  const caseSel = useMemo(
    () => ({
      NAME: '2자이상 15자 이하의 영어나 한글',
      PASSWORD: '대문자, 소문자, 숫자 모두 포함하여 8자 이상 20자 이하',
      'REPEAT PASSWORD': '비밀번호가 다릅니다',
      EMAIL: '이메일을 입력해주세요',
    }),
    []
  );
  const [toggle, setToggle] = useState(0);
  useEffect(() => {
    setToggle(test);
  }, [test, toggle, caseSel, name]);

  return (
    <>
      <MyInput change={bottom} message={caseSel[name]} test={toggle}>
        <label>
          <b>{name}</b>
        </label>
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => {
            setBottom(true);
            handleChange(e);
          }}
          onKeyUp={(e) => handleChange(e)}
          onKeyPress={(e) => handleChange(e)}
        />
      </MyInput>
    </>
  );
}
