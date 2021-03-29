import React from 'react';
import {
  InputText,
  ProfileItems,
  ProfileTitles,
  RequiredItems,
} from '../Styled';

export default function ProfileInputs(props) {
  return (
    <div>
      <ProfileItems>
        <ProfileTitles>
          <RequiredItems>*&nbsp;&nbsp;</RequiredItems>
          {props.name}
        </ProfileTitles>
        <InputText type="text" />
      </ProfileItems>
    </div>
  );
}
