import React from 'react';
import { MyButton, MyHr, MyLink, MySideMenu } from './Styled';

export default function SideMenu() {
  return (
    <MySideMenu>
      <MyButton>
        <MyLink to={'/resume'}>이력서</MyLink>
      </MyButton>
      <MyHr />
      <MyButton>
        <MyLink to={'/likelist/community'}>게시글</MyLink>
      </MyButton>
      <MyHr />
      <MyButton>
        <MyLink to={'/likelist/recruit'}>채용공고</MyLink>
      </MyButton>
      <MyHr />
      <MyButton>
        <MyLink to={'/profile'}>개인정보 수정</MyLink>
      </MyButton>
    </MySideMenu>
  );
}
