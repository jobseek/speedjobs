import React from 'react';
import { InputText, ProfileTitles, RequiredItems } from '../Styled';

export default function RegisterInput(props) {
  return (
    <>
      <div>
        <ProfileTitles style={{ fontSize: '15px', marginBottom: '0' }}>
          <RequiredItems>*&nbsp;&nbsp;</RequiredItems>
          {props.name}
        </ProfileTitles>
        <InputText
          type={props.type}
          style={{ marginBottom: '15px', height: '25px', paddingBottom: '2px' }}
        />
      </div>
    </>
  );
}
