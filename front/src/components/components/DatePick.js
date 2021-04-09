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

export default function DatePick({ item, setItems }) {
  const [startDate, setStartDate] = useState(item.date);
  return (
    <>
      <div style={{ display: 'inline-block', marginBottom: '5px' }}>
        <ResumeTitles>&nbsp;발급일자</ResumeTitles>
        <StyledDatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setItems((prev) => {
              prev[item.id].date = date;
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
