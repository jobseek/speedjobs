import React, { useEffect, useRef, useState } from 'react';
import { Justify, PersonCircle, Search } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import NavDrop, { Background } from '../components/NavDrop';
import NavSearch from '../components/NavSearch';
import NavMenu from '../components/NavMenu';
import PopUp from '../components/Notification/PopUp';
import MapLink from '../data/mapLink';
import ModalAlert from '../components/Notification/ModalAlert';
import {
  ERROR_RESOLVED,
  LOG_IN_WELCOMED,
  LOG_OUT_DONE,
} from '../../reducers/user';
import { POST_ADD_DONE } from '../../reducers/post';

// 네비바스타일
const NavBar = styled.div`
  position: fixed;
  top: 0px;
  height: 60px;
  padding: 15px 0px 0px 0px;
  background-color: #333333;
  z-index: 2;
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
    } // 로그인
    else if (state.user.logInDone && !state.user.logInWelcomed) {
      // v4 는 아이디를 자동으로 넣어줍니다
      // 확실한 아이디가 있을경우 비추입니다
      addPop({ type: 'login', id: v4(), text: state.user.me.name });
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
    }
  }, [state, dispatch]);

  return (
    <>
      <NavBar className="container-fluid">
        <MapLink></MapLink>
        <NavSearch>
          <Search></Search>
        </NavSearch>
        <NavMenu>
          <Justify></Justify>
        </NavMenu>
        <RightContainer>
          <NavDrop>
            <PersonCircle></PersonCircle>
          </NavDrop>
        </RightContainer>
        <PopUpBox>{mapPop}</PopUpBox>
        {popModal && (
          <>
            <ModalAlert setPopModal={setPopModal}></ModalAlert>
            <Background onClick={() => setPopModal(false)}></Background>
          </>
        )}
      </NavBar>
    </>
  );
}
