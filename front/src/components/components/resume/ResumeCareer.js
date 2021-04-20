import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import ResumeInputs from './ResumeInputs';
import { Add, MyPlus, Subtract, Warning } from '../Styled';
import Tags from '../Tags';
import DatePickRange from '../DatePickRange';

export default function ResumeCareer() {
  const [, setForce] = useState(false);
  const forceUp = () => {
    setForce((prev) => !prev);
  };
  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      // const res = [];
      console.log(temp);
      // temp.forEach((item) => {
      //   res.concat([...res, { ...item, item }]);
      //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      // });
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      console.log(tt);
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);
  const cnt = useRef(1);
  const [items, setItems] = useState([{ id: 0 }]);
  const itemList = items.map((item, index) => (
    <div key={index}>
      <ResumeInputs item name={'회사이름'} />
      <ResumeInputs item name={'직급'} />
      <DatePickRange
        start={'입사날짜'}
        end={'퇴사날짜'}
        item={item}
        setItems={setItems}
      />
      <Tags tagList={taglist}>직무</Tags>
    </div>
  ));
  const test = () => {
    setItems((prev) => [...items, { id: cnt.current }]);
  };
  const test2 = () => {
    setItems((prev) => {
      return prev.slice(0, prev.length - 1);
    });
    forceUp();
  };

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
        <div style={{ display: 'inline-block', marginLeft: '15px' }}>
          {itemList}
        </div>
      </div>
    </>
  );
}
