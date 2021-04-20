import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { ArrowRight } from 'react-bootstrap-icons';
import logo512 from '../../components/components/img/logo512.png';

const StyledCard = styled.div`
  height: ${(props) => (props.height === '0' ? '200px' : '415px')};
  border-radius: 15px;
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
  //background-color: #d3d3d3;
`;

const Subtitle = styled.div`
  right: 20px;
  //height: 80px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  line-height: 1.2;
`;

const Arrow = styled(ArrowRight)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

// const StyledCardBody = styled.div``;

const StyledCardTitle = styled.div``;

// const StyledCardSubTitle = styled.div``;

// const StyledCardText = styled.div``;

// const StyledCardLink = styled.div``;

export default function Cards(props) {
  return (
    <StyledCard className="card text-left" height={props.height}>
      <Image className="card-img-top" src={logo512} />
      <div className="card-body">
        <StyledCardTitle className="card-title">{props.title}</StyledCardTitle>
        <Subtitle className="card-subtitle mb-2 text-muted">
          {props.subTitle}
        </Subtitle>
        {/* <StyledCardText className="card-test">{props.children}</StyledCardText>*/}
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
