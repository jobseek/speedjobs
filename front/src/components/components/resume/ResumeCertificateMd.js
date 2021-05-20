import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { v4 } from 'uuid';
import { ko } from 'date-fns/esm/locale';
import React, { useCallback } from 'react';
import ResumeInputs from './ResumeInputs';
import { Add, MyPlus, ResumeTitles, Subtract, Warning } from '../Styled';

const StyledDatePicker = styled(DatePicker)`
  width: 295px;
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

export default function ResumeCertificateMd({ form, setForm }) {
  const itemList = form.certificates.map((item, index) => {
    return (
      <div key={index}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'이름'}
            value={item.certName}
            name={'certName'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'급수'}
            value={item.degree}
            name={'degree'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'점수'}
            value={item.score}
            name={'score'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'발급기관'}
            value={item.institute}
            name={'institute'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'발급번호'}
            value={item.certNumber}
            name={'certNumber'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeTitles>&nbsp;발급일자</ResumeTitles>
            <StyledDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={item.certDate}
              onChange={(date) => onChangeDate(date, index)}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
        </div>
      </div>
    );
  });

  const onChangeCertificate = useCallback(
    (e, index) => {
      setForm((p) => {
        const temp = p.certificates.map((c) => {
          if (p.certificates.indexOf(c) === index) {
            return { ...c, [e.target.name]: e.target.value };
          }
          return c;
        });
        return { ...p, certificates: temp };
      });
    },
    [setForm]
  );

  const onChangeDate = useCallback(
    (date, index) => {
      const event = { target: { name: 'certDate', value: date } };
      if (event.target.name === 'certDate') {
        setForm((p) => {
          const temp = p.certificates.map((c) => {
            if (p.certificates.indexOf(c) === index) {
              return { ...c, [event.target.name]: event.target.value };
            }
            return c;
          });
          return { ...p, certificates: temp };
        });
      }
    },
    [setForm]
  );
  const add = useCallback(() => {
    setForm((p) => {
      return {
        ...p,
        certificates: [
          ...p.certificates,
          {
            index: v4(),
            certName: '',
            certNumber: '',
            institute: '',
            certDate: '',
            score: '',
            degree: '',
          },
        ],
      };
    });
  }, [setForm]);
  const test2 = useCallback(() => {
    setForm((prev) => {
      const next = prev.certificates.slice(0, prev.certificates.length - 1);
      return { ...prev, certificates: next };
    });
  }, [setForm]);

  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <MyPlus onClick={() => test2()}>
          <Subtract />
        </MyPlus>
        <MyPlus onClick={() => add()}>
          <Add />
        </MyPlus>
        <div>
          <h5>
            자격증
            <Warning>
              <span style={{ fontSize: '17px' }}>+</span>
              &nbsp;&nbsp;버튼을 누르면 추가할 수 있습니다.
            </Warning>
          </h5>
        </div>
        <div style={{ display: 'inline-block', width: '100%' }}>{itemList}</div>
      </div>
    </>
  );
}