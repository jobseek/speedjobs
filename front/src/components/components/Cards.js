import React from 'react';
import styled, { css } from 'styled-components';

const StyledCard = styled.div`
  height: inherit;
  border-radius: 10px;
  user-select: none;
  position: relative;
  border: none;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  &:before {
    position: absolute;
    left: 0;
    content: ' ';
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  &:hover:before {
    animation: back 1s ease;
    animation-fill-mode: forwards;
  }

  @keyframes back {
    0% {
      background-color: #eee;
      width: 0;
    }
    100% {
      background-color: #eee;
      width: 100%;
    }
`;

const Image = styled.img`
  width: 45px;
  border: none;
  vertical-align: top;
  margin-right: 10px;
`;

const Title = styled.div`
  position: relative;
  z-index: 1;
`;

const SubTitle = styled.div`
  position: relative;
  text-align: left;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
  z-index: 1;

  ${(props) =>
    props.bold &&
    css`
      font-weight: bold;
    `}

  ${(props) =>
    props.lighter &&
    css`
      font-weight: lighter;
    `}
`;

export default function Cards(props) {
  return (
    <StyledCard>
      <div style={{ padding: '25px' }}>
        <Title>
          <Image src={props.thumbnail} />
          <div style={{ display: 'inline-block', width: '77%' }}>
            <SubTitle bold>{props.title}</SubTitle>
            <SubTitle lighter>{props.content}</SubTitle>
          </div>
        </Title>
      </div>
    </StyledCard>
  );
}
