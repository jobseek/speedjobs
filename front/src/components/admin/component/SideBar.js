import React from 'react';
import styled, { css } from 'styled-components';
import { Squeeze } from 'hamburger-react';

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
`;

export default function SideBar({ toggle, setToggle }) {
  return (
    <>
      <div></div>
      <SideBarBody
        toggled={toggle}
        onMouseEnter={() => setToggle(true)}
        onMouseLeave={() => setToggle(false)}
      >
        <SideDiv>게시글 관리</SideDiv>
        <SideSpan>게시물을 관리,삭제 </SideSpan>
        <SideDiv>게시글 관리</SideDiv>
        <SideDiv>게시글 관리</SideDiv>
        <SideDiv>게시글 관리</SideDiv>
        <SideDiv>게시글 관리</SideDiv>
      </SideBarBody>
      {/* <SideBarToggle toggled={toggle}> */}
      {/*   <Squeeze size={18} toggled={toggle} toggle={setToggle}></Squeeze> */}
      {/* </SideBarToggle> */}
    </>
  );
}
