import React, { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';

const RecruitDatePicker = styled(DatePicker)`
  border: none;
  width: 84px;
  border-bottom: 1px solid #a1a1a1;
  padding: 2px 0 2px 0;
  margin: 0 5px;
  display: inline-block;
`;

export default function AnnouncementDate({ onChange }) {
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const StartDateHandler = useCallback(
    (e) => {
      const event = { target: { name: 'openDate', value: e } };
      onChange(event);
    },
    [onChange]
  );
  const FinishDateHandler = useCallback(
    (e) => {
      const event = { target: { name: 'closeDate', value: e } };
      onChange(event);
    },
    [onChange]
  );

  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <div style={{ display: 'inline-block' }}>
          <RecruitDatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            peekMonthDropdown
            showYearDropdown
            selected={startDate}
            onSelect={(e) => setStartDate(e)}
            onChange={(e) => StartDateHandler(e)}
          />
        </div>
        ~
        <div style={{ display: 'inline-block' }}>
          <RecruitDatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            peekMonthDropdown
            showYearDropdown
            selected={finishDate}
            onSelect={(e) => setFinishDate(e)}
            onChange={(e) => FinishDateHandler(e)}
          />
        </div>
      </div>
    </>
  );
}
