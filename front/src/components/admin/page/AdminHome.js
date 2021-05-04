import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { CoverAll, PageContainer } from '../component/adminStyled';
import SideBar from '../component/SideBar';
import AdminMain from './AdminMain';
import BannerSetting from './BannerSetting';
import CompanySetting from './CompanySetting';
import AdminAlert from '../component/AdminAlert';

export default function AdminHome(props) {
  const [toggle, setToggle] = useState(false);
  const [now, set] = useState('Main');
  const admin = useSelector((state) => state.admin);
  return (
    <>
      <CoverAll style={{ textAlign: 'left' }}>
        <PageContainer>
          {now === 'Main' && <AdminMain></AdminMain>}
          {now === 'Banner' && <BannerSetting></BannerSetting>}
          {now === 'Company' && <CompanySetting></CompanySetting>}
        </PageContainer>
        <SideBar toggle={toggle} setToggle={setToggle} set={set}></SideBar>
        {admin?.pop && (
          <AdminAlert
            enter={admin.popEnter}
            done={admin.popDone}
            error={admin.error}
          >
            {admin.alertMessage}
          </AdminAlert>
        )}
      </CoverAll>
    </>
  );
}
