import React, { useState } from 'react';
import ResumeInputs from './ResumeInputs';
import {
  Add,
  CareerItems,
  MyPlus,
  ResumeTitle,
  Site,
  Warning,
} from '../Styled';
import Tags from '../Tags';

export default function ResumeCareer() {
  const [tags] = useState([
    { name: 'Backend', id: 0, selected: false },
    { name: 'Frontend', id: 1, selected: false },
    { name: 'Fullstack', id: 2, selected: false },
    { name: 'Infra', id: 3, selected: false },
  ]);
  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <MyPlus>
          <Add />
        </MyPlus>
        <ResumeTitle>
          경력
          <Warning>
            <span
              style={{
                fontSize: '17px',
              }}
            >
              +
            </span>
            &nbsp;&nbsp;버튼을 누르면 추가할 수 있습니다.
          </Warning>
        </ResumeTitle>
        <CareerItems>
          <Site>
            <ResumeInputs name={'회사이름'} />
          </Site>
          <Site>
            <ResumeInputs name={'직급'} />
          </Site>
          <Site>
            <ResumeInputs name={'입사날짜'} />
          </Site>
          <Site>
            <ResumeInputs name={'퇴사날짜'} />
          </Site>
          <Tags tagList={tags}>직무</Tags>
        </CareerItems>
      </div>
    </>
  );
}
