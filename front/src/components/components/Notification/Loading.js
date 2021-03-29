import React from 'react';
import styled from 'styled-components';

const LoadBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
`;

const Load = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: inline-block;
  animation: zooming 5s ease-in-out infinite;

  @keyframes zooming {
    0% {
      background-color: #f5df4d;
      transform: scale(1);
    }
    13% {
      transform: scale(0);
    }
    25% {
      background-color: #d3d3d3;
      transform: scale(1);
    }
    38% {
      transform: scale(0);
    }
    50% {
      background-color: #ff6d70;
      transform: scale(1);
    }
    63% {
      transform: scale(0);
    }
    75% {
      background-color: #86af48;
      transform: scale(1);
    }
    88% {
      transform: scale(0);
    }
    100% {
      background-color: #f5df4d;
      transform: scale(1);
    }
  }
`;

export default function Loading(props) {
  return (
    <LoadBox>
      <Load></Load>
    </LoadBox>
  );
}
