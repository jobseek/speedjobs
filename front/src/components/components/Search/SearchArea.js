import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import hangul from '../../data/hangul';
import { SearchInput } from '../Styled';
import { POST_LIST_DONE, POST_LIST_REQUEST } from '../../../reducers/post';
import {
  RECRUIT_LIST_DONE,
  RECRUIT_LIST_REQUEST,
} from '../../../reducers/recruit';

const SearchHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
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

const SearchTitle = styled.span`
  display: inline;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const SearchContentSubTitle = styled.span`
  margin-left: 15px;
  color: #d9d9d9;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 15px;
  }
`;

const ContentWrap = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: scroll;
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
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: grey;
    border-radius: 20px;
  }
`;

export default function SearchArea({ typed, setTyped, setToggle }) {
  // 서치바 value를 렌더링하기위한 상태
  const [searchText, setSearchText] = useState('');
  // 서치바 클릭시 다른곳으로 보내기위한 훅스
  const history = useHistory();
  // 아직 개발중인 부분.. 한글을 완전하게 미입력시에도 검색하게 하는 기능
  // 안ㄴ => 안녕 검색
  const [, setHangulString] = useState('');
  // 순서대로 로딩,질문검색결과, 공고검색결과 상태
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const [recruitList, setRecruitList] = useState([]);
  // onChange이후 ref에 저장된 settimeout을 지우고 다시 셋타임아웃을 설정.
  // 기대효과: onChange가 500ms 동안 새로 발생하지 않은 경우 검색 실행
  const time = useRef(0);
  // 리덕스
  const { post, recruit } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onChangHandler = useCallback(
    (e) => {
      console.log('로딩 트루');
      setLoading(true);
      setSearchText((prev) => e.target.value);
      setHangulString((prev) =>
        e.target.value.split('').reduce((x, y) => {
          return x + hangul(y);
        }, '')
      );
      clearTimeout(time.current);
      if (e.target.value !== '') {
        time.current = setTimeout(() => {
          dispatch({
            type: POST_LIST_REQUEST,
            data: {
              size: 20,
              page: 0,
              // content: e.target.value,
              title: e.target.value,
              searchBar: true,
              // title: e.target.value,
            },
          });
          dispatch({
            type: RECRUIT_LIST_REQUEST,
            data: {
              size: 20,
              page: 0,
              title: e.target.value,
              searchBar: true,
            },
          });
        }, 500);
      }
    },
    [dispatch, setLoading, setSearchText, setHangulString]
  );

  useEffect(() => {
    if (searchText !== '') {
      setTyped(true);
      if (post.postListSearchBar && recruit.recruitListSearchBar) {
        setLoading(false);
        setPostList(post.postList.content);
        console.log(recruit.recruitList);
        setRecruitList(recruit.recruitList.content);
        dispatch({
          type: POST_LIST_DONE,
        });
        dispatch({
          type: RECRUIT_LIST_DONE,
        });
      }
    } else {
      setTyped(false);
    }
  }, [
    dispatch,
    searchText,
    typed,
    setTyped,
    post.postListSearchBar,
    post.postList,
    recruit.recruitListSearchBar,
    recruit.recruitList,
  ]);

  const onClickHandler = ({ author, tags, date, fav, id, target }) => {
    if (target === 'community') {
      history.push({
        pathname: `/community/post/${id}`,
        state: {
          author,
          tags,
          date,
          fav,
        },
      });
    }
    if (target === 'recruit') {
      history.push({
        pathname: `/recruit/detail/${id}`,
        state: {},
      });
    }
    setToggle('none');
  };

  const mapPostList = postList.map((pl) => (
    <SearchContent
      onClick={() =>
        onClickHandler({
          fav: pl.favorite,
          data: pl.createdDate,
          tags: [...(pl.tags.POSITION ?? []), ...(pl.tags.SKILL ?? [])],
          author: pl.author,
          id: pl.id,
          target: 'community',
        })
      }
    >
      <SearchTitle>{pl.title}</SearchTitle>
      <SearchContentSubTitle>{pl.author}</SearchContentSubTitle>
      <SearchContentSubTitle>
        {pl.createdDate.slice(0, 3).join('/')}
      </SearchContentSubTitle>
    </SearchContent>
  ));

  const mapRecruitList = recruitList.map((rl) => (
    <SearchContent
      onClick={() =>
        onClickHandler({
          fav: rl.favorite,
          data: rl.createdDate,
          tags: [...(rl.tags.POSITION ?? []), ...(rl.tags.SKILL ?? [])],
          author: rl.companyName,
          id: rl.id,
          target: 'recruit',
        })
      }
    >
      <SearchTitle>{rl.title}</SearchTitle>
      <SearchContentSubTitle>{rl.companyName}</SearchContentSubTitle>
      <SearchContentSubTitle>
        {rl.openDate.slice(0, 3).join('/')}
      </SearchContentSubTitle>
    </SearchContent>
  ));

  // 뒷정리
  useEffect(() => {
    return () => {
      setPostList([]);
    };
  }, []);
  return (
    <>
      <SearchInput
        placeholder={'검색어를 입력하세요'}
        onChange={(e) => onChangHandler(e)}
        value={searchText}
      ></SearchInput>

      <ContentWrap typed={typed}>
        {loading ? (
          '로딩중'
        ) : (
          <>
            {postList.length === 0 && recruitList.length === 0 ? (
              '검색결과가 없습니다'
            ) : (
              <>
                {postList.length !== 0 && <SearchHeader>질문</SearchHeader>}
                {mapPostList}
                {postList.length !== 0 && (
                  <hr style={{ margin: '0', marginTop: '5px' }} />
                )}
                {recruitList.length !== 0 && <SearchHeader>공고</SearchHeader>}
                {mapRecruitList}
              </>
            )}
          </>
        )}
      </ContentWrap>
    </>
  );
}
