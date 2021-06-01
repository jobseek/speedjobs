import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Background } from './NavDrop';
import SearchArea from '../Search/SearchArea';

// const InAnimation = keyframes`
//   0% {
//     width: 10em;
//     opacity: 0;
//     transform: translateX(0.6em);
//   }
//   100% {
//     width: 10em;
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;
//
// const MdInAnimation = keyframes`
//   0% {
//     width: 100%;
//     opacity: 1;
//     height: 2em;
//     text-align: center;
//     border-bottom: black solid 1px;
//     border-bottom-right-radius: 15px;
//     border-bottom-left-radius: 15px;
//   }
//   100% {
//     width: 100%;
//     opacity: 1;
//     height: 5em;
//     text-align: center;
//     border-bottom: black solid 1px;
//     border-bottom-right-radius: 15px;
//     border-bottom-left-radius: 15px;
//   }
// `;

const StyledSearch = styled.div`
  position: fixed;
  width: 16px;
  height: 16px;
  top: 20px;
  right: 4.8em;
  margin-left: 5px;
  margin-right: 20px;
  color: #707070;
  z-index: 11;
  @media (max-width: 1200px) {
    right: 0em;
    z-index: 1;
    background-color: #333333;
  }
`;

const SearchHeader = styled.div`
  color: #707070;
  cursor: pointer;
  &:hover {
    color: white;
  }
  transition: color 200ms ease-in-out 500ms;
  @media (max-width: 990px) {
    display: block;
    & > * {
      transform: translate(4px, -1px);
      font-size: 17px;
    }
  }
  display: inline;
  z-index: 11;
`;

// const SearchBar = styled.input`
//   width: 0em;
//   visibility: ${(props) => (props.toggle === 'block' ? 'visible' : 'hidden')};
//   animation: ${(props) => (props.toggle === 'block' ? InAnimation : '')} 500ms
//     ease-in forwards 0ms;
//   border: none;
//   padding: 0 1em 0em;
//   font-size: 15px;
//   background-color: #333333;
//   color: white;
//   text-align: center;
//   z-index: 11;
//   &:focus {
//     outline: none;
//   }
//
//   @media (max-width: 990px) {
//     visibility: ${(props) => (props.toggle === 'block' ? 'visible' : 'hidden')};
//     animation: ${(props) => (props.toggle === 'block' ? MdInAnimation : '')}
//       500ms ease-in-out forwards 0ms;
//   }
// `;

const StyledSearchArea = styled.div`
  position: absolute;
  top: 85px;
  width: 600px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  opacity: 0.65;
  border-radius: 15px;
  border: 1px solid #eee;
  z-index: 11;
  height: 50px;
  @media (max-width: 768px) {
    width: 90%;
  }
  ${(props) =>
    !props.typed &&
    css`
      transition: height 200ms ease-in-out 200ms;
    `}
  //padding: 25px 5px 25px 5px;
  ${(props) =>
    props.typed &&
    css`
      height: 400px;
      @media (max-width: 768px) {
        height: 500px;
      }
      transition: height 200ms ease-in-out;
    `}
`;

export default function NavSearch(props) {
  // 컴포넌트 보이는 상태
  const [toggle, setToggle] = useState('none');
  // 서치바 내부 입력이 있는지 확인하는 상태
  // 입력이 있을경우 서치바 확장
  const [typed, setTyped] = useState(false);
  // 서치바 외부를 클릭했을시에 컴포넌트를 지우기위해 ㅇ필요한 레
  const SearchRef = useRef();
  const toggleHandler = () => {
    setToggle(toggle === 'none' ? 'block' : 'none');
  };
  const clickHandler = (e) => {
    if (toggle === 'block' && !SearchRef.current.contains(e.target)) {
      setToggle('none');
    }
  };
  // 이벤트 리스너를 통해서 서치바 가 토글됬을시 서치바 외부를 클릭하면 꺼지도록 설정.
  useEffect(() => {
    addEventListener('click', clickHandler, true);
    return () => {
      removeEventListener('click', clickHandler, true);
    };
  });
  return (
    <>
      <span ref={SearchRef}>
        <StyledSearch toggle={toggle}>
          <SearchHeader onClick={() => toggleHandler()}>
            {props.children}
          </SearchHeader>

          {/* <SearchBar */}
          {/*  placeholder="검색어를 입력하세요"*/}
          {/*  toggle={toggle}*/}
          {/*  ref={InputRef}*/}
          {/*  onChange={(e) => setSearchText(e.target.value)}*/}
          {/* ></SearchBar> */}
        </StyledSearch>

        {toggle === 'block' && (
          <>
            <StyledSearchArea typed={typed}>
              <SearchArea
                setToggle={setToggle}
                setTyped={setTyped}
                typed={typed}
              ></SearchArea>
            </StyledSearchArea>
          </>
        )}
      </span>
      {toggle === 'block' && <Background></Background>}
    </>
  );
}
