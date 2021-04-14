import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useSpring, animated } from 'react-spring';
import Input from '../component/Input';
import { Button, CoverAll, LoginForm } from '../component/adminStyled';

export default function Login(props) {
  const history = useHistory();
  const [hide, set] = useState(false);
  const hideSpring = useSpring({
    opacity: hide ? '0' : '1',
    from: { opacity: '1' },
    config: { duration: 500 },
  });

  const leftSpring = useSpring({
    transform: hide ? 'translateX(-20vw)' : 'translateX(0vw)',
    opacity: hide ? '0' : '1',
    from: { transform: 'translateX(0vw)', opacity: '1' },
    config: { duration: 500 },
    delay: 500,
  });

  const onClickHandler = useCallback(() => {
    set(true);
    setTimeout(() => {
      history.push('/admin/home');
    }, 1000);
  }, [history]);
  return (
    <>
      <CoverAll>
        <LoginForm style={leftSpring}>
          <animated.div style={hideSpring}>
            <div style={{ marginBottom: '40px' }}>Admin Login</div>
            <Input placeholder={'ADMIN ID'}></Input>
            <Input placeholder={'PASSWORD'} type={'password'}></Input>
            <Button onClick={() => onClickHandler()}>LOGIN</Button>
          </animated.div>
        </LoginForm>
      </CoverAll>
    </>
  );
}
