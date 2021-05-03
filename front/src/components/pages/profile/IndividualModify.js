import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import '../../components/DatePicker/customDatePickerWidth.css';
import {
  PROFILE_GET_REQUEST,
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

/**
 * 개인회원 수정 페이지
 * 1. dispatch => PROFILE_GET_REQUEST 액션 발생
 * 2. useState를 이용해서 각 항목의 이름을 선언하고 빈문자열로 초기화한다.
 * 3. 조회 페이지에 있었던 값들을 수정페이지에서도 볼 수 있도록 한다.
 * 4. setForm에 저장되어 있는 각 항목을 input 값에 뿌려준다.
 * 5. 데이터를 수정하게 되면 각 항목에 해당하는 e.target.name을 매칭하여 onChangeInput, onChangeDate 이벤트가 발생하도록한다.
 * 6. setForm을 이용해서 변경된 값들을 저장한다.
 * 7. 마지막으로 '변경 사항 저장' 버튼에 onClick 이벤트를 걸어주어 onSubmitHandler 이벤트가 발생하도록 한다.
 * 8. dispatch를 이용해서 PROFILE_UPDATE_REQUEST 리덕스 상태를 전송하고,
 * 9. Redux_Saga에 변경된 데이터 form, role을 확인하기위한 user.me, 사용자 고유 id를 확인하기 위한 user.me.id를 같이 보내준다.
 * 10. 리덕스가 PROFILE_UPDATE_SUCCESS를 보내주면 성공적으로 수정이 완료되었기 때문에 useHistory를 이용해서 조회 페이지로 가게 한다.
 */

export default function IndividualModify() {
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

  useEffect(() => {
    if (user.me === null) return;
    dispatch({ type: PROFILE_GET_REQUEST, data: user.me });
  }, [user.me, dispatch]);

  useEffect(() => {
    if (profile.profileGetData) {
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      setForm({ ...profileTemp });
    }
  }, [profile.profileGetData]);

  const onChangeInput = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onChangeDate = useCallback(
    (e) => {
      console.log('=== e ===', e);
      const event = { target: { name: 'birth', value: e } };
      console.log('=== event ===', event);
      console.log('=== event.target ===', event.target);
      console.log('=== event.target.name ===', event.target.name);
      console.log('=== event.target.value ===', event.target.value);
      if (event.target.name === 'birth') {
        setForm((prev) => ({
          ...prev,
          [event.target.name]: moment(event.target.value).format('YYYY-MM-DD'),
        }));
      }
      console.log('=== form ===', form);
    },
    [form]
  );

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
      // 회원정보 수정하고 조회 페이지로 넘어갈 때 새로고침해야 수정된 정보를 볼 수 있는 오류 해결
      dispatch({ type: ME_REQUEST });
      history.push('/profile');
    },

    [dispatch, form, user.me, history]
  );

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
                dateFormat="yyyy-MM-dd"
                selected={startDate}
                onSelect={(e) => setStartDate(e)}
                onChange={(e) => onChangeDate(e)}
                peekMonthDropdown
                showYearDropdown
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
