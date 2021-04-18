import React from 'react';
import { InputText } from '../Styled';

export default function ProfileContents(props) {
  return <InputText type="text" placeholder={props.placeholder} />;
}
