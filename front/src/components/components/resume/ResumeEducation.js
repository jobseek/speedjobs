import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ResumeInputs from './ResumeInputs';
import { MyEducation, ResumeTitles, Warning } from '../Styled';

const MyDatePicker = styled(DatePicker)`
  width: 220px;
  border-radius: 5px;
  background-color: #fbfbfb;
  margin-right: 5px;
  height: 35px;
  padding-left: 15px;
  border: 1px solid silver;
  &:focus {
    outline: none;
  }
`;

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
          <div style={{ display: 'inline-block' }}>
            <ResumeTitles>&nbsp;입학날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={high?.inDate}
              onChange={(e) => onChangeHighInDate(e)}
              selectsStart
              startDate={high?.inDate}
              endDate={high?.outDate}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeTitles>&nbsp;졸업날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={high?.outDate}
              onChange={(e) => onChangeHighOutDate(e)}
              selectsEnd
              startDate={high?.inDate}
              endDate={high?.outDate}
              minDate={high?.inDate}
              peekMonthDropdown
              showYearDropdown
            />
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
          <div style={{ display: 'inline-block' }}>
            <ResumeTitles>&nbsp;입학날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={university?.inDate}
              onChange={(e) => onChangeUniversityInDate(e)}
              selectsStart
              startDate={university?.inDate}
              endDate={university?.outDate}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeTitles>&nbsp;졸업날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={university?.outDate}
              onChange={(e) => onChangeUniversityOutDate(e)}
              selectsEnd
              startDate={university?.inDate}
              endDate={university?.outDate}
              minDate={university?.inDate}
              peekMonthDropdown
              showYearDropdown
            />
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
          <div style={{ display: 'inline-block' }}>
            <ResumeTitles>&nbsp;입학날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={graduate?.inDate}
              onChange={(e) => onChangeGraduateInDate(e)}
              selectsStart
              startDate={graduate?.inDate}
              endDate={graduate?.outDate}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeTitles>&nbsp;졸업날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={graduate?.outDate}
              onChange={(e) => onChangeGraduateOutDate(e)}
              selectsEnd
              startDate={graduate?.inDate}
              endDate={graduate?.outDate}
              minDate={graduate?.inDate}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
        </div>
      </div>
    </>
  );
}
