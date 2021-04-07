import React from 'react';
import styled from 'styled-components';
import { InputText, ProfileTitles, RequiredItems } from '../Styled';

const RegInput = styled.div`
  position: relative;
  margin-bottom: 10px;
  &:after {
    content: 'where are you?';
    position: absolute;
    bottom: 0;
    left: 10px;
    color: red;
    font-size: 11px;
  }
`;

export default function RegisterInput(props) {
  return (
    <>
      <RegInput>
        <ProfileTitles style={{ fontSize: '15px', marginBottom: '0' }}>
          <RequiredItems>*&nbsp;&nbsp;</RequiredItems>
          {props.name}
        </ProfileTitles>
        <InputText
          type={props.type}
          style={{ marginBottom: '15px', height: '25px', paddingBottom: '2px' }}
        />
      </RegInput>
    </>
  );
}
