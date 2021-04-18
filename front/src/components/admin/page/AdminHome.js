import React, { useState } from 'react';
import { CoverAll, PageContainer } from '../component/adminStyled';
import SideBar from '../component/SideBar';
import AdminMain from './AdminMain';
import BannerSetting from './BannerSetting';

export default function AdminHome(props) {
  const [toggle, setToggle] = useState(false);
  const [now, set] = useState('Main');
  return (
    <>
      <CoverAll style={{ textAlign: 'left' }}>
        <PageContainer>
          {now === 'Main' && <AdminMain></AdminMain>}
          {now === 'Banner' && <BannerSetting></BannerSetting>}
        </PageContainer>
        <SideBar toggle={toggle} setToggle={setToggle} set={set}></SideBar>
      </CoverAll>
    </>
  );
}
