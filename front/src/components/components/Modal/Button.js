import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styled from 'styled-components';

const MyButton = styled.button`
  @media (max-width: 768px) {
    width: 100%;
  }
  border: 2px solid black;
  border-radius: 5px;
  background-color: white;
  color: black;
  padding: 5px 20px;
  font-size: 16px;
  cursor: pointer;
  transition-duration: 1s;
  :hover {
    border: 2px solid #f5df4d;
    background-color: #f5df4d;
    color: white;
  }
`;

export default function Button(props) {
  return (
    <>
      <MyButton type={props.type} onClick={props.onClick}>
        <b>{props.name}</b>
      </MyButton>
    </>
  );
}
