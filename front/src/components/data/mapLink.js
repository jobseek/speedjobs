import React from 'react';
import NavLink from '../components/Nav/NavLink';
import { MenuLink, MenuList } from '../components/Nav/NavMenu';
import { DropLink, DropList } from '../components/Nav/NavDrop';
import { LOG_OUT_REQUEST } from '../../reducers/user';

const Links = [
  { to: '/community', title: 'COMMUNITY', main: 'false' },
  { to: '/recruit', title: 'RECRUITMENT', main: 'false' },
];

const DropLinks = [
  { title: 'Login', to: '/' },
  { title: 'Sign Up', to: '/' },
  { title: 'Membership', to: '/registration' },
  { title: 'Profile 개발용', to: '/profile' },
];
//  아이디_MEMBER
const DropLinksUser = [
  { title: 'user', to: '/profile' },
  { title: '이력서', to: '/resume/list' },
  { title: '게시글', to: '/likelist/community' },
  { title: '채용공고', to: '/likelist/recruit' },
  {
    title: '로그아웃',
    to: '/',
    onClick: (e, dispatch) => {
      e.preventDefault();
      dispatch({
        type: LOG_OUT_REQUEST,
      });
      // window.location.href = '/';
    },
  },
];
//  아이디_COMPANY
const DropLinksCompany = [
  { title: 'user', to: '/profile' },
  { title: '이력서', to: '/resume/submit' },
  { title: '게시글', to: '/community/myList' },
  { title: '채용공고', to: '/recruitment/myList' },
  {
    title: '로그아웃',
    to: '/',
    onClick: (e, dispatch) => {
      e.preventDefault();
      dispatch({
        type: LOG_OUT_REQUEST,
      });
    },
  },
];

//   모바일페이지 아래 부분 링크
export const mappedLinkUser = (change, role, isLogin, toggle, dispatch) => {
  const Drop = () => {
    if (isLogin) {
      if (role === 'ROLE_MEMBER') {
        return DropLinksUser;
      } else {
        return DropLinksCompany;
      }
    } else {
      return DropLinks;
    }
  };
  // isLogin? DropLinksUser: DropLinks;
  const headLink = Drop().map((link) => ({
    ...change.find((c) => c.title === link.title),
    ...link,
  }));

  return headLink.map((link) => (
    <MenuList key={link.title}>
      <MenuLink
        to={link.to}
        onClick={(e) => {
          if (link.onClick) {
            link.onClick(e, dispatch);
          }
          toggle();
        }}
      >
        {link.title !== 'user' ? link.title.toUpperCase() : link.name}
      </MenuLink>
    </MenuList>
  ));
};

//  데스크탑페이지 헤더 링크
const mappedLink = () => {
  const headLink = Links.slice(0, Math.trunc(Links.length / 2));

  headLink.push({ to: '/', title: 'SPEEDJOBS', main: 'true' });
  headLink.push(...Links.slice(Math.trunc(Links.length / 2), Links.length));
  return headLink.map((link) => (
    <NavLink to={link.to} main={link.main} key={link.title}>
      {link.title}
    </NavLink>
  ));
};

//  모바일페이지 위에 링크
const mappedMenu = (change) => {
  // const Drop = isLogin ? DropLinksUser : DropLinks;
  const headLink = Links.map((link) => ({
    ...change.find((c) => c.title === link.title),
    ...link,
  }));

  return headLink.map((link) => (
    <MenuList key={link.title}>
      <MenuLink to={link.to} onClick={link.onClick}>
        {link.title}
      </MenuLink>
    </MenuList>
  ));
};

export const MapMenu = ({ change }) => {
  return <>{mappedMenu(change)}</>;
};

export const mappedDrop = (role, change, isLogin, toggle, dispatch) => {
  const Drop = () => {
    if (isLogin) {
      if (role === 'ROLE_MEMBER') {
        return DropLinksUser;
      } else {
        return DropLinksCompany;
      }
    } else {
      return DropLinks;
    }
  };
  // isLogin ? DropLinksUser : DropLinks;
  const mapDropLink = Drop().map((link) => ({
    ...change.find((c) => c.title === link.title),
    ...link,
  }));

  return mapDropLink.map((link) => (
    <DropList key={link.title}>
      <DropLink
        to={link.to}
        onClick={(e) => {
          if (link.onClick) {
            link.onClick(e, dispatch);
          }
          toggle();
        }}
      >
        {link.title !== 'user' ? link.title : link.name}
      </DropLink>
      {mapDropLink[mapDropLink.length - 1] !== link && <hr />}
    </DropList>
  ));
};

export default function MapLink() {
  return <>{mappedLink()}</>;
}

export function MapDrop({ role, change, toggle, isLogin, dispatch }) {
  return <>{mappedDrop(role, change, isLogin, toggle, dispatch)}</>;
}

export function MapLinkUser({ change, toggle, role, isLogin, dispatch }) {
  return <>{mappedLinkUser(change, role, isLogin, toggle, dispatch)}</>;
}
