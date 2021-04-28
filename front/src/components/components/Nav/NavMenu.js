import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { animated } from 'react-spring';
import { Squeeze } from 'hamburger-react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { MapLinkUser, MapMenu } from '../../data/mapLink';
import NavAnimation from '../animation/NavAnimation';

const NavMenuBody = styled.div`
  display: none;
  left: 0px;
  top: 20px;
  @media (max-width: 1200px) {
    position: absolute;
    display: flex;
  }
`;

const NavMenuHeader = styled.div`
  color: #707070;
  & > * {
    transform: translateY(-13px);
  }
  &:hover {
    color: white;
  }
`;

export const NavMenuContent = styled(animated.div)`
  position: fixed;
  width: 100%;
  top: 40px;
  padding-top: 10px;
  background-color: #333333;
  z-index: 2;
  //border-bottom-left-radius: 15px;
  //border-bottom-right-radius: 15px;
  overflow: hidden;
  //border-bottom: black solid 1px;
`;

export const MenuList = styled.li`
  margin-bottom: 20px;
`;

export const MenuLink = styled(Link)`
  letter-spacing: 0.15em;
  color: #707070;

  &:hover {
    text-decoration: none;
    color: white;
  }
`;
const DropUl = styled.ul`
  user-select: none;
  padding: 10px;
  list-style: none;
  margin: 0px;
`;

const Background = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
  z-index: 10;
`;

export default function NavMenu(props) {
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const MenuRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const toggleHandler = () => {
    setToggle((p) => !p);
  };
  const clickHandler = (e) => {
    if (toggle && !MenuRef.current.contains(e.target)) setToggle(false);
  };
  const mapProps = [
    {
      title: 'COMMUNITY',
      onClick: () => {
        toggleHandler();
      },
    },
    {
      title: 'RECRUITMENT',
      onClick: () => {
        toggleHandler();
      },
    },
  ];
  const mapPropsUser = [
    {
      title: 'Login',
      onClick: () => {
        setVisible(true);
        setLogin(true);
      },
    },
    {
      title: 'Sign Up',
      onClick: () => {
        setVisible(true);
        setLogin(false);
      },
    },
  ];
  const [mapPropsUserLogin, setMapPropsUserLogin] = useState([
    {
      title: 'user',
      name: '',
    },
  ]);

  useEffect(() => {
    addEventListener('click', clickHandler, true);
    return () => {
      removeEventListener('click', clickHandler, true);
    };
  });
  // 로그인시 유저 혹인
  useEffect(() => {
    if ((user.meDone || user.logInWelcomed) && !user.logOutDone) {
      setIsLogin((prev) => true);
      setMapPropsUserLogin((prev) => {
        prev[0].name = user.me.nickname;
        return prev;
      });
    } else {
      setIsLogin(false);
    }
  }, [user, isLogin, mapPropsUserLogin]);

  const [visible, setVisible] = useState(false);
  const [login, setLogin] = useState(true);

  return (
    <div className="container-fluid">
      {visible && <Modal login={login} setVisible={setVisible} />}
      {visible && <Background onClick={() => setVisible(false)} />}
      <NavMenuBody ref={MenuRef}>
        <NavMenuHeader>
          <Squeeze
            rounded
            size={18}
            toggled={toggle}
            toggle={setToggle}
          ></Squeeze>
        </NavMenuHeader>
        <NavAnimation toggle={toggle}>
          <DropUl>
            <MapMenu change={mapProps}></MapMenu>
            <hr className="solid" style={{ margin: '10px' }}></hr>
            <MapLinkUser
              change={isLogin ? mapPropsUserLogin : mapPropsUser}
              toggle={() => toggleHandler()}
              isLogin={isLogin}
              dispatch={dispatch}
            ></MapLinkUser>
          </DropUl>
        </NavAnimation>
      </NavMenuBody>
    </div>
  );
}
