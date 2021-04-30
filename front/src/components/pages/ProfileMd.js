import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import '../components/DatePicker/customDatePickerWidth.css';
import {
  InputText,
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ProfileImage from '../components/Profile/ProfileImage';
import ProfileInputs from '../components/Profile/ProfileInputs';
import ProfileGender from '../components/Profile/ProfileGender';
import ProfileTextarea from '../components/Profile/ProfileTextarea';

import {
  PROFILE_GET_REQUEST,
  PROFILE_UPDATE_REQUEST,
} from '../../reducers/profile';

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 35px;
  border-radius: 27px;
  background-color: #fdfdfd;
  border: 1px solid silver;
  margin-bottom: 5px;
  padding-left: 15px;

  &:focus {
    outline: none;
  }
`;

export default function ProfileMd() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [startDate, setStartDate] = useState('');

  const [form, setForm] = useState({
    name: '',
    nickname: '',
    password: '',
    gender: '',
    contact: '',
    bio: '',
    picture: '',
    birth: '',
  });

  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onChangeHandler2 = useCallback(
    (e) => {
      console.log('=== e ===', e);
      const event = { target: { name: 'birth', value: e } };
      console.log('=== event ===', event);
      console.log('=== event.target ===', event.target);
      console.log('=== event.target.name ===', event.target.name);
      console.log('=== event.target.value ===', event.target.value);
      if (event.target.name === 'birth') {
        console.log('hi');
        setForm((prev) => ({
          ...prev,
          [event.target.name]: moment(event.target.value).format('YYYY-MM-DD'),
        }));
      }
      console.log('=== form ===', form);
    },
    [form]
  );

  // useEffect(() => {
  //   if (profile.profileUpdateDone) {
  //     // history.push('/profile');
  //     window.location.replace('/profile');
  //   }
  // }, [profile, history]);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (user.me.id === null) return;
      dispatch({
        type: PROFILE_UPDATE_REQUEST,
        data: form,
        data2: user.me,
        me: user.me.id,
      });
      history.push('/profile');
    },

    [dispatch, form, user.me, history]
  );

  useEffect(() => {
    if (profile.profileGetData) {
      console.log('테스트', profile.profileGetData);
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      setForm({ ...profileTemp });
    }
  }, [profile.profileGetData]);

  useEffect(() => {
    if (user.me === null) return;
    dispatch({ type: PROFILE_GET_REQUEST, data: user.me });
  }, [user.me, dispatch]);

  return (
    <div className="container text-left">
      <StyledHeaderDiv padding title={'계정 수정'}>
        <div style={{ flex: '0 0' }}>
          <StyledButton
            style={{ marginRight: '0' }}
            wide
            onClick={(e) => onSubmitHandler(e)}
          >
            변경 사항 저장
          </StyledButton>
        </div>
      </StyledHeaderDiv>
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center">
          <StyledLeftLayout borderNone className={'col-12 col-lg-2 text-left'}>
            <SideMenu />
          </StyledLeftLayout>
          <ProfileDiv className={'col-12 col-lg-10'}>
            {/* <ProfileModify />*/}
            <ProfileImage
              onChange={(e) => onChangeHandler(e)}
              value={form.picture || ''}
            />

            {/* 이름 */}
            <ProfileInputs name={'이름'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'name'}
              type="text"
              value={form.name || ''}
            />
            {/* 닉네임 */}
            <ProfileInputs name={'닉네임'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'nickname'}
              type="text"
              value={form.nickname || ''}
            />
            {/* 생년월일 */}
            {/* <InputText*/}
            {/*  onChange={(e) => onChangeHandler(e)}*/}
            {/*  name={'birth'}*/}
            {/*  type="text"*/}
            {/*  value={form.birth || ''}*/}
            {/* />*/}
            <div>
              <ProfileInputs name={'생년월일'} />
              <div className="customDatePickerWidth">
                <StyledDatePicker
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  onSelect={(e) => setStartDate(e)}
                  onChange={(e) => onChangeHandler2(e)}
                  peekMonthDropdown
                  showYearDropdown
                />
              </div>
            </div>

            {/* 비밀번호 */}
            {/* <ProfileInputs name={'비밀번호'} />*/}
            {/* <InputText*/}
            {/*  onChange={(e) => onChangeHandler(e)}*/}
            {/*  name={'password'}*/}
            {/*  type="password"*/}
            {/*  value={form.password}*/}
            {/* />*/}
            {/* {console.log('비밀본호-------', form.password)}*/}

            {/* <ProfileInputs name={'비밀번호 확인'} />*/}
            {/* <InputText onChange={(e) => onChangeHandler(e)} type="password" />*/}

            {/* 성별: 남, 여 체크 */}
            <ProfileInputs name={'성별'} />
            <ProfileGender
              onChange={(e) => onChangeHandler(e)}
              name={'gender'}
              value={form.gender || ''}
            />

            {/* 연락처: 집 or 핸드폰 */}
            <ProfileInputs name={'연락처'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'contact'}
              type="tel"
              maxLength="13"
              value={form.contact || ''}
            />
            {/* 한 줄 소개 */}
            <ProfileInputs name={'한 줄 소개'} />
            <ProfileTextarea
              onChange={(e) => onChangeHandler(e)}
              name={'bio'}
              value={form.bio || ''}
            />
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
