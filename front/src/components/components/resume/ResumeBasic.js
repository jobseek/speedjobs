import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ToggleOff } from '@styled-icons/bootstrap/ToggleOff';
import { ToggleOn } from '@styled-icons/bootstrap/ToggleOn';
import {
  Private,
  ResumeImg,
  ResumeTitles,
  StyledButton,
  StyledHeaderMargin,
  Warning,
} from '../Styled';
import ResumeInputs from './ResumeInputs';
import { RESUME_ADD_REQUEST } from '../../../reducers/resume';

const Toggle1 = styled(ToggleOff)`
  width: 30px;
  color: gray;
  cursor: pointer;
`;

const Toggle2 = styled(ToggleOn)`
  width: 30px;
  color: #f5df4d;
  cursor: pointer;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 200px;
  height: 35px;
  border-radius: 5px;
  background-color: #fdfdfd;
  border: 1px solid silver;
  margin-bottom: 5px;
  padding-left: 15px;

  &:focus {
    outline: none;
  }
`;

export default function ResumeBasic() {
  const [form, setForm] = useState({
    open: '',
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [img, setImage] = useState(
    'https://www.namethedish.com/wp-content/uploads/2020/03/img-placeholder-portrait.png.webp'
  );
  const [bookmark, setBookmark] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const handleBookmark = () => {
    setBookmark(!bookmark);
    if (bookmark) {
      form.open = 'YES';
    } else {
      form.open = 'NO';
    }
  };

  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    },

    [dispatch, form, user.me.id]
  );

  const onChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('files', e.target.files[0]);

    const url = await axios
      .post('/file', formData)
      .then((res) => res.data.files[0].url)
      .catch(
        () =>
          'https://www.namethedish.com/wp-content/uploads/2020/03/img-placeholder-portrait.png.webp'
      );
    if (file === undefined) {
      console.log('=== 이미지 업로드 실패(파일 미선택) ===');
      setImage(img);
    } else if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      alert('이미지 파일만 등록할 수 있습니다.');
      console.log('=== 이미지 업로드 실패(잘못된 파일 형식) ===');
      setImage(img);
    } else if (file.size > 1024 * 1024) {
      alert('1MB 이하 이미지만 가능합니다.');
      console.log('=== 이미지 업로드 실패(용량 초과) ===');
      setImage(img);
    } else {
      console.log('=== 이미지 업로드 성공 ===');
      setImage(url);
      form.resume_image = url;
    }
  };
  const hiddenFileInput = React.useRef(null);
  const handleClick = async () => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h5 style={{ display: 'inline-block' }}>기본 정보</h5>
        <Warning>
          입력하신 정보는 절대 사용자 동의 없이 외부로 유출, 공개되지 않습니다.
        </Warning>
        <span>
          <div
            style={{
              position: 'absolute',
              border: 'none',
              background: 'none',
              right: '9px',
              top: '9px',
            }}
          >
            {console.log('form.open', form.open)}
            {bookmark ? <Private>공개</Private> : <Private>비공개</Private>}
            {bookmark ? (
              <Toggle2
                onClick={handleBookmark}
                onChange={(e) => onChangeHandler(e)}
                name={'open'}
              />
            ) : (
              <Toggle1
                onClick={handleBookmark}
                onChange={(e) => onChangeHandler(e)}
                name={'open'}
              />
            )}
          </div>
        </span>
        <div
          style={{
            width: '200px',
            height: '230px',
            margin: '25px auto',
          }}
        >
          <ResumeImg
            onClick={handleClick}
            src={img}
            alt="resumeImg"
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={onChange}
            style={{ display: 'none' }}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <StyledHeaderMargin style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ResumeInputs flex={'1 0 200px'} />
            <ResumeInputs flex={'0 0 205px'} />
          </StyledHeaderMargin>
        </div>
        <div style={{ display: 'flex' }}>
          <ResumeInputs basic />
          <div
            style={{
              marginRight: '5px',
              flex: '0 0 200px',
            }}
          >
            <ResumeTitles>&nbsp;생년월일</ResumeTitles>
            <StyledDatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              peekMonthDropdown
              showYearDropdown
            />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <ResumeInputs basic />
        </div>
        <ResumeInputs sns />
        <ResumeInputs sns />
      </div>
      <StyledButton
        style={{ marginRight: '0' }}
        wide
        onClick={(e) => onSubmitHandler(e)}
      >
        변경 사항 저장
      </StyledButton>
    </>
  );
}
