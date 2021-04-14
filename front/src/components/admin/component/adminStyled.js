import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

export const CoverAll = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
  z-index: 10;
`;

export const LoginForm = styled(animated.div)`
  padding: 20px 30px;
  margin: 150px auto auto;
  width: 330px;
  background-color: white;
  height: 320px;
  border-radius: 15px;
  overflow: hidden;
`;

export const InputBox = styled.input`
  width: 100%;
  height: 30px;
  margin: 0 0 20px 0;
  border: none;
  padding: 0 0 3px 12px;
  border-bottom: #eee 1px solid;
  &:focus {
    outline: none;
  }
`;
export const InputPlaceholder = styled.div`
  position: absolute;
  left: 10px;
  color: #7d7d7d;
  transition: all 300ms ease-in-out;

  ${(props) =>
    (props.focus || props.value) &&
    css`
      font-size: 10px;
      transform: translateY(-13px);
    `}
`;

export const Button = styled.button`
  border: none;
  background-color: white;
  border-radius: 15px;
  width: 200px;
  margin-top: 60px;
  border: #eee solid 3px;
  &:hover {
    background-color: #d7d7d7;
  }
`;
// eslint 피하기용
export default function avoidEslint() {
  return null;
}
