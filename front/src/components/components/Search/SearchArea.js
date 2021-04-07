import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import hangul from '../../data/hangul';
import { SearchInput } from '../Styled';

const SearchHeader = styled.div`
  margin-top: 5px;
  display: inline-block;
  width: 100%;
  text-align: left;
  padding: 5px 0 0 20px;
  font-size: 14px;
  color: #5d5d5d;
`;

const SearchContent = styled.div`
  text-align: left;
  display: inline-block;
  padding: 2px 0 0 20px;
  width: 100%;
  font-size: 18px;
`;

const SearchContentSubTitle = styled.span`
  margin-left: 15px;
  color: #d9d9d9;
`;

const ContentWrap = styled.div`
  width: 100%;
  text-align: center;
  visibility: collapse;
  ${(props) =>
    !props.typed &&
    css`
      transition: visibility 200ms ease-in-out;
    `}
  ${(props) =>
    props.typed &&
    css`
      visibility: visible;
      transition: visibility 200ms ease-in-out 200ms;
    `}
`;

export default function SearchArea({ typed, setTyped }) {
  const [searchText, setSearchText] = useState('');
  const [, setHangulString] = useState('');
  const onChangHandler = useCallback((e) => {
    setSearchText((prev) => e.target.value);
    setHangulString((prev) =>
      e.target.value.split('').reduce((x, y) => {
        return x + hangul(y);
      }, '')
    );
  }, []);
  useEffect(() => {
    if (searchText !== '') {
      setTyped((prev) => true);
    } else {
      setTyped((prev) => false);
    }
  }, [searchText, typed, setTyped]);
  return (
    <>
      <SearchInput
        placeholder={'검색어를 입력하세요'}
        onChange={(e) => onChangHandler(e)}
        value={searchText}
      ></SearchInput>

      <ContentWrap typed={typed}>
        <SearchHeader>질문</SearchHeader>
        <SearchContent>
          안녕하세요 저는 배상휘 라고 합니다
          <SearchContentSubTitle>작성자</SearchContentSubTitle>
          <SearchContentSubTitle>2020/99/99</SearchContentSubTitle>
        </SearchContent>
        <SearchContent>
          안녕하세요 저는 배상휘 라고 합니다
          <SearchContentSubTitle>작성자</SearchContentSubTitle>
          <SearchContentSubTitle>2020/99/99</SearchContentSubTitle>
        </SearchContent>
        <SearchContent>
          안녕하세요 저는 배상휘 라고 합니다
          <SearchContentSubTitle>작성자</SearchContentSubTitle>
          <SearchContentSubTitle>2020/99/99</SearchContentSubTitle>
        </SearchContent>
        <hr style={{ margin: '0', marginTop: '5px' }} />
        <SearchHeader>공고</SearchHeader>
        <SearchContent>
          안녕하세요 저는 배상휘 라고 합니다
          <SearchContentSubTitle>작성자</SearchContentSubTitle>
          <SearchContentSubTitle>2020/99/99</SearchContentSubTitle>
        </SearchContent>
        <SearchContent>
          안녕하세요 저는 배상휘 라고 합니다
          <SearchContentSubTitle>작성자</SearchContentSubTitle>
          <SearchContentSubTitle>2020/99/99</SearchContentSubTitle>
        </SearchContent>
        <SearchContent>
          안녕하세요 저는 배상휘 라고 합니다
          <SearchContentSubTitle>작성자</SearchContentSubTitle>
          <SearchContentSubTitle>2020/99/99</SearchContentSubTitle>
        </SearchContent>
      </ContentWrap>
    </>
  );
}
