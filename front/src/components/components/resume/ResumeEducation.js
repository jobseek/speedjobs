import React from 'react';
import ResumeInputs from './ResumeInputs';
import {
  EducationItems,
  MyEducation,
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
        <ResumeTitle>
          학력
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
              <ResumeInputs name={'학교명'} />
            </Site>
            <Site>
              <ResumeInputs name={'문과/이과/예체능'} />
            </Site>
            <ResumeInputs small name={'기간'} />
          </div>
        </EducationItems>
        <EducationItems>
          <MyEducation>대학교</MyEducation>
          <Site>
            <ResumeInputs name={'학교명'} />
          </Site>
          <Site>
            <ResumeInputs name={'전공'} />
          </Site>
          <ResumeInputs small name={'기간'} />
        </EducationItems>
      </div>
    </>
  );
}
