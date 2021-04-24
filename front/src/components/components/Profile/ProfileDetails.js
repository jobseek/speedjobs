import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_GET_REQUEST } from '../../../reducers/profile';
import ProfileInputs from './ProfileInputs';
import { InputText, MyImage, ProfileImg } from '../Styled';
import ProfileTextarea from './ProfileTextarea';

const StyledInputText = styled(InputText)`
  border: none;
`;

export default function ProfileDetails() {
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    name: '',
    nickname: '',
    password: '',
    gender: '',
    contact: '',
    bio: '',
    picture: '',
  });

  useEffect(() => {
    if (profile.profileGetData) {
      console.log('테스트', profile.profileGetData);
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      setItem({ ...profileTemp });
    }
  }, [profile.profileGetData]);

  useEffect(() => {
    if (user.me === null) return;
    dispatch({ type: PROFILE_GET_REQUEST, data: user.me.id });
  }, [user.me, dispatch]);
  return (
    <div className="container">
      <ProfileImg>
        <MyImage src={item.picture} alt="profile" />
      </ProfileImg>
      <ProfileInputs name={'이름'} />
      <StyledInputText
        name={'name'}
        type="text"
        value={item.name || ''}
        disabled
      />
      <ProfileInputs name={'닉네임'} />
      <StyledInputText
        name={'nickname'}
        type="text"
        value={item.nickname || ''}
        disabled
      />
      <ProfileInputs name={'이메일'} />
      <StyledInputText
        name={'email'}
        type="text"
        value={item.email || ''}
        disabled
      />
      <ProfileInputs name={'성별'} />
      <StyledInputText
        name={'gender'}
        type="text"
        value={item.gender || ''}
        disabled
      />
      <ProfileInputs name={'연락처'} />
      <StyledInputText
        name={'contact'}
        type="text"
        maxLength="13"
        value={item.contact || ''}
        disabled
      />
      <ProfileInputs name={'한 줄 소개'} />
      <ProfileTextarea bio={item.bio} disabled />
    </div>
  );
}
