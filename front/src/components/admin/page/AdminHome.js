import React, { useState } from 'react';
import { CoverAll } from '../component/adminStyled';
import SideBar from '../component/SideBar';
import InfoCard from '../component/InfoCard';
import Report from '../component/Report';
import UserChart from '../data/UserChart';

export default function AdminHome(props) {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <CoverAll>
        <div className={'row'}>
          <div
            className={'col-6 p-0'}
            style={{
              backgroundColor: 'rgba(157, 157, 157, 0.3)',
              color: 'white',
            }}
          >
            <Report></Report>
          </div>
          <div className={'col-6'}>
            <div className={'row'}>
              <div className={'col-12 pb-3'}>
                <InfoCard index={1}>
                  <UserChart></UserChart>
                </InfoCard>
              </div>
              <div className={'col-12 pb-3'}>
                <InfoCard index={2}>차트 차트~~~</InfoCard>
              </div>
            </div>
          </div>
        </div>
        <SideBar toggle={toggle} setToggle={setToggle}></SideBar>
      </CoverAll>
    </>
  );
}
