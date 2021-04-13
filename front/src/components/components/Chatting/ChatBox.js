import React from 'react';
import styled from 'styled-components';
import { ArrowLeftSquareFill } from 'react-bootstrap-icons';
import { StyledButton } from '../../components/Styled';
import Message from './Message';

const Container = styled.div`
  border: 1px solid #d3d3d3;
  padding: 3px;
  background-color: white;
  @media (max-width: 992px) {
    position: fixed;
    left: 0;
    top: 60px;
    width: 100%;
    height: calc(100% - 60px);
    z-index: 1;
    display: ${(props) => props.pop};
  } ;
`;

const MsgHistory = styled.div`
  position: relative;
  height: 516px;
  background-color: #ffffff;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 3px;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: grey;
    border-radius: 20px;
  }
  @media (max-width: 992px) {
    height: calc(100% - 100px);
  }
`;

const TypeMsg = styled.div``;

const MsgWriteInput = styled.input`
  display: inline;
  float: left;
  background: #e9e9e9 none repeat scroll 0 0;
  border: medium none;
  border-radius: 3px;
  color: #4c4c4c;
  font-size: 15px;
  height: 50px;
  width: 83%;
  margin-right: 2%;
  overflow: auto;
  padding: 6px;
`;

const BackArea = styled.div`
  text-align: right;
  height: 0;
  @media (max-width: 992px) {
    height: 30px;
  }
`;

const BackButton = styled(ArrowLeftSquareFill)`
  height: 30px;
  width: 30px;
  color: #f2d411;
  display: none;
  &:hover {
    color: black;
  }
  @media (max-width: 992px) {
    display: inline-block;
  }
`;

export default function ChatBox(props) {
  return (
    <>
      <Container pop={props.pop}>
        <BackArea>
          <BackButton onClick={() => props.button()} />
        </BackArea>
        <MsgHistory>
          <Message income>안녕하세요?</Message>
          <Message out>안녕하세요!</Message>
        </MsgHistory>
        <TypeMsg>
          <MsgWriteInput
            type="text"
            className="write_msg"
            placeholder="Type a message"
          ></MsgWriteInput>
          <StyledButton
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50px',
              width: '15%',
              margin: '0px',
              marginLeft: '3px',
            }}
          >
            전송
          </StyledButton>
        </TypeMsg>
      </Container>
    </>
  );
}
