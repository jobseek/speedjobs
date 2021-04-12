import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ResumeInputs from './ResumeInputs';
import { MyEducation, Warning } from '../Styled';
import DatePickRange from '../DatePickRange';

export default function ResumeEducation() {
  const [items, setItems] = useState([{ id: 0 }]);
  const itemList = items.map((item, index) => (
    <div key={index}>
      <ResumeInputs item name={'학교이름'} />
      <ResumeInputs item name={'전공'} />
      <DatePickRange
        start={'입학날짜'}
        end={'졸업날짜'}
        item={item}
        setItems={setItems}
      />
    </div>
  ));
  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h5 style={{ display: 'inline-block' }}>최종학력</h5>
        <Warning>
          최종 학력만 입력하세요 (편입한 경우 편입한 대학을 기입하세요)
        </Warning>
        <div style={{ marginLeft: '15px' }}>
          <MyEducation>고등학교</MyEducation>
          <div>{itemList}</div>
          <MyEducation>대학교</MyEducation>
          <div>{itemList}</div>
          <MyEducation>대학원</MyEducation>
          <div>{itemList}</div>
        </div>
      </div>
    </>
  );
}
