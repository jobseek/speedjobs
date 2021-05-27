import { v4 } from 'uuid';
import React, { useCallback } from 'react';
import ResumeInputs from './ResumeInputs';
import {
  Add,
  MyPlus,
  ResumeTitles,
  StyledDatePicker,
  Subtract,
  Warning,
} from '../Styled';

export default function ResumeCertificate({ form, setForm }) {
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
        const certDate = event.target.value;
        certDate.setHours(certDate.getHours() + 9);
        setForm((p) => {
          const temp = p.certificates.map((c) => {
            if (p.certificates.indexOf(c) === index) {
              return { ...c, [event.target.name]: certDate };
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

  const minus = useCallback(() => {
    setForm((prev) => {
      const next = prev.certificates.slice(0, prev.certificates.length - 1);
      return { ...prev, certificates: next };
    });
  }, [setForm]);

  const itemList = form.certificates.map((item, index) => {
    return (
      <div key={index}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'이름'}
            value={item.certName || ''}
            name={'certName'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'급수'}
            value={item.degree || ''}
            name={'degree'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'점수'}
            value={item.score || ''}
            name={'score'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
          <ResumeInputs
            flex={'1'}
            itemName={'발급기관'}
            value={item.institute || ''}
            name={'institute'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'발급번호'}
            value={item.certNumber || ''}
            name={'certNumber'}
            onChange={(e) => onChangeCertificate(e, index)}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                width: '100%',
                display: 'inline-block',
                marginBottom: '5px',
              }}
            >
              <div style={{ marginRight: '5px' }}>
                <ResumeTitles>&nbsp;발급일자</ResumeTitles>
                <StyledDatePicker
                  value={item?.certDate || ''}
                  onChange={(date) => onChangeDate(date, index)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <MyPlus onClick={() => minus()}>
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
