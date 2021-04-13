import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ResumeTitles } from './Styled';

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  border-radius: 27px;
  height: 35px;
  padding-left: 15px;
  border: 1px solid silver;
  &:focus {
    outline: none;
  }
`;

export default function DatePick({ item, setItems, start, end }) {
  const [startDate, setStartDate] = useState(item.date);
  const [endDate, setEndDate] = useState(item.date);
  return (
    <>
      <div style={{ display: 'inline-block', margin: '0 5px 5px 0' }}>
        <ResumeTitles>&nbsp;{start}</ResumeTitles>
        <StyledDatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={(date) => {
            setStartDate(date);
            setItems((prev) => {
              // prev[item.id].date = date;
              return prev;
            });
          }}
          peekMonthDropdown
          showYearDropdown
        />
      </div>
      <div style={{ display: 'inline-block', marginBottom: '5px' }}>
        <ResumeTitles>&nbsp;{end}</ResumeTitles>
        <StyledDatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={(date) => {
            setEndDate(date);
            setItems((prev) => {
              // prev[item.id].date = date;
              return prev;
            });
          }}
          peekMonthDropdown
          showYearDropdown
        />
      </div>
    </>
  );
}
