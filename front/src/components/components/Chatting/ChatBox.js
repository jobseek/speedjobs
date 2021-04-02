import React from 'react';
import styled from 'styled-components';

import { StyledButton } from '../../components/Styled';
import imgpf from './imgpf.png';

const Container = styled.div`
  margin: auto;
  border: 1px solid #d3d3d3;
  padding: 3px;
`;

const Messaging = styled.div`
  padding: 20px 0px 40px 0px; ;
`;
const MsgHistory = styled.div`
  height: 516px;
  background-color: #ffffff;
  overflow-y: auto;
  border-bottom: #d3d3d3 2px solid;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
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
`;

const MsgWriteInput = styled.input`
  display: inline;
  float: left;
  background: #e9e9e9 none repeat scroll 0 0;
  border: medium none;
  border-radius: 3px;
  color: #4c4c4c;
  font-size: 15px;
  height: 48px;
  width: 85%;
  overflow: auto;
  padding: 6px;
`;

// const MsgSendBtn  = styled.button`
//   background: #d3d3d3 none repeat scroll 0 0;
//   border: medium none;
//   border-radius: 10%;
//   color: #fff;
//   cursor: pointer;
//   font-size: 13px;
//   alignment: center;
//   height: 48px;
//   right: 3px;
//
//   width: 15%;

// `
// const Mesgs = styled.div`
//     float: left;
//     padding: 30px 15px 0 25px;
//     width: 60%;
//     border-width: thick ;
// `

export default function ChatBox(props) {
  return (
    <>
      <Container>
        <Messaging>
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

            <OutgoingMsg>
              <SentWithdMsg>
                <SentMsg>
                  <p>right sent messsaffsfafsfsafsdafdsfsafsdasfaafdsaage</p>
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
                  <p>right sent message</p>
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
                height: '48px',
                margin: '0px',
                marginLeft: '3px',
                paddingTop: '10px',
              }}
            >
              send
            </StyledButton>
          </TypeMsg>
        </Messaging>
      </Container>
    </>
  );
}
