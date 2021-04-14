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
      <ProfileInputs name={'이름'} />

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
          <ProfileInputTel placeholder={'Tel'} />
          <ProfileInputTel placeholder={'Email'} />
          <ProfileInputTel placeholder={'GitHub'} />
        </div>
      </ProfileItems>
      {/* 희망 직군 */}
      <ProfileInputs name={'희망 직군'} />

      {/* 희망 연봉 */}
      <ProfileInputs name={'희망 연봉'} />

      {/* 보유 기술 */}
      <ProfileInputs name={'보유 기술'} />

      {/* 한 줄 소개 */}
      <ProfileTextarea />
    </div>
  );
}
