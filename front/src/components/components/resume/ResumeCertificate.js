import React from 'react';
import ResumeInputs from './ResumeInputs';
import {
  Add,
  EducationItems,
  MyPlus,
  ResumeTitle,
  Site,
  Warning,
} from '../Styled';

export default function ResumeCertificate() {
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
        <div>
          <ResumeTitle>
            자격증
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
        </div>
        <EducationItems>
          <div>
            <Site>
              <ResumeInputs name={'이름'} />
            </Site>
            <Site>
              <ResumeInputs name={'발급번호'} />
            </Site>
            <Site>
              <ResumeInputs name={'발급기관'} />
            </Site>
            <Site>
              <ResumeInputs name={'발급일자'} />
            </Site>
          </div>
        </EducationItems>
      </div>
    </>
  );
}
