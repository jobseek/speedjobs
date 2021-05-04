import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styled, { css } from 'styled-components';

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
    props.popError &&
    css`
      background-color: #f69a9a;
      color: white;
      font-weight: 700;
    `}
`;

const StatusBar = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #f2d411;
  height: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0%;
  transition: width ease-out 400ms;
  ${(props) =>
    props.barEnter &&
    css`
      width: 0%;
    `}
  ${(props) =>
    props.barDone &&
    css`
      width: calc(100% - 20px);
    `}
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
  useEffect(() => {
    if (enter === true) {
      set(true);
    }
  }, [enter]);
  useEffect(() => {
    if (done === true) {
      set(false);
      setTimeout(() => setEnd(true), 1000);
      setTimeout(() => setEnd(false), 1800);
    }
  }, [done]);

  const style = useSpring({
    marginTop: '0px',
    from: { marginTop: '100px' },
  });

  const endStyle = useSpring({
    marginTop: '100px',
    from: { marginTop: '0px' },
    delay: 1000,
  });

  const barEndStyle = useSpring({
    width: '0%',
    from: { width: '100%' },
    delay: 800,
  });
  return (
    <>
      <Wrapper>
        <Alert style={ani ? style : endStyle} popError={error !== undefined}>
          {error !== undefined ? error : children}
          <StatusBar
            barEnter={enter}
            barDone={end}
            style={end ? {} : barEndStyle}
          ></StatusBar>
        </Alert>
      </Wrapper>
    </>
  );
}
