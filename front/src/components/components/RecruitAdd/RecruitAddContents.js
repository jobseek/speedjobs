import React from 'react';
import CompanySummaryInfo from './CompanySummaryInfo';
import AnnouncementInfo from './AnnouncementInfo';

export default function RecruitAddContents({ onChange }) {
  return (
    <>
      {/* 작성자 */}
      <div style={{ margin: '10px 0px 20px 0px' }}>작성자 2020-01-01</div>
      {/* 회사 요약정보 */}
      <CompanySummaryInfo onChange={onChange} />
      {/* 공고정보 */}
      <AnnouncementInfo onChange={onChange} />
      {/* 태그*/}
    </>
  );
}
