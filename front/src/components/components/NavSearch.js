import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const InAnimation = keyframes`
  0%{
    width: 10em;
    opacity: 0;
    transform: translateX(0.6em);
  }
  100%{
    width: 10em;
    opacity: 1;
    transform: translateX(0);
  }
`;

const MdInAnimation = keyframes`
  0%{
    width: 100%;
    opacity: 1;
    height: 2em;
    text-align: center;
    border-bottom: black solid 1px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  100%{
    width: 100%;
    opacity: 1;
    height: 5em;
    text-align: center;
    border-bottom: black solid 1px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
`;

const StyledSearch = styled.div`
  position: fixed;
  width: 16px;
  height: 16px;
  top: 20px;
  right: 4.8em;
  margin-left: 5px;
  margin-right: 20px;
  color: #707070;
  @media (max-width: 1200px) {
    right: 0em;
    z-index: 1;
    background-color: #333333;
    ${(props) =>
      props.toggle === 'block' &&
      css`
        width: 100%;
        height: 40px;
        margin: 0;
      `}
  }
  ${(props) =>
    props.toggle === 'block' &&
    css`
      width: 200px;
      margin: 0;
    `}
`;

const SearchHeader = styled.div`
  color: #707070;
  &:hover {
    color: white;
  }
  @media (max-width: 990px) {
    display: block;
  }
  display: inline;
`;

const SearchBar = styled.input`
  width: 0em;
  visibility: ${(props) => (props.toggle === 'block' ? 'visible' : 'hidden')};
  animation: ${(props) => (props.toggle === 'block' ? InAnimation : '')} 500ms
    ease-in forwards 0ms;
  border: none;
  padding: 0 1em 0em;
  font-size: 15px;
  background-color: #333333;
  color: white;
  text-align: center;
  &:focus {
    outline: none;
  }

  @media (max-width: 990px) {
    visibility: ${(props) => (props.toggle === 'block' ? 'visible' : 'hidden')};
    animation: ${(props) => (props.toggle === 'block' ? MdInAnimation : '')}
      500ms ease-in-out forwards 0ms;
  }
`;

export default function NavSearch(props) {
  const [toggle, setToggle] = useState('none');
  const SearchRef = useRef();
  const InputRef = useRef();
  const toggleHandler = () => {
    setToggle(toggle === 'none' ? 'block' : 'none');
    if (toggle === 'none')
      setTimeout(() => {
        InputRef.current.focus();
      }, 800);
  };
  const clickHandler = (e) => {
    if (toggle === 'block' && !SearchRef.current.contains(e.target))
      setToggle('none');
  };

  useEffect(() => {
    addEventListener('click', clickHandler, true);
    return () => {
      removeEventListener('click', clickHandler, true);
    };
  });
  return (
    <StyledSearch ref={SearchRef} toggle={toggle}>
      <SearchHeader onClick={() => toggleHandler()}>
        {props.children}
      </SearchHeader>
      <SearchBar
        placeholder="검색어를 입력하세요"
        toggle={toggle}
        ref={InputRef}
      ></SearchBar>
    </StyledSearch>
  );
}
