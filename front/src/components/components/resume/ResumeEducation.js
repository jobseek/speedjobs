import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import ResumeInputs from './ResumeInputs';
import { MyEducation, Warning } from '../Styled';
import DatePickRange from '../DatePickRange';
import { RESUME_ADD_REQUEST } from '../../../reducers/resume';

export default function ResumeEducation() {
  const [form] = useState([
    {
      id: 1,
      education: 'High',
      schoolName: '',
      major: '',
      inDate: '',
      outDate: '',
    },
  ]);
  const [items, setItems] = useState([{ id: 0 }]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const itemList = items.map((item, index) => (
    <div key={index} style={{ display: 'flex', flexFlow: 'wrap' }}>
      <ResumeInputs
        itemName={'학교이름'}
        onChange={(e) => onChangeHandler(e)}
      />
      <ResumeInputs
        itemName={'전공'}
        name={'major'}
        onChange={(e) => onChangeHandler(e)}
      />
      <DatePickRange
        start={'입학날짜'}
        end={'졸업날짜'}
        item={item}
        setItems={setItems}
      />
    </div>
  ));

  const onChangeHandler = useCallback((e) => {
    form[0].schoolName = e.target.value;
  }, []);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (user.me.id === null) return;
      dispatch({
        type: RESUME_ADD_REQUEST,
        data: form,
      });
      // history.push('/resume');
      console.log('변경사항', form);
      console.log('변경사항', form[0]);
    },

    [dispatch, form, user.me.id]
  );
  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h5 style={{ display: 'inline-block' }}>최종학력</h5>
        <Warning>
          최종 학력만 입력하세요 (편입한 경우 편입한 대학을 기입하세요)
        </Warning>
        <MyEducation>고등학교</MyEducation>
        {itemList}
        <MyEducation>대학교</MyEducation>
        {itemList}
        <MyEducation>대학원</MyEducation>
        {itemList}
      </div>
    </>
  );
}
