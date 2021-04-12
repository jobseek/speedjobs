import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from './Button';
import Sns from './Sns';
import InputLine from './InputLine';
import { SIGN_UP_REQUEST } from '../../../reducers/user';
import signUpCheck from '../../data/signUpCheck';

const SignForm = styled.div`
  Button {
    margin-top: 10px;
    background-color: ${(props) => (props.prevent ? 'red' : 'white')};
    @media (max-width: 768px) {
      background-color: #f5df4d;
      border: 2px solid #f5df4d;
      color: white;
    }
  }

  ${(props) =>
    !props.fade &&
    css`
            opacity: 0;
            animation: fadeSign 500ms;
            animation-fill-mode: forwards;
            @keyframes fadeSign {
              from {
                opacity: 0;
                transform: translateX(30px);
              }
              to {
                opacity: 1;
                transform: translateX(0px);
              }
          `}
`;

const SignInput = styled(InputLine)``;

const CanButton = styled.div`
  @media (max-width: 768px) {
    display: block;
    Button {
      background-color: white;
      border: 2px solid black;
      color: black;
    }
  }
  display: none;
`;

export default function SignUp(props) {
  const dispatch = useDispatch();
  const [prevent, setPrevent] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    role: 'ROLE_MEMBER',
  });
  const [check, setCheck] = useState({
    email: 0,
    password: 0,
    confirmPassword: '',
    confirmBoolean: 0,
    name: 0,
  });
  const submitHandle = useCallback(
    (e) => {
      e.preventDefault();
      if (
        check.email * check.password * check.confirmBoolean * check.name >
        0
      ) {
        dispatch({
          type: SIGN_UP_REQUEST,
          data: form,
        });
        props.setClose(false);
      } else {
        setPrevent(true);
        setTimeout(() => {
          setPrevent(false);
        }, 1000);
      }
    },
    [check, dispatch, form, props]
  );
  const handleChange = useCallback(
    (e) => {
      if (e.target.name !== 'REPEAT PASSWORD') {
        setForm((prev) => {
          return {
            ...prev,
            [e.target.name.toLowerCase()]: e.target.value,
          };
        });
        setCheck((prev) => ({
          ...prev,
          [e.target.name.toLowerCase()]: signUpCheck(form, check)[
            e.target.name.toLowerCase()
          ]
            ? 1
            : -1,
        }));
      } else {
        setCheck((prev) => ({
          ...prev,
          confirmPassword: e.target.value,
          confirmBoolean: signUpCheck(form, {
            ...check,
            confirmPassword: e.target.value,
          })['repeatPassword']
            ? 1
            : -1,
        }));
      }
    },
    [check, form]
  );

  return (
    <>
      <SignForm fade={props.fade} prevent={prevent}>
        <form onSubmit={submitHandle}>
          <SignInput
            name="NAME"
            value={form.name}
            test={check.name}
            type="text"
            handleChange={(e) => {
              handleChange(e);
            }}
          />
          <br />
          <SignInput
            name="EMAIL"
            value={form.email}
            test={check.email}
            handleChange={(e) => {
              handleChange(e);
            }}
            type="email"
          />
          <br />
          <SignInput
            name="PASSWORD"
            value={form.password}
            test={check.password}
            type="password"
            handleChange={(e) => {
              handleChange(e);
            }}
          />
          <br />
          <SignInput
            name="REPEAT PASSWORD"
            value={check.confirmPassword}
            test={check.confirmBoolean}
            handleChange={(e) => {
              handleChange(e);
            }}
            type="PASSWORD"
          />
          <br />
          <input type="checkbox" />
          Accept all conditions
          <div>
            <Button type="submit" name="SING UP" />
          </div>
          <CanButton>
            <Button
              type="button"
              name="CANCEL"
              onClick={() => props.setClose(false)}
            />
          </CanButton>
        </form>
        <Sns />
      </SignForm>
    </>
  );
}
