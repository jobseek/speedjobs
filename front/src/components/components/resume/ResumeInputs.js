import React from 'react';
import styled, { css } from 'styled-components';

const ResumeItems = styled.div`
  margin-bottom: 5px;
`;

const ResumeTitles = styled.div`
  margin-bottom: 5px;
`;

const InputTextResume = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 27px;
  border: 1px solid silver;
  padding: 0 20px 3px;
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  display: inline-block;
  ${(props) =>
    props.wide &&
    css`
      display: block;
      padding-left: 30px;
      padding-right: 50px;
      width: 100%;
    `}
  ${(props) =>
    props.small &&
    css`
      width: 340px;
    `}
  &:focus {
    outline: none;
  }

  @media (max-width: 992px) {
    display: block;
    width: 100%;
    padding: 0;
  }
`;

export default function ResumeInputs({ wide, name, small }) {
  return (
    <Wrapper wide={wide} small={small}>
      <ResumeItems>
        <ResumeTitles>&nbsp;{name}</ResumeTitles>
        <InputTextResume type="text" />
      </ResumeItems>
    </Wrapper>
  );
}
