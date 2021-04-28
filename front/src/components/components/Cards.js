import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { ArrowRight } from 'react-bootstrap-icons';
import logo512 from '../../components/components/img/logo512.png';

const StyledCard = styled.div`
  height: 180px;
  border-radius: 10px;
  user-select: none;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  position: relative;
  top: 25px;
  left: 20px;
  margin-bottom: 15px;
  border: none;
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

const Arrow = styled(ArrowRight)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export default function Cards(props) {
  return (
    <StyledCard className="card text-left" height={props.height}>
      <Image className="card-img-top" src={logo512} />
      <div className="card-body">
        <div className="card-title">{props.title}</div>
        <Subtitle className="card-subtitle mb-2 text-muted">
          {props.subTitle}
        </Subtitle>
        <Arrow />
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
