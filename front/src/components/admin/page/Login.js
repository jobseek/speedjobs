import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import { useSpring, animated } from 'react-spring';
import Input from '../component/Input';
import { Button, CoverAll, LoginForm } from '../component/adminStyled';
import { LOG_OUT_REQUEST } from '../../../reducers/user';
import AdminAlert from '../component/AdminAlert';

export default function Login(props) {
  const history = useHistory();
  const [hide, set] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });
  const user = useSelector((state) => state.user);
  const refresh = useCookies('REFRESH_TOKEN');
  const [pop, setPop] = useState(false);
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
  useEffect(() => {
    if (user.meDone || refresh['REFRESH_TOKEN'] === undefined) {
      dispatch({
        type: LOG_OUT_REQUEST,
        data: 'no-redirect',
      });
      setPop(true);
    }
  }, [dispatch, refresh, user.meDone]);

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
            <Input name="email" placeholder={'ADMIN ID'}></Input>
            <Input placeholder={'PASSWORD'} type={'password'}></Input>
            <Button onClick={() => onClickHandler()}>LOGIN</Button>
          </animated.div>
        </LoginForm>
        {pop && (
          <AdminAlert
            enter={user.logOutLoading ?? undefined}
            done={user.needLogin ?? undefined}
          >
            관리자 로그인을 위해 자동으로 로그아웃 합니다..
          </AdminAlert>
        )}
      </CoverAll>
    </>
  );
}
