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
} from '../../reducers/profile';
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
import { ME_REQUEST } from '../../reducers/user';

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
      if (profileTemp.birth) {
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
          bio: '',
        }));
      }
    }
  }, [profile.profileGetData]);

  const onChangeInput = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onChangeBio = (e) => {
    if (e.target.value.length <= 100) {
      setForm((p) => ({ ...p, bio: e.target.value }));
    } else {
      alert('100??? ????????? ??????????????????');
    }
  };

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
      <StyledHeaderDiv padding title={'?????? ??????'}>
        <div style={{ flex: '0 0' }}>
          <StyledButton
            style={{ marginRight: '0' }}
            wide
            onClick={(e) => onSubmitHandler(e)}
          >
            ?????? ?????? ??????
          </StyledButton>
        </div>
      </StyledHeaderDiv>
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center">
          <StyledLeftLayout borderNone className={'col-12 col-lg-2 text-left'}>
            <SideMenu />
          </StyledLeftLayout>
          <ProfileDiv className={'col-12 col-lg-10'}>
            {/* ????????? ?????????*/}
            <ProfileImage
              onChange={(e) => onChangeInput(e)}
              value={form.picture || ''}
            />
            {/* ?????? */}
            <ProfileInputs name={'??????'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'name'}
              type="text"
              value={form.name || ''}
            />
            {/* ????????? */}
            <ProfileInputs name={'?????????'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'nickname'}
              type="text"
              value={form.nickname || ''}
            />
            {/* ????????????*/}
            <ProfileInputs name={'????????????'} />
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
            {/* ??????: ???, ??? ?????? */}
            <ProfileInputs name={'??????'} />
            <SelectGender
              onChange={(e) => onChangeInput(e)}
              name={'gender'}
              value={form.gender || ''}
            />
            {/* ?????????: ??? or ????????? */}
            <ProfileInputs name={'?????????'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'contact'}
              type="tel"
              maxLength="13"
              value={form.contact || ''}
            />
            {/* ??? ??? ?????? */}
            <ProfileInputs name={'??? ??? ??????'} />
            <ProfileTextarea
              onChange={onChangeBio}
              value={form.bio || ''}
              form={form}
              setForm={setForm}
            />
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
