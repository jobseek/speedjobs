import React from 'react';
import styled from 'styled-components';
import AnnouncementDate from './AnnouncementDate';
import CompanySummaryInfo from './CompanySummaryInfo';
import AnnouncementInfo from './AnnouncementInfo';

const AnnounceHeader = styled.div`
  font-size: 20px;
  color: #373737;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0 0 10px;
`;
export default function RecruitAddContents({ onChange, form, setForm }) {
  return (
    <>
      {/* 회사 요약정보 */}
      <AnnounceHeader>
        회사요약정보{' '}
        <span
          style={{ color: '#a1a1a1', fontSize: '0.7em', letterSpacing: '-1px' }}
        >
          회사정보수정은 마이페이지에서 가능합니다.
        </span>
      </AnnounceHeader>
      <CompanySummaryInfo />
      {/* <AnnounceHeader>회사 위치</AnnounceHeader>*/}
      {/* <AnnounceLocation />*/}
      {/* 공고 날짜 */}
      <AnnounceHeader>공고기간</AnnounceHeader>
      <AnnouncementDate onChange={onChange} form={form} setForm={setForm} />
      {/* 공고정보 */}
      <AnnounceHeader>공고정보</AnnounceHeader>
      <AnnouncementInfo onChange={onChange} form={form} setForm={setForm} />
    </>
  );
}
