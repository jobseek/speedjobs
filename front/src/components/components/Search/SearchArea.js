import React from 'react';
import styled from 'styled-components';
import hangul from '../../data/hangul';

const SearchHeader = styled.div`
  text-align: left;
  padding: 20px 0 0 50px;
  font-size: 20px;
`;

const SearchContent = styled.div`
  display: inline-block;
  width: 85%;
  background-color: #eee;
  height: 100px;
  border-radius: 15px;
`;

const ContentWrap = styled.div`
  width: 100%;
  text-align: center;
`;

export default function SearchArea(props) {
  return (
    <>
      <SearchHeader>{props.text}</SearchHeader>
      <SearchHeader>{props.text.split('').map((x) => hangul(x))}</SearchHeader>
      <SearchHeader>질문</SearchHeader>
      <hr />
      <ContentWrap>
        <SearchContent>제목</SearchContent>
      </ContentWrap>
      <SearchHeader>공고</SearchHeader>
      <hr />
      <ContentWrap>
        <SearchContent>제목</SearchContent>
      </ContentWrap>
    </>
  );
}
