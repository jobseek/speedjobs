import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

const StyledCard = styled.div`
  height: ${(props) => (props.height === '0' ? '200px' : '415px')};
  border-radius: 15px;
  user-select: none;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StyledCardBody = styled.div``;

const StyledCardTitle = styled.div``;

const StyledCardSubTitle = styled.div``;

const StyledCardText = styled.div``;

// const StyledCardLink = styled.div``;

export default function Cards(props) {
  return (
    <StyledCard className="card text-left" height={props.height}>
      <StyledCardBody className="card-body">
        <StyledCardTitle className="card-title">{props.title}</StyledCardTitle>
        <StyledCardSubTitle className="card-subtitle mb-2 text-muted">
          {props.subTitle}
        </StyledCardSubTitle>
        <StyledCardText className="card-test">{props.children}</StyledCardText>
      </StyledCardBody>
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
