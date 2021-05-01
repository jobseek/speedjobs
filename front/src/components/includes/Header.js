import React, { useEffect, useRef, useState } from 'react';
import { PersonCircle, Search } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import { v4 } from 'uuid';
import NavDrop, { Background } from '../components/Nav/NavDrop';
import NavSearch from '../components/Nav/NavSearch';
import NavMenu from '../components/Nav/NavMenu';
import PopUp from '../components/Notification/PopUp';
import MapLink from '../data/mapLink';
import ModalAlert from '../components/Notification/ModalAlert';
import {
  ERROR_RESOLVED,
  LOG_IN_WELCOMED,
  LOG_OUT_DONE,
  SIGN_UP_DONE,
} from '../../reducers/user';
import { POST_ADD_DONE } from '../../reducers/post';
import { RECRUIT_ADD_DONE } from '../../reducers/recruit';
import {
  PROFILE_DELETE_DONE,
  PROFILE_DELETE_FAIL,
  PROFILE_UPDATE_DONE,
} from '../../reducers/profile';

// 네비바스타일
const NavBar = styled.div`
  position: fixed;
  top: 0px;
  height: 60px;
  padding: 15px 0px 0px 0px;
  background-color: #333333;
  z-index: 6;
  margin: 0px;
`;

const RightContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 20px;
  right: 8px;

  & > * {
    margin: 0px 10px 2px;
  }
`;

const PopUpBox = styled.div`
  @media (max-width: 500px) {
    width: 80%;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  position: fixed;
  right: 35px;
  bottom: 30px;
`;

export default function Header(props) {
  const state = useSelector((s) => s);
  const history = useHistory();
  const [, , remove] = useCookies('REFRESH_TOKEN');
  const ref = useRef(0);
  const dispatch = useDispatch();
  // 팝업창 배열
  const [popArr, setPopArr] = useState([]);
  // 모달창
  const [popModal, setPopModal] = useState(false);
  // 팝업창 맵
  const mapPop = popArr.map((pop) => (
    <PopUp key={pop.id} type={pop.type} text={pop.text}></PopUp>
  ));
  // 팝업 추가
  const addPop = (pop) => {
    setPopArr((prev) => {
      ref.current = v4();
      return prev.concat([{ type: pop.type, id: pop.id, text: pop.text }]);
    });
    // 삼초뒤 삭제
    setTimeout(() => {
      setPopArr((prev) => {
        prev.shift();
        return prev;
      });
    }, 3500);
  };
  // 팝업 동작 인식
  useEffect(() => {
    // 회원가입
    if (state.user.signUpDone) {
      setPopModal(true);
      dispatch({ type: SIGN_UP_DONE });
    } // 로그인
    else if (state.recruit.recruitAddDone) {
      dispatch({ type: RECRUIT_ADD_DONE });
      addPop({ type: 'green', id: v4(), text: '공고가 등록되었습니다' });
    } else if (state.user.logInDone && !state.user.logInWelcomed) {
      // v4 는 아이디를 자동으로 넣어줍니다
      // 확실한 아이디가 있을경우 비추입니다
      addPop({ type: 'login', id: v4(), text: state.user.me.nickname });
      dispatch({ type: LOG_IN_WELCOMED });
    } else if (state.user.signUpError !== null) {
      // 회원가입오류
      console.log(state.user.signUpError);
      addPop({ type: 'warn', id: v4(), text: state.user.signUpError });
      dispatch({
        type: ERROR_RESOLVED,
      });
      // 로그인 오류
    } else if (state.user.logInError) {
      addPop({ type: 'warn', id: v4(), text: state.user.logInError });
      dispatch({
        type: ERROR_RESOLVED,
      });
      // 로그아웃
    } else if (state.user.logOutDone) {
      addPop({ type: 'logout', id: v4() });
      dispatch({
        type: LOG_OUT_DONE,
      });
      remove('REFRESH_TOKEN');
      history.push('/');
    } else if (state.post.postAddDone) {
      addPop({ type: 'green', id: v4(), text: '게시글이 등록되었습니다' });
      dispatch({
        type: POST_ADD_DONE,
      });
    } else if (state.post.postAddError) {
      addPop({ type: 'warn', id: v4(), text: '게시글 등록 오류' });
      dispatch({
        type: POST_ADD_DONE,
      });
    } else if (state.profile.profileUpdateDone) {
      addPop({ type: 'profileUpdate', id: v4() });
      dispatch({
        type: PROFILE_UPDATE_DONE,
      });
    } else if (state.profile.profileDeleteDone) {
      addPop({ type: 'withdraw', id: v4() });
      dispatch({
        type: PROFILE_DELETE_DONE,
      });
    } else if (state.profile.profileDeleteError === 400) {
      addPop({ type: 'withdrawErr', id: v4() });
      dispatch({
        type: PROFILE_DELETE_FAIL,
      });
    } else if (state.profile.profileDeleteError === 401) {
      addPop({ type: 'withdrawErr', id: v4() });
      dispatch({
        type: PROFILE_DELETE_FAIL,
      });
    }
  }, [state, dispatch, history, remove]);

  return (
    <>
      <NavBar className="container-fluid">
        <MapLink></MapLink>
        {/* 서치 컴포넌트 */}
        <NavSearch>
          <Search></Search>
        </NavSearch>
        {/* 메뉴컴포넌트 */}
        <NavMenu></NavMenu>
        <RightContainer>
          <NavDrop>
            <PersonCircle></PersonCircle>
          </NavDrop>
        </RightContainer>
        <PopUpBox>{mapPop}</PopUpBox>
        {popModal && (
          <>
            <ModalAlert
              setPopModal={setPopModal}
              text="등록하신 이메일을 확인해주세요."
            ></ModalAlert>
            <Background onClick={() => setPopModal(false)}></Background>
          </>
        )}
      </NavBar>
    </>
  );
}
