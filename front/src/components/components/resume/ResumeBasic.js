import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { LockFill, UnlockFill } from '@styled-icons/bootstrap';

import {
  ResumeImg,
  ResumeTitles,
  StyledHeaderMargin,
  Warning,
} from '../Styled';
import ResumeInputs from './ResumeInputs';
import ResumeGender from './ResumeGender';
import {
  PROFILE_GET_DONE,
  PROFILE_GET_REQUEST,
} from '../../../reducers/profile';

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

const MyLock = styled(LockFill)`
  width: 25px;
  color: red;
  cursor: pointer;
`;

const MyUnlock = styled(UnlockFill)`
  width: 25px;
  color: #7c7c7c;
  cursor: pointer;
`;
export default function ResumeBasic({
  onChange,
  handleOpen,
  open,
  setForm,
  form,
}) {
  const inputRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);

  const onChangeHandlerDate = useCallback(
    (e) => {
      const event = { target: { name: 'birth', value: e } };
      const date = event.target.value;
      date.setHours(date.getHours() + 9);
      if (event.target.name === 'birth') {
        setForm((prev) => ({
          ...prev,
          [event.target.name]: date,
        }));
      }
    },
    [setForm]
  );

  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('files', e.target.files[0]);
    const url = await axios
      .post('/file', data)
      .then((res) => res.data.files[0].url)
      .catch(
        () =>
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
      );
    if (file === undefined) {
      console.log('=== 이미지 업로드 실패(파일 미선택) ===');
    } else if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      alert('이미지 파일만 등록할 수 있습니다.');
    } else if (file.size > 1024 * 1024 * 10) {
      alert('10MB 이하 이미지만 가능합니다.');
    } else {
      e.target = { name: 'resumeImage', value: url.toString() };
      onChange(e);
    }
  };

  useEffect(() => {
    if (user.me === null) return;
    dispatch({ type: PROFILE_GET_REQUEST, me: user.me });
  }, [user.me, dispatch]);

  useEffect(() => {
    if (profile.profileGetData) {
      const profileTemp = { ...profile.profileGetData };
      if (profileTemp.birth !== null) {
        const date = new Date(
          profileTemp.birth[0],
          profileTemp.birth[1] - 1,
          profileTemp.birth[2]
        );
        date.setHours(date.getHours() + 9);
        setForm((p) => ({
          ...p,
          name: profileTemp.name,
          email: profileTemp.email,
          contact: profileTemp.contact,
          gender: profileTemp.gender,
          birth: date,
        }));
      } else {
        setForm((p) => ({
          ...p,
          ...profileTemp,
        }));
      }
      dispatch({ type: PROFILE_GET_DONE });
    }
  }, [profile.profileGetData, setForm, history, dispatch]);

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
            {open ? (
              <MyUnlock
                onClick={() => handleOpen()}
                onChange={(e) => onChange(e)}
              />
            ) : (
              <MyLock
                onClick={() => handleOpen()}
                onChange={(e) => onChange(e)}
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
          <input
            type="file"
            ref={inputRef}
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          <ResumeImg
            onClick={onButtonClick}
            onChange={(e) => onChange(e)}
            src={
              form.resumeImage !== ''
                ? form.resumeImage
                : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            }
            alt="resumeImg"
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <StyledHeaderMargin style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ResumeInputs
              itemName={'이름'}
              flex={'1 0 200px'}
              onChange={(e) => onChange(e)}
              name={'name'}
              value={form?.name || ''}
            />
            <div style={{ width: '205px' }}>
              <ResumeTitles>&nbsp;성별</ResumeTitles>
              <ResumeGender
                onChange={(e) => onChange(e)}
                name={'gender'}
                value={form?.gender || ''}
              />
            </div>
          </StyledHeaderMargin>
        </div>
        <div style={{ display: 'flex' }}>
          <ResumeInputs
            itemName={'연락처'}
            basic
            onChange={(e) => onChange(e)}
            name={'contact'}
            value={form?.contact || ''}
          />
          <div style={{ marginRight: '5px', flex: '0 0 200px' }}>
            <ResumeTitles>&nbsp;생년월일</ResumeTitles>
            <div className="customDatePickerWidth">
              <StyledDatePicker
                locale={ko}
                showYearDropdown
                peekMonthDropdown
                selected={form?.birth}
                dateFormat="yyyy-MM-dd"
                onChange={(e) => onChangeHandlerDate(e)}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <ResumeInputs
            basic
            name={'address'}
            itemName={'주소'}
            value={form?.address || ''}
            onChange={(e) => onChange(e)}
          />
        </div>
        <ResumeInputs
          sns
          name={'githubUrl'}
          itemName={'Github'}
          onChange={(e) => onChange(e)}
          value={form?.githubUrl || ''}
        />
        <ResumeInputs
          sns
          name={'blogUrl'}
          itemName={'기술 블로그'}
          onChange={(e) => onChange(e)}
          value={form?.blogUrl || ''}
        />
      </div>
    </>
  );
}
