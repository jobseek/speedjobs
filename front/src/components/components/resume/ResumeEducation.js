import React from 'react';
import ResumeInputs from './ResumeInputs';
import {
  Add,
  EducationItems,
  MyEducation,
  MyPlus,
  ResumeTitle,
  Site,
  Warning,
} from '../Styled';

export default function ResumeEducation() {
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
          최종학력
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
        <EducationItems>
          <MyEducation>고등학교</MyEducation>
          <div>
            <Site>
              <ResumeInputs name={'학교이름'} />
            </Site>
            <Site>
              <ResumeInputs name={'전공'} />
            </Site>
            <Site>
              <ResumeInputs name={'입학날짜'} />
            </Site>
            <Site>
              <ResumeInputs name={'졸업날짜'} />
            </Site>
          </div>
        </EducationItems>
      </div>
    </>
  );
}
