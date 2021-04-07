import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeftSquareFill } from 'react-bootstrap-icons';
import { StyledButton } from '../../components/Styled';
import imgpf from './imgpf.png';

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

const OutgoingMsg = styled.div`
  align-self: flex-end;
  right: 0px;
  align-content: center;
  float: right;
  margin: 1rem 0 1rem;
  width: 15rem;
`;
const SentWithdMsg = styled.div`
  float: right;
  width: 15rem;
`;
const SentMsg = styled.div`
  word-wrap: break-word;
  overflow-style: auto;
  padding: 6px;
  background: #e9e9e9 none repeat scroll 0 0;
  border-radius: 3px;
  color: #000000;
  font-size: 14px;
  text-align: right;
`;

const IncomingMsg = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  width: 17rem;
  padding-top: 5px;
`;

const IncomingMsgImg = styled.div`
  background-image: url(${imgpf});
  width: 2rem;
  height: 2rem;
  background-size: cover;
  align-self: self-start;
`;

const ReceivedWithdMsg = styled.div`
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  width: 14rem;
  display: flex;
  flex-direction: column;
`;

const ReceivedMsg = styled.div`
  background: #d3d3d3 none repeat scroll 0 0;
  border-radius: 3px;
  word-wrap: break-word;
  overflow-style: auto;
  padding: 6px;
  text-align: left; ;
`;

const TimeDate = styled.span`
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 2px 0 2px 0;
`;

const TypeMsg = styled.div`
  position: relative;
  display: flex;
  overflow: auto;
  height: 100%;
`;

const MsgWriteInput = styled.input`
  display: inline;
  float: left;
  background: #e9e9e9 none repeat scroll 0 0;
  border: medium none;
  border-radius: 3px;
  color: #4c4c4c;
  font-size: 15px;
  height: 50px;
  width: 85%;
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
          <IncomingMsg>
            <IncomingMsgImg></IncomingMsgImg>
            <ReceivedWithdMsg>
              <ReceivedMsg>
                <p>left RsafassafsafsfsafsdfasfsfaceiveMsg</p>
              </ReceivedMsg>
              <TimeDate> 11:01 AM | June 9</TimeDate>
            </ReceivedWithdMsg>
          </IncomingMsg>

          <IncomingMsg>
            <IncomingMsgImg></IncomingMsgImg>
            <ReceivedWithdMsg>
              <ReceivedMsg>
                <p>left RsafassafsafsfsafsdfasfsfaceiveMsg</p>
              </ReceivedMsg>
              <TimeDate> 11:01 AM | June 9</TimeDate>
            </ReceivedWithdMsg>
          </IncomingMsg>

          <OutgoingMsg>
            <SentWithdMsg>
              <SentMsg>
                <p>right sent message</p>
              </SentMsg>
              <TimeDate> 11:01 AM | June 9</TimeDate>
            </SentWithdMsg>
          </OutgoingMsg>
          <IncomingMsg>
            <IncomingMsgImg></IncomingMsgImg>
            <ReceivedWithdMsg>
              <ReceivedMsg>
                <p>left RsafassafsafsfsafsdfasfsfaceiveMsg</p>
              </ReceivedMsg>
              <TimeDate> 11:01 AM | June 9</TimeDate>
            </ReceivedWithdMsg>
          </IncomingMsg>

          <OutgoingMsg>
            <SentWithdMsg>
              <SentMsg>
                <p>{props.pop}</p>
              </SentMsg>
              <TimeDate> 11:01 AM | June 9</TimeDate>
            </SentWithdMsg>
          </OutgoingMsg>
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
