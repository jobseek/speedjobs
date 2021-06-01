import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../../reducers/user';

const SideBarBody = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 48px;
  height: 100%;
  background-color: rgba(157, 157, 157, 0.3);
  backdrop-filter: blur(2px);
  padding: 30px 0;
  //background-color: white;
  transition: width 300ms ease-in-out;
  & * {
    text-align: left;
    padding-left: 15px;
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    min-width: 300px;
    margin-left: 0px;
    color: white;
    font-size: 30px;
  }
  ${(props) =>
    props.toggled &&
    css`
      width: 300px;
      transition: width 300ms ease-in-out;
      & * {
        visibility: visible;
        opacity: 1;
        transition: opacity 300ms ease-in-out 300ms;
      }
    `}
`;

const SideSpan = styled.div`
  transform: translateY(-6px);
  font-size: 15px;
`;

const SideDiv = styled.div`
  margin: 10px 0 0 0;
  &:hover {
    color: gray;
  }
`;

export default function SideBar({ toggle, setToggle, set }) {
  const dispatch = useDispatch();
  const logoutRequest = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [dispatch]);
  return (
    <>
      <div></div>
      <SideBarBody
        toggled={toggle}
        onMouseEnter={() => setToggle(true)}
        onMouseLeave={() => setToggle(false)}
      >
        <SideDiv onClick={() => set('Main')}>최근동향</SideDiv>
        <SideSpan>유저수,등록수를 차트로 보고 관리 </SideSpan>
        <SideDiv onClick={() => set('Banner')}>배너,태그관리</SideDiv>
        <SideSpan>메인홈화면 배너 변경,태그 추가 삭제 </SideSpan>
        <SideDiv onClick={() => set('Company')}>기업회원승인</SideDiv>
        <SideSpan>회원관리</SideSpan>
        <SideDiv onClick={() => set('Member')}>회원탈퇴, 관리</SideDiv>
        <SideSpan>기업회원 회원가입 승인</SideSpan>
        <SideDiv onClick={() => logoutRequest()}>로그아웃</SideDiv>
      </SideBarBody>
      {/* <SideBarToggle toggled={toggle}> */}
      {/*   <Squeeze size={18} toggled={toggle} toggle={setToggle}></Squeeze> */}
      {/* </SideBarToggle> */}
    </>
  );
}
