import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import { animated, useSpring } from 'react-spring';
import Input from '../component/Input';
import { Button, CoverAll, LoginForm } from '../component/adminStyled';
import { LOG_IN_REQUEST, LOG_OUT_REQUEST } from '../../../reducers/user';
import AdminAlert from '../component/AdminAlert';

export default function Login() {
  const history = useHistory();
  const [err, setErr] = useState(false);
  const [hide, set] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
    provider: 'LOCAL',
  });
  const user = useSelector((state) => state.user);
  const [refresh, ,] = useCookies('REFRESH_TOKEN');
  const [pop, setPop] = useState(false);
  const hideSpring = useSpring({
    opacity: hide ? '0' : '1',
    from: { opacity: '1' },
    config: { duration: 500 },
  });

  const onChangeHandler = useCallback(
    (e) => {
      if (e.target !== undefined)
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    },
    [setForm]
  );

  const leftSpring = useSpring({
    transform: hide ? 'translateX(-20vw)' : 'translateX(0vw)',
    opacity: hide ? '0' : '1',
    from: { transform: 'translateX(0vw)', opacity: '1' },
    config: { duration: 500 },
    delay: 500,
  });
  useEffect(() => {
    if (user.me?.email === 'admin@admin.com') {
      set(true);
      setTimeout(() => {
        history.push('/admin/home');
      }, 1000);
    } else if (user.meDone || refresh['REFRESH_TOKEN'] === undefined) {
      dispatch({
        type: LOG_OUT_REQUEST,
        data: 'no-redirect',
      });

      setPop(true);
    }
  }, [dispatch, refresh, user.meDone, history, user.me?.email]);

  const onClickHandler = useCallback(
    (e) => {
      if (e !== undefined) {
        e.preventDefault();
        dispatch({
          type: LOG_IN_REQUEST,
          data: form,
        });
      }
    },
    [form, dispatch]
  );
  useEffect(() => {
    if (user.logInError !== null) {
      console.log('err');
      setErr(true);
    } else {
      setTimeout(() => {
        setErr(false);
      }, 300);
    }
  }, [user.logInError]);
  return (
    <>
      <CoverAll>
        <LoginForm
          style={leftSpring}
          onSubmit={(e) => onClickHandler(e)}
          red={err}
        >
          <animated.div style={hideSpring}>
            <div style={{ marginBottom: '40px' }}>Admin Login</div>
            <Input
              name="email"
              value={form.email}
              placeholder={'ADMIN ID'}
              changeHandler={onChangeHandler}
              disabled={!user.needLogin}
            />
            <Input
              placeholder={'PASSWORD'}
              name={'password'}
              value={form.password}
              type={'password'}
              disabled={!user.needLogin}
              changeHandler={onChangeHandler}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onClickHandler(e);
              }}
            />
            <Button onClick={(e) => onClickHandler(e)}>LOGIN</Button>
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
