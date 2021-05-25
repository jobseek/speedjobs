import React, { useCallback } from 'react';
import { v4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import ResumeInputs from './ResumeInputs';
import { Add, MyPlus, ResumeTitles, Subtract, Warning } from '../Styled';

const StyledDatePicker = styled(DatePicker)`
  width: 220px;
  height: 35px;
  border-radius: 5px;
  background-color: #fdfdfd;
  border: 1px solid silver;
  margin-bottom: 5px;
  margin-right: 5px;
  padding-left: 15px;

  &:focus {
    outline: none;
  }
`;

export default function ResumeCareer({ form, setForm }) {
  const onChangeCareer = useCallback(
    (e, index) => {
      setForm((p) => {
        const temp = p.careers.map((c) => {
          if (p.careers.indexOf(c) === index) {
            return { ...c, [e.target.name]: e.target.value };
          }
          return c;
        });
        return { ...p, careers: temp };
      });
    },
    [setForm]
  );

  const onChangeInDate = useCallback(
    (date, index) => {
      const event = { target: { name: 'inDate', value: date } };
      if (event.target.name === 'inDate') {
        const inDate = event.target.value;
        inDate.setHours(inDate.getHours() + 9);
        setForm((p) => {
          const temp = p.careers.map((c) => {
            if (p.careers.indexOf(c) === index) {
              return { ...c, [event.target.name]: inDate };
            }
            return c;
          });
          return { ...p, careers: temp };
        });
      }
    },
    [setForm]
  );

  const onChangeOutDate = useCallback(
    (date, index) => {
      const event = { target: { name: 'outDate', value: date } };
      if (event.target.name === 'outDate') {
        const outDate = event.target.value;
        outDate.setHours(outDate.getHours() + 9);
        setForm((p) => {
          const temp = p.careers.map((c) => {
            if (p.careers.indexOf(c) === index) {
              return { ...c, [event.target.name]: outDate };
            }
            return c;
          });
          return { ...p, careers: temp };
        });
      }
    },
    [setForm]
  );

  const test = useCallback(() => {
    setForm((p) => {
      return {
        ...p,
        careers: [
          ...p.careers,
          {
            index: v4(),
            companyName: '',
            position: '',
            inDate: '',
            outDate: '',
          },
        ],
      };
    });
  }, [setForm]);

  const test2 = useCallback(() => {
    setForm((prev) => {
      const next = prev.careers.slice(0, prev.careers.length - 1);
      return { ...prev, careers: next };
    });
  }, [setForm]);
  const itemList = form.careers.map((item, index) => {
    return (
      <div key={index}>
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'회사이름'}
            value={item.companyName}
            name={'companyName'}
            onChange={(e) => onChangeCareer(e, index)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'직급'}
            value={item.position}
            name={'position'}
            onChange={(e) => onChangeCareer(e, index)}
          />
          <div style={{ display: 'inline-block', margin: '0 0 5px 0' }}>
            <ResumeTitles>&nbsp;입사날짜</ResumeTitles>
            <StyledDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={item.inDate}
              selectsStart
              startDate={item.inDate}
              endDate={item.outDate}
              onChange={(date) => onChangeInDate(date, index)}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeTitles>&nbsp;퇴사일자</ResumeTitles>
            <StyledDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={item.outDate}
              selectsEnd
              startDate={item.inDate}
              endDate={item.outDate}
              onChange={(date) => onChangeOutDate(date, index)}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <MyPlus onClick={() => test2()}>
          <Subtract />
        </MyPlus>
        <MyPlus onClick={() => test()}>
          <Add />
        </MyPlus>
        <h5 style={{ display: 'inline-block' }}>
          경력
          <Warning>
            <span style={{ fontSize: '17px' }}>+</span>
            &nbsp;&nbsp;버튼을 누르면 추가할 수 있습니다.
          </Warning>
        </h5>
        <div style={{ display: 'inline-block', width: '100%' }}>{itemList}</div>
      </div>
    </>
  );
}
