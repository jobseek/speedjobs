import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import '../../components/DatePicker/customDatePickerWidth.css';
import {
  PROFILE_GET_REQUEST,
  PROFILE_UPDATE_DONE,
  PROFILE_UPDATE_REQUEST,
} from '../../../reducers/profile';
import {
  InputText,
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../../components/Styled';
import SideMenu from '../../components/SideMenu';
import ProfileImage from '../../components/Profile/ProfileImage';
import ProfileInputs from '../../components/Profile/ProfileInputs';
import SelectGender from '../../components/Profile/SelectGender';
import ProfileTextarea from '../../components/Profile/ProfileTextarea';
import { ME_REQUEST } from '../../../reducers/user';

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

export default function IndividualModify() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [refresh] = useCookies(['REFRESH_TOKEN']);
  const [, setStartDate] = useState('');
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

  useEffect(() => {
    if (user.me === null) {
      return;
    }
    dispatch({ type: PROFILE_GET_REQUEST, me: user.me });
  }, [user.me, dispatch]);

  useEffect(() => {
    if (profile.profileGetData) {
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      if (profileTemp.birth !== null) {
        const date = new Date(
          profileTemp.birth[0],
          profileTemp.birth[1] - 1,
          profileTemp.birth[2]
        );
        date.setHours(date.getHours() + 9);
        setForm((p) => ({
          ...p,
          ...profileTemp,
          birth: date,
        }));
      } else {
        setForm((p) => ({
          ...p,
          ...profileTemp,
        }));
      }
    }
  }, [profile.profileGetData]);

  const onChangeInput = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onChangeDate = useCallback((e) => {
    const event = { target: { name: 'birth', value: e } };
    const date = event.target.value;
    date.setHours(date.getHours() + 9);
    if (event.target.name === 'birth') {
      setForm((prev) => ({
        ...prev,
        [event.target.name]: date,
      }));
    }
  }, []);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (user.me !== null) {
        dispatch({
          type: PROFILE_UPDATE_REQUEST,
          data: form,
          me: user.me,
        });
      }
    },
    [user.me, dispatch, form]
  );

  useEffect(() => {
    if (profile.profileUpdateDone) {
      dispatch({ type: PROFILE_UPDATE_DONE });
      dispatch({
        type: ME_REQUEST,
        data: { accessToken: refresh['ACCESS_TOKEN'] },
      });
      history.goBack();
    }
  }, [profile, history, dispatch, refresh]);

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
            {/* 프로필 이미지*/}
            <ProfileImage
              onChange={(e) => onChangeInput(e)}
              value={form.picture || ''}
            />
            {/* 이름 */}
            <ProfileInputs name={'이름'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'name'}
              type="text"
              value={form.name || ''}
            />
            {/* 닉네임 */}
            <ProfileInputs name={'닉네임'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'nickname'}
              type="text"
              value={form.nickname || ''}
            />
            {/* 생년월일*/}
            <ProfileInputs name={'생년월일'} />
            <div className="customDatePickerWidth">
              <StyledDatePicker
                locale={ko}
                peekMonthDropdown
                showYearDropdown
                dateFormat="yyyy-MM-dd"
                selected={form.birth}
                onSelect={(e) => setStartDate(e)}
                onChange={(e) => onChangeDate(e)}
              />
            </div>
            {/* 성별: 남, 여 체크 */}
            <ProfileInputs name={'성별'} />
            <SelectGender
              onChange={(e) => onChangeInput(e)}
              name={'gender'}
              value={form.gender || ''}
            />
            {/* 연락처: 집 or 핸드폰 */}
            <ProfileInputs name={'연락처'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'contact'}
              type="tel"
              maxLength="13"
              value={form.contact || ''}
            />
            {/* 한 줄 소개 */}
            <ProfileInputs name={'한 줄 소개'} />
            <ProfileTextarea
              onChange={(e) => onChangeInput(e)}
              name={'bio'}
              value={form.bio || ''}
            />
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
