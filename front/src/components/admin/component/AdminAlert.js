import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { POP_INIT } from '../../../reducers/admin';

const Alert = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: white;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding-top: 20px;
  font-weight: 400;
  font-color: #c1c1c1;
  box-shadow: 0px 5px 10px #a1a1a1;
  margin-top: 100px;
  text-align: center;
  ${(props) =>
    props.poperror &&
    css`
      background-color: #f69a9a;
      color: white;
      font-weight: 700;
    `}
`;

const StatusBar = styled(animated.div)`
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    0.25turn,
    transparent 10%,
    #f2d411,
    transparent 90%
  );
  height: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0%;
  transition: width ease-out 400ms;
`;

const Wrapper = styled.div`
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  position: absolute;
  width: 50vw;
  padding: 10px 10px 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 80px;
  overflow-y: hidden;
`;

export default function AdminAlert({ children, enter, done, error }) {
  const [ani, set] = useState(true);
  const [end, setEnd] = useState(false);
  const [toggle, setToggle] = useState(false);
  const timeOut = useRef(0);
  const dispatch = useDispatch();
  const toggleFlag = useCallback(() => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      setToggle((p) => !p);
    }, 1500);
  }, [setToggle]);
  // 시작 이펙트
  useEffect(() => {
    if (enter === true) {
      set(true);
      toggleFlag();
    }
  }, [enter, toggleFlag, dispatch]);

  // 끝 이펙트
  useEffect(() => {
    if (end === true && !toggle) {
      setEnd(false);
      dispatch({
        type: POP_INIT,
      });
    } else if (done === true && toggle) {
      set(false);
      setEnd(true);
      toggleFlag();
    } else if (error !== undefined && error !== null && toggle) {
      set(false);
      setEnd(true);
      toggleFlag();
    }
  }, [done, error, toggle, dispatch, end, toggleFlag]);

  useEffect(() => {
    return () => {
      set(false);
    };
  }, []);

  const style = useSpring({
    marginTop: ani ? '0px' : '100px',
    from: { marginTop: ani ? '100px' : '0px' },
    config: { duration: 500 },
    delay: ani ? 0 : 800,
  });

  const barStyle = useSpring({
    width: end ? '0%' : '96%',
    from: { width: end ? '96%' : '0%' },
    config: { duration: 300 },
    delay: end ? 0 : 500,
  });
  return (
    <>
      <Wrapper>
        <Alert
          style={style}
          poperror={error !== undefined && error !== null ? 1 : 0}
        >
          {error !== undefined && error !== null ? error : children}
          {error === null && <StatusBar style={barStyle}></StatusBar>}
        </Alert>
      </Wrapper>
    </>
  );
}
