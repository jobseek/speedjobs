import React from 'react';
import ProfileInputs from './ProfileInputs';
import ProfileGender from './ProfileGender';
import ProfileInputTel from './ProfileInputTel';
import ProfileTextarea from './ProfileTextarea';
import { ProfileItems, ProfileTitles, RequiredItems } from '../Styled';

export default function ProfileContents() {
  return (
    <div className="container">
      {/* 이름 */}
      <ProfileInputs name={'닉네임'} />

      {/* 성별 */}
      <ProfileItems>
        <ProfileTitles>
          <RequiredItems>*&nbsp;&nbsp;</RequiredItems>성별
        </ProfileTitles>
        <div>
          <ProfileGender />
        </div>
      </ProfileItems>

      {/* 연락처 */}
      <ProfileItems>
        <ProfileTitles>
          <RequiredItems>*&nbsp;&nbsp;</RequiredItems>연락처
        </ProfileTitles>
        <div>
          <ProfileInputTel />
        </div>
      </ProfileItems>
      <ProfileInputs name={'비밀번호'} />
      <ProfileInputs name={'비밀번호 확인'} />

      {/* 한 줄 소개 */}
      <ProfileTextarea />
    </div>
  );
}
