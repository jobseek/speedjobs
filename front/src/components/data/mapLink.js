import React from 'react';
import NavLink from '../components/NavLink';
import { MenuLink, MenuList } from '../components/NavMenu';
import { DropLink, DropList } from '../components/NavDrop';

const Links = [
  { to: '/community', title: 'COMMUNITY', main: 'false' },
  { to: '/recruit', title: 'RECRUITMENT', main: 'false' },
];

const DropLinks = [
  { title: 'Login', to: '/' },
  { title: 'Sign Up', to: '/' },
  { title: 'Membership', to: '/registration' },
  { title: 'Profile', to: '/profile' },
];

export const mappedLinkUser = (change) => {
  const headLink = DropLinks.map((link) => ({
    ...change.find((c) => c.title === link.title),
    ...link,
  }));

  return headLink.map((link) => (
    <MenuList key={link.title}>
      <MenuLink to={link.to} onClick={link.onClick}>
        {link.title.toUpperCase()}
      </MenuLink>
    </MenuList>
  ));
};

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

const mappedMenu = (change) => {
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

export const mappedDrop = (change) => {
  const mapDropLink = DropLinks.map((link) => ({
    ...change.find((c) => c.title === link.title),
    ...link,
  }));

  return mapDropLink.map((link) => (
    <DropList key={link.title}>
      <DropLink to={link.to} onClick={link.onClick}>
        {link.title}
      </DropLink>
      {mapDropLink[mapDropLink.length - 1] !== link && <hr />}
    </DropList>
  ));
};

export default function MapLink(props) {
  return <>{mappedLink()}</>;
}

export function MapDrop({ change }) {
  return <>{mappedDrop(change)}</>;
}

export function MapLinkUser({ change }) {
  return <>{mappedLinkUser(change)}</>;
}
