import React, { useCallback, useRef, useState } from 'react';
import DatePick from '../DatePick';
import ResumeInputs from './ResumeInputs';
import { Add, MyPlus, Subtract, Warning } from '../Styled';

export default function ResumeCertificate() {
  const [, setForce] = useState(false);
  const forceUp = () => {
    setForce((prev) => !prev);
  };
  const cnt = useRef(1);
  const [items, setItems] = useState([{ id: 1, date: null }]);
  const itemList = items.map((item, index) => {
    return (
      <div key={index} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ResumeInputs item name={'이름'} />
        <ResumeInputs item name={'발급기관'} />
        <ResumeInputs item name={'발급번호'} />
        <div style={{ display: 'inline-block' }}>
          <DatePick item={item} setItems={setItems} />
        </div>
      </div>
    );
  });

  const test = () => {
    setItems((prev) => [...items, { id: cnt, date: null }]);
    cnt.current++;
    console.log(cnt.current);
  };
  const test2 = useCallback(() => {
    setItems((prev) => {
      return prev.slice(0, prev.length - 1);
    });
    forceUp();
  }, []);
  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <MyPlus onClick={() => test2()}>
          <Subtract />
        </MyPlus>
        <MyPlus onClick={() => test()}>
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
        <div style={{ display: 'inline-block' }}>{itemList}</div>
      </div>
    </>
  );
}
