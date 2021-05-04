import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 50px;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const PageContainer = ({ children }) => {
  return (
    <MainContainer>
      <Inner>{children}</Inner>
    </MainContainer>
  );
};

export const Header = styled.div`
  background-color: #f2d411;
  width: 100%;
  font-size: 40px;
  text-align: left;
  color: white;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding-left: 20px;
`;

export const Content = styled.div`
  color: gray;
  text-align: left;
  padding: 25px;
`;

export const SubHeader = styled.div`
  text-align: left;
  font-size: 20px;
  width: 100%;
  background-color: #f2d411;
  color: white;
`;

export const Container = styled.div`
  background-color: #f5f5f7;
  position: fixed;
  width: 50%;
  height: 100%;
  ${(props) =>
    props.right &&
    css`
      margin-left: 50%;
      padding: 10px 20px 0 20px;
    `}
  & * {
    display: inline-block;
  }
`;
export const CoverAll = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
  z-index: 10;
  //overflow: hidden;
`;

export const LoginForm = styled(animated.div)`
  padding: 20px 30px;
  margin: 150px auto auto;
  width: 330px;
  background-color: white;
  height: 320px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: none;
  transition: box-shadow ease-in-out 500ms;
  ${(props) =>
    props.red &&
    css`
      box-shadow: red 0px 0px 50px;
    `}
`;

export const InputBox = styled.input`
  width: 100%;
  height: 30px;
  margin: 0 0 20px 0;
  border: none;
  padding: 0 0 3px 12px;
  border-bottom: #eee 1px solid;
  background-color: transparent;
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
