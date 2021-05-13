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
  onChangeHighSchool,
  onChangeUniversity,
  onChangeGraduate,
  onChangeInDate,
  onChangeOutDate,
  onChangeInDate2,
  onChangeOutDate2,
  onChangeInDate3,
  onChangeOutDate3,
  setForm,
  item,
  item2,
  item3,
}) {
  useEffect(() => {
    setForm((p) => ({
      ...p,
      scholars: [
        {
          education: item.education,
          schoolName: item.schoolName,
          major: item.major,
          inDate: item.inDate,
          outDate: item.outDate,
        },
        {
          education: item2.education,
          schoolName: item2.schoolName,
          major: item2.major,
          inDate: item2.inDate,
          outDate: item2.outDate,
        },
        {
          education: item3.education,
          schoolName: item3.schoolName,
          major: item3.major,
          inDate: item3.inDate,
          outDate: item3.outDate,
        },
      ],
    }));
  }, [item, item2, item3, setForm]);
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
            onChange={(e) => onChangeHighSchool(e)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'전공'}
            name={'major'}
            onChange={(e) => onChangeHighSchool(e)}
          />
          <div style={{ display: 'inline-block' }}>
            <ResumeTitles>&nbsp;입학날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={item.inDate}
              onChange={(e) => onChangeInDate(e)}
              selectsStart
              startDate={item.inDate}
              endDate={item.outDate}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeTitles>&nbsp;졸업날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={item.outDate}
              onChange={(e) => onChangeOutDate(e)}
              selectsEnd
              startDate={item.inDate}
              endDate={item.outDate}
              minDate={item.inDate}
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
            onChange={(e) => onChangeUniversity(e)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'전공'}
            name={'major'}
            onChange={(e) => onChangeUniversity(e)}
          />
          <div style={{ display: 'inline-block' }}>
            <ResumeTitles>&nbsp;입학날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={item2.inDate}
              onChange={(e) => onChangeInDate2(e)}
              selectsStart
              startDate={item2.inDate}
              endDate={item2.outDate}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeTitles>&nbsp;졸업날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={item2.outDate}
              onChange={(e) => onChangeOutDate2(e)}
              selectsEnd
              startDate={item2.inDate}
              endDate={item2.outDate}
              minDate={item2.inDate}
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
            onChange={(e) => onChangeGraduate(e)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'전공'}
            name={'major'}
            onChange={(e) => onChangeGraduate(e)}
          />
          <div style={{ display: 'inline-block' }}>
            <ResumeTitles>&nbsp;입학날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={item3.inDate}
              onChange={(e) => onChangeInDate3(e)}
              selectsStart
              startDate={item3.inDate}
              endDate={item3.outDate}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeTitles>&nbsp;졸업날짜</ResumeTitles>
            <MyDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={item3.outDate}
              onChange={(e) => onChangeOutDate3(e)}
              selectsEnd
              startDate={item3.inDate}
              endDate={item3.outDate}
              minDate={item3.inDate}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
        </div>
      </div>
    </>
  );
}
