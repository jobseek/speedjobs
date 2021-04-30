import React from 'react';
import styled from 'styled-components';
import { Check } from 'react-bootstrap-icons';

const Alert = styled.div`
  @media (max-width: 500px) {
    width: 100%;
    min-height: 45px;
    font-size: 15px;
  }
  height: 50px;
  min-width: 250px;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 10px;
  animation: Bye 500ms linear 3s;
  animation-fill-mode: forwards;
  padding: 0 5px 0 5px;
  p {
    margin: 0;
  }

  @keyframes Bye {
    from {
      opacity: 1;
      visibility: visible;
    }
    to {
      opacity: 0;
      visibility: collapse;
    }
  }
`;

const CheckMark = styled(Check)`
  display: inline;
  width: 25px;
  height: 25px;
`;

export default function PopUp({ type, text }) {
  const typeArr = {
    warn: {
      backColor: 'red',
      color: 'white',
      text: '오류가 발생하였습니다: ' + text,
    },
    post: {
      backColor: '#f5df4d',
      color: '#7c7c7c',
      text: '게시글이 등록되었습니다',
    },
    sign: {
      backColor: 'green',
      color: 'white',
      text: '이메일을 확인해주세요',
    },
    login: {
      backColor: 'green',
      color: 'white',
      text: text + ' 님 환영합니다.',
    },
    logout: {
      backColor: 'green',
      color: 'white',
      text: '로그아웃 되었습니다.',
    },
    profileUpdate: {
      backColor: 'green',
      color: 'white',
      text: '회원정보가 수정되었습니다.',
    },
    withdraw: {
      backColor: 'red',
      color: 'white',
      text: '회원탈퇴 되었습니다.',
    },
    withdrawErr: {
      backColor: 'red',
      color: 'white',
      text: '비밀번호가 틀렸습니다.',
    },
    green: {
      backColor: 'green',
      color: 'white',
      text,
    },
    default: {
      backColor: '#f5df4d',
      color: '#7c7c7c',
      text,
    },
  };

  return (
    <>
      <Alert color={typeArr[type].color} backColor={typeArr[type].backColor}>
        <p>{typeArr[type].text}</p> <CheckMark />
      </Alert>
    </>
  );
}
