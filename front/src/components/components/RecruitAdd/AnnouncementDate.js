import React from 'react';
import { DataInputs } from '../Styled';
import Input from '../../admin/component/Input';

export default function AnnouncementDate() {
  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <DataInputs placeholder={'2020/11/11'} type="text" />
        ~
        <DataInputs placeholder={'2020/11/11'} type="text" />
      </div>
    </>
  );
}
