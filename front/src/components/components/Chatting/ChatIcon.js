import React from 'react';
import { ChatLeftDotsFill } from 'react-bootstrap-icons';
import styled from 'styled-components';

const Icon = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: inline-block;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 25px;
  color: white;
  background-color: #f2d411;
  transform: scaleX(-1);
  margin: auto;
  padding-top: 10px;
`;

export default function ChatIcon(props) {
  return (
    <>
      <Icon>
        <ChatLeftDotsFill />
      </Icon>
    </>
  );
}
