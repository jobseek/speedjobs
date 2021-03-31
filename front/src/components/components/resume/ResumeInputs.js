import React from 'react';
import { InputTextResume, ResumeItems, ResumeTitles, Wrapper } from '../Styled';

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
