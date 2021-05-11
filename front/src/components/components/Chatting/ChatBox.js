import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import SockJSClient from 'react-stomp';
import { ArrowLeftSquareFill } from 'react-bootstrap-icons';
import { StyledButton } from '../../components/Styled';
import Message from './Message';
import address from '../../../auth/address';

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
    z-index: 30;
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
  const chatRef = useRef();
  const containerRef = useRef();
  const [msg, setMsg] = useState('');
  const [msgHistory, setMsgHistory] = useState([]);
  const { user } = useSelector((state) => state);
  const sendMessage = useCallback(() => {
    const sendMsg = { roomId: 1, authorId: user.me.id, content: msg };
    chatRef.current.sendMessage('/send/message', JSON.stringify(sendMsg));
    // setMsgHistory((p) => [...p, { out: true, content: sendMessage }]);
    setMsg('');
  }, [chatRef, msg, user.me?.id]);
  // 메세지 리스트 로딩전에 먼저 유저정보를 가져와야함
  // useEffect(()=>)
  const getMessage = useCallback(
    (m, t) => {
      m.out = false;
      m.income = false;
      console.log(user.me?.id);
      console.log(m.authorId);
      if (m.authorId === user.me?.id) m.out = true;
      else m.income = true;
      console.log(m);
      setMsgHistory((p) => [...p, m]);
    },
    [setMsgHistory, user.me?.id]
  );
  const mapMsgHistory = msgHistory.map((m) => (
    <Message income={m.income} out={m.out} key={m.id}>
      {m.content}
    </Message>
  ));
  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [mapMsgHistory]);
  return (
    <>
      <Container pop={props.pop}>
        <SockJSClient
          url={'http://' + address() + ':8081/chat'}
          topics={['/channel/1']}
          onMessage={getMessage}
          ref={chatRef}
        ></SockJSClient>
        <BackArea>
          <BackButton onClick={() => props.button()} />
        </BackArea>
        <MsgHistory ref={containerRef}>
          {mapMsgHistory}
          <div ref={containerRef}></div>
        </MsgHistory>
        {user.me !== null && (
          <TypeMsg>
            <MsgWriteInput
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={(e) => {
                console.log('hi');
                if (e.key === 'Enter') sendMessage();
              }}
              onMessage={getMessage}
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
              onClick={() => sendMessage()}
            >
              전송
            </StyledButton>
          </TypeMsg>
        )}
      </Container>
    </>
  );
}
