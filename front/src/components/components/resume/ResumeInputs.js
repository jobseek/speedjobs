import React from 'react';
import { InputTextResume, ResumeItems, ResumeTitles, Wrapper } from '../Styled';

export default function ResumeInputs({
  itemName,
  basic,
  sns,
  item,
  margin,
  flex,
  onChange,
  value,
  name,
}) {
  return (
    <Wrapper basic={basic} sns={sns} item={item} margin={margin} flex={flex}>
      <ResumeItems>
        <ResumeTitles>&nbsp;{itemName}</ResumeTitles>
        <InputTextResume
          type="text"
          onChange={onChange}
          value={value}
          name={name}
        />
      </ResumeItems>
    </Wrapper>
  );
}
