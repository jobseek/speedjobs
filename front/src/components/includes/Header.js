import React, { useEffect, useRef, useState } from 'react';
import { Justify, PersonCircle, Search } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
// import NavLink from '../components/NavLink';
import NavDrop, { Background } from '../components/NavDrop';
import NavSearch from '../components/NavSearch';
import NavMenu from '../components/NavMenu';
import PopUp from '../components/Notification/PopUp';
import MapLink from '../data/mapLink';
import ModalAlert from '../components/Notification/ModalAlert';
import { ERROR_RESOLVED, LOG_IN_WELCOMED } from '../../reducers/user';

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
  const [popArr, setPopArr] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const ref = useRef(0);
  const mapPop = popArr.map((pop) => (
    <PopUp key={pop.id} type={pop.type} text={pop.text}></PopUp>
  ));
  const addPop = (pop) => {
    console.log('add');
    setPopArr((prev) => {
      ref.current = v4();
      return prev.concat([{ type: pop.type, id: pop.id, text: pop.text }]);
    });
    setTimeout(() => {
      setPopArr((prev) => {
        prev.shift();
        console.log('delete');
        return prev;
      });
    }, 3500);
    console.log(ref.current);
  };

  useEffect(() => {
    // if (user.signUpDone) addPop({ type: 'sign', id: v4() });
    // 회원가입
    if (user.signUpDone) setPopModal(true);
    // 로그인
    else if (user.logInDone && !user.logInWelcomed) {
      addPop({ type: 'login', id: v4(), text: user.me.name });
      dispatch({ type: LOG_IN_WELCOMED });
    } else if (user.signUpError !== null) {
      // 회원가입오류
      console.log(user.signUpError);
      addPop({ type: 'warn', id: v4(), text: user.signUpError });
      dispatch({
        type: ERROR_RESOLVED,
      });
    } else if (user.logInError) {
      addPop({ type: 'warn', id: v4(), text: user.logInError });
    }
  }, [user, dispatch]);

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
