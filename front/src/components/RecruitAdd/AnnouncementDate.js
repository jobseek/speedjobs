import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';
import { StyledButton } from '../Styled';

const RecruitDatePicker = styled(DatePicker)`
  border: none;
  width: 84px;
  border-bottom: 1px solid #a1a1a1;
  padding: 2px 0 2px 0;
  margin: 0 5px;
  display: inline-block;
  z-index: 10;
`;

export default function AnnouncementDate({ onChange, form, setForm }) {
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

  // 공고수정시 날짜배열 데이터타입 변경
  useEffect(() => {
    if (typeof form.openDate !== 'string') {
      const open = new Date(
        `${form.openDate[0]}-${form.openDate[1]}-${form.openDate[2]}`
      );
      setStartDate(open);
      const oDate = moment(open).format('YYYY-MM-DD 00:00:00');
      setForm((p) => ({
        ...p,
        openDate: oDate,
      }));
    }
    if (typeof form.closeDate !== 'string') {
      const close = new Date(
        `${form.closeDate[0]}-${form.closeDate[1]}-${form.closeDate[2]}`
      );
      const cDate = moment(close).format('YYYY-MM-DD 00:00:00');
      setFinishDate(close);
      setForm((p) => ({
        ...p,
        closeDate: cDate,
      }));
    }
  }, [form.openDate, form.closeDate, setForm]);

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
        <StyledButton
          grey
          sm
          onClick={() => {
            const regular = new Date('9999-12-31');
            const event = {
              target: { name: 'closeDate', value: regular },
            };
            onChange(event);
            setFinishDate(regular);
          }}
        >
          상시채용
        </StyledButton>
      </div>
    </>
  );
}
