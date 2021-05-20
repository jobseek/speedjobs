import React from 'react';
import { useSelector } from 'react-redux';
import { MyButton, MyHr, MyLink, MySideMenu } from './Styled';

export default function SideMenu() {
  const user = useSelector((state) => state.user);

  return (
    <MySideMenu>
      <MyButton>
        {user.me?.role === 'ROLE_COMPANY' ? (
          <MyLink to={'/resume/submit'}>이력서</MyLink>
        ) : (
          <MyLink to={'/resume/total'}>이력서</MyLink>
        )}
      </MyButton>
      <MyHr />
      <MyButton>
        {user.me?.role === 'ROLE_COMPANY' ? (
          <MyLink to={'/community/myList'}>게시글</MyLink>
        ) : (
          <MyLink to={'/likelist/community'}>게시글</MyLink>
        )}
      </MyButton>
      <MyHr />
      <MyButton>
        {user.me?.role === 'ROLE_COMPANY' ? (
          <MyLink to={'/recruitment/myList'}>채용공고</MyLink>
        ) : (
          <MyLink to={'/likelist/recruit'}>채용공고</MyLink>
        )}
      </MyButton>
      <MyHr />
      <MyButton>
        <MyLink to={'/profile'}>계정관리</MyLink>
      </MyButton>
      <MyHr />
      <MyButton>
        <MyLink to={'/profile/delete'}>회원탈퇴</MyLink>
      </MyButton>
    </MySideMenu>
  );
}
