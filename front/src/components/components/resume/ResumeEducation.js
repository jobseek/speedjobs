import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ResumeInputs from './ResumeInputs';
import {
  MyEducation,
  ResumeTitles,
  StyledDatePicker,
  Warning,
} from '../Styled';

export default function ResumeEducation({
  onChangeHigh,
  onChangeUniversity,
  onChangeGraduate,
  onChangeHighInDate,
  onChangeHighOutDate,
  onChangeUniversityInDate,
  onChangeUniversityOutDate,
  onChangeGraduateInDate,
  onChangeGraduateOutDate,
  setForm,
  high,
  university,
  graduate,
}) {
  useEffect(() => {
    setForm((p) => ({
      ...p,
      scholars: [
        {
          education: high.education,
          schoolName: high.schoolName,
          major: high.major,
          inDate: high.inDate,
          outDate: high.outDate,
        },
        {
          education: university.education,
          schoolName: university.schoolName,
          major: university.major,
          inDate: university.inDate,
          outDate: university.outDate,
        },
        {
          education: graduate.education,
          schoolName: graduate.schoolName,
          major: graduate.major,
          inDate: graduate.inDate,
          outDate: graduate.outDate,
        },
      ],
    }));
  }, [high, university, graduate, setForm]);

  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h5 style={{ display: 'inline-block' }}>최종학력</h5>
        <Warning>
          최종 학력만 입력하세요 (편입한 경우 편입한 대학을 기입하세요)
        </Warning>
        <MyEducation>고등학교</MyEducation>
        <div style={{ display: 'flex', flexFlow: 'wrap' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'학교이름'}
            name={'schoolName'}
            value={high?.schoolName}
            onChange={(e) => onChangeHigh(e)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'전공'}
            name={'major'}
            value={high?.major}
            onChange={(e) => onChangeHigh(e)}
          />
        </div>
        <div style={{ display: 'flex', flexFlow: 'wrap', marginRight: '5px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginRight: '2.5px' }}>
              <ResumeTitles>&nbsp;입학날짜</ResumeTitles>
              <StyledDatePicker
                value={high?.inDate}
                onChange={(e) => onChangeHighInDate(e)}
                selectsStart
                startDate={high?.inDate}
                endDate={high?.outDate}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginLeft: '2.5px' }}>
              <ResumeTitles>&nbsp;졸업날짜</ResumeTitles>
              <StyledDatePicker
                value={high?.outDate}
                onChange={(e) => onChangeHighOutDate(e)}
                selectsEnd
                startDate={high?.inDate}
                endDate={high?.outDate}
                minDate={high?.inDate}
              />
            </div>
          </div>
        </div>

        <MyEducation>대학교</MyEducation>
        <div style={{ display: 'flex', flexFlow: 'wrap' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'학교이름'}
            name={'schoolName'}
            value={university?.schoolName}
            onChange={(e) => onChangeUniversity(e)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'전공'}
            name={'major'}
            value={university?.major}
            onChange={(e) => onChangeUniversity(e)}
          />
        </div>
        <div style={{ display: 'flex', flexFlow: 'wrap', marginRight: '5px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginRight: '2.5px' }}>
              <ResumeTitles>&nbsp;입학날짜</ResumeTitles>
              <StyledDatePicker
                value={university?.inDate}
                onChange={(e) => onChangeUniversityInDate(e)}
                selectsStart
                startDate={university?.inDate}
                endDate={university?.outDate}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginLeft: '2.5px' }}>
              <ResumeTitles>&nbsp;졸업날짜</ResumeTitles>
              <StyledDatePicker
                value={university?.outDate}
                onChange={(e) => onChangeUniversityOutDate(e)}
                selectsEnd
                startDate={university?.inDate}
                endDate={university?.outDate}
                minDate={university?.inDate}
              />
            </div>
          </div>
        </div>

        <MyEducation>대학원</MyEducation>
        <div style={{ display: 'flex', flexFlow: 'wrap' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'학교이름'}
            name={'schoolName'}
            value={graduate?.schoolName}
            onChange={(e) => onChangeGraduate(e)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'전공'}
            name={'major'}
            value={graduate?.major}
            onChange={(e) => onChangeGraduate(e)}
          />
        </div>
        <div style={{ display: 'flex', flexFlow: 'wrap', marginRight: '5px' }}>
          <div style={{ flex: 1 }}>
            <ResumeTitles>&nbsp;입학날짜</ResumeTitles>
            <div style={{ marginRight: '2.5px' }}>
              <StyledDatePicker
                value={graduate?.inDate}
                onChange={(e) => onChangeGraduateInDate(e)}
                selectsStart
                startDate={graduate?.inDate}
                endDate={graduate?.outDate}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginLeft: '2.5px' }}>
              <ResumeTitles>&nbsp;졸업날짜</ResumeTitles>
              <StyledDatePicker
                value={graduate?.outDate}
                onChange={(e) => onChangeGraduateOutDate(e)}
                selectsEnd
                startDate={graduate?.inDate}
                endDate={graduate?.outDate}
                minDate={graduate?.inDate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
