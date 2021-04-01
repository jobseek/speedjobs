import React from 'react';
import ResumeInputs from './ResumeInputs';
import { CareerItems, ResumeTitle, Site, Warning } from '../Styled';

export default function ResumeCareer() {
  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
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
            <ResumeInputs name={'회사명'} />
          </Site>
          <Site>
            <ResumeInputs name={'직무'} />
          </Site>
          <ResumeInputs small name={'기간'} />
        </CareerItems>
        <CareerItems>
          <Site>
            <ResumeInputs name={'회사명'} />
          </Site>
          <Site>
            <ResumeInputs name={'직무'} />
          </Site>
          <ResumeInputs small name={'기간'} />
        </CareerItems>
      </div>
    </>
  );
}
