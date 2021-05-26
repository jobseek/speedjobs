import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { CoverAll, PageContainer } from '../component/adminStyled';
import SideBar from '../component/SideBar';
import AdminMain from './AdminMain';
import BannerSetting from './BannerSetting';
import CompanySetting from './CompanySetting';
import AdminAlert from '../component/AdminAlert';
import PostSetting from './PostSetting';
import MemberSetting from './MemberSetting';

export default function AdminHome(props) {
  const [toggle, setToggle] = useState(false);
  const [now, set] = useState('Main');
  const admin = useSelector((state) => state.admin);
  const [pop, setPop] = useState([]);
  const mapPop = pop.map((p) => (
    <AdminAlert
      key={p}
      enter={admin.popEnter}
      done={admin.popDone}
      error={admin.error}
    >
      {admin.alertMessage}
    </AdminAlert>
  ));
  useEffect(() => {
    if (admin?.pop) {
      setPop([v4()]);
    }
  }, [admin?.pop]);
  useEffect(() => {
    if (admin?.initDone) {
      setPop([]);
    }
  }, [admin?.initDone]);

  return (
    <>
      <CoverAll style={{ textAlign: 'left' }}>
        <PageContainer>
          {now === 'Main' && <AdminMain set={set}></AdminMain>}
          {now === 'Banner' && <BannerSetting></BannerSetting>}
          {now === 'Company' && <CompanySetting></CompanySetting>}
          {now === 'Post' && <PostSetting></PostSetting>}
          {now === 'Member' && <MemberSetting></MemberSetting>}
        </PageContainer>
        <SideBar toggle={toggle} setToggle={setToggle} set={set}></SideBar>
        {mapPop}
      </CoverAll>
    </>
  );
}
