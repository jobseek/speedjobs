import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

import logo512 from '../../components/components/img/logo512.png';

const StyledCard = styled.div`
  height: 170px;
  border-radius: 10px;
  user-select: none;
  position: relative;
  border: none;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  &:before {
    position: absolute;
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
  height: 45px;
  top: 20px;
  left: 20px;
  position: relative;
  margin-bottom: 15px;
  border: none;
  z-index: 1;
`;

const Subtitle = styled.div`
  right: 20px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  white-space: nowrap;
  line-height: 1.2;
`;

export default function Cards(props) {
  return (
    <StyledCard className="card text-left" height={props.height}>
      <Image className="card-img-top" src={logo512} />
      <div className="card-body" style={{ zIndex: '1' }}>
        <div className="card-title">{props.title}</div>
        <Subtitle className="card-subtitle mb-2 text-muted">
          {props.subTitle}
        </Subtitle>
        <Subtitle className="card-subtitle mb-2 text-muted">
          {props.content}
        </Subtitle>
        {/* <div className="card-subtitle mb-2 text-muted">{props.content}</div>*/}
      </div>
    </StyledCard>
  );
}

Cards.defaultProps = {
  title: 'default title',
  subtitle: 'default subtitle',
  children: 'default content',
  height: '0',
};

Cards.propTyoes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.string,
  height: PropTypes.string,
};
