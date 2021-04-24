import React, { useState } from 'react';
import axios from 'axios';
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
  StyledHeaderMargin,
  Warning,
} from '../Styled';
import ResumeInputs from './ResumeInputs';

const Toggle1 = styled(ToggleOff)`
  width: 30px;
  color: gray;
`;

const Toggle2 = styled(ToggleOn)`
  width: 30px;
  color: #f5df4d;
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
  const [img, setImage] = useState(
    'https://www.namethedish.com/wp-content/uploads/2020/03/img-placeholder-portrait.png.webp'
  );
  const [bookmark, setBookmark] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const handleBookmark = () => {
    setBookmark(!bookmark);
  };
  const onChange = async (e) => {
    const file = e.target.files[0];
    console.log('테스트-----------', file);
    const formData = new FormData();
    formData.append('files', e.target.files[0]);
    console.log(formData);
    console.log(e.target.files[0]);

    const url = await axios
      .post('/file', formData)
      .then((res) => res.data.files[0].url)
      .catch(
        () =>
          'https://www.namethedish.com/wp-content/uploads/2020/03/img-placeholder-portrait.png.webp'
      );
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      alert('이미지 파일만 등록할 수 있습니다.');
      setImage(
        'https://www.namethedish.com/wp-content/uploads/2020/03/img-placeholder-portrait.png.webp'
      );
    } else {
      console.log(url);
      setImage(url);
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
        <span onClick={handleBookmark}>
          <div
            style={{
              position: 'absolute',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              right: '9px',
              top: '9px',
            }}
          >
            {bookmark ? <Private>공개</Private> : <Private>비공개</Private>}
            {bookmark ? <Toggle2 /> : <Toggle1 />}
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
            <ResumeInputs name={'이름'} flex={'1 0 200px'} />
            <ResumeInputs name={'성별'} flex={'0 0 205px'} />
          </StyledHeaderMargin>
        </div>
        <div style={{ display: 'flex' }}>
          <ResumeInputs basic name={'연락처'} />
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
          <ResumeInputs basic name={'주소'} />
        </div>
        <ResumeInputs sns name={'GitHub'} />
        <ResumeInputs sns name={'기술 블로그'} />
      </div>
    </>
  );
}
