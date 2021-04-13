import React from 'react';
import { InputTextResume, ResumeItems, ResumeTitles, Wrapper } from '../Styled';

export default function ResumeInputs({ name, basic, sns, item }) {
  return (
    <Wrapper basic={basic} sns={sns} item={item}>
      <ResumeItems>
        <ResumeTitles>&nbsp;{name}</ResumeTitles>
        <InputTextResume type="text" />
      </ResumeItems>
    </Wrapper>
  );
}
