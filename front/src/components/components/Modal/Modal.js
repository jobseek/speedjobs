import { css } from 'styled-components/dist/styled-components.browser.esm';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Login from './Login';
import SignUp from './SignUp';
import Loading from '../Notification/Loading';

const MyComponent = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 0;
    left: 0;
    top: 0;
    transform: translateX(0);
    border-radius: 0px;
  }
  border-radius: 5px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  background-color: white;
  width: 330px;
  height: inherit;
  z-index: 20;
  padding: 40px 45px;
  text-align: left;
  //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  .forms {
    ${(props) =>
      props.view &&
      css`
        visibility: hidden;
      `}
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
  .log:before {
    ${(props) =>
      props.login &&
      css`
        background-color: #f5df4d;
      `}
  }
  .sign:before {
    ${(props) =>
      !props.login &&
      css`
        background-color: #f5df4d;
      `}
  }
`;

const GoTo = styled.h3`
  letter-spacing: 2px;
  font-size: 25px;
  display: inline;
  padding-bottom: 2px;
  position: relative;
  &:before {
    content: ' ';
    width: 100%;
    position: absolute;
    height: 5px;
    right: 0;
    bottom: -3px;
    background-color: #d3d3d3;
  }

  &:after {
    content: ' ';
    width: 0;
    position: absolute;
    height: 5px;
    left: 0;
    bottom: -3px;
    background-color: #f5df4d;
    transition: all 300ms ease-in-out 0s;
  }

  &:hover:after {
    width: 100%;
  }
`;

export default function Modal(props) {
  const [login, setLogin] = useState(props.login);
  const [view, setView] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });
  return (
    <>
      <MyComponent view={view}>
        <Title login={login}>
          <GoTo className="log" onClick={() => setLogin(true)}>
            LOG IN
          </GoTo>{' '}
          <GoTo className="sign" onClick={() => setLogin(false)}>
            SIGN UP
          </GoTo>
        </Title>
        {view && <Loading />}
        <div className="forms">
          {login ? (
            <Login setClose={props.setVisible} fade={login} setSns={setView} />
          ) : (
            <SignUp setClose={props.setVisible} fade={login} />
          )}
        </div>
      </MyComponent>
    </>
  );
}
