import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ToggleOff } from '@styled-icons/bootstrap/ToggleOff';
import { ToggleOn } from '@styled-icons/bootstrap/ToggleOn';
import {
  Private,
  ProfileImg,
  ResumeImg,
  ResumeTitles,
  Warning,
} from '../Styled';
import ResumeInputs from './ResumeInputs';

const Toggle1 = styled(ToggleOff)`
  width: 30px;
  float: right;
  color: gray;
  margin-top: 5px;
`;

const Toggle2 = styled(ToggleOn)`
  width: 30px;
  float: right;
  color: #f5df4d;
  padding-top: 5px;
`;

const StyledDatePicker = styled(DatePicker)`
  //display: inline-block;
  width: 255px;
  height: 35px;
  border-radius: 27px;
  border: 1px solid silver;
  margin-bottom: 5px;
  padding-left: 15px;

  &:focus {
    outline: none;
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const InputTel = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 27px;
  border: 1px solid silver;
  padding: 0 20px 3px;
  margin-bottom: 5px;
  &:focus {
    outline: none;
  }
`;

const useInput = (initialState, validator) => {
  const [value, setValue] = useState(initialState);
  const onChange = (event) => {
    const {
      // eslint-disable-next-line no-shadow
      target: { value },
    } = event;
    let willUpdate = true;

    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const UseInput = () => {
  const maxLen = (value) => value.length <= 13;
  const name = useInput('010-', maxLen);
  return (
    <div className="UseInput">
      <InputTel {...name} />
    </div>
  );
};

export default function ResumeBasic() {
  const [img, setImage] = useState(null);
  const [bookmark, setBookmark] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const handleBookmark = () => {
    setBookmark(!bookmark);
  };
  const onChange = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setImage(evt.target.result);
    };
    if (e.target.files[0] !== undefined)
      reader.readAsDataURL(e.target.files[0]);
  };
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
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
              float: 'right',
              marginLeft: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            {bookmark ? <Toggle2 /> : <Toggle1 />}
          </div>
        </span>
        {bookmark ? <Private>공개</Private> : <Private>비공개</Private>}
        <div
          className={'row w-100'}
          style={{
            margin: '0px 1px 10px 1px',
          }}
        >
          <div className={'col-12 col-lg-4 pr-0'}>
            <div
              style={{
                width: '200px',
                height: '200px',
              }}
            >
              <ProfileImg>
                <ResumeImg
                  onClick={handleClick}
                  src={img}
                  alt="resumeImg"
                  style={{ cursor: 'pointer' }}
                />
              </ProfileImg>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={onChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className={'col-12 col-lg-8 row w-100 p-0 m-0'}>
            <div className={'col-12 col-lg-6 pl-0'}>
              <ResumeInputs basic name={'이름'} />
              <div
                style={{
                  marginBottom: '5px',
                }}
              >
                <ResumeTitles>&nbsp;생년월일</ResumeTitles>
                <div>
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
            </div>
            <div className={'col-12 col-lg-6 pl-0'}>
              <ResumeInputs basic name={'성별'} />
              <div>
                <div
                  style={{
                    marginBottom: '5px',
                    color: 'gray',
                  }}
                >
                  연락처
                </div>
                <UseInput />
              </div>
            </div>
            <div className={'row w-100'} style={{ padding: '0 0 0 15px' }}>
              <div className={'col-12'} style={{ padding: '0' }}>
                <ResumeInputs basic name={'주소'} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={'col-12'}
          style={{
            width: '100%',
            padding: '0',
          }}
        >
          <div
            style={{
              padding: '0 15px 0 15px',
            }}
          >
            <ResumeInputs sns name={'GitHub'} />
            <ResumeInputs sns name={'기술 블로그'} />
          </div>
        </div>
      </div>
    </>
  );
}
