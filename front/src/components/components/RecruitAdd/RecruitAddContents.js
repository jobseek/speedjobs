import React, { useState } from 'react';
import Tags from '../Tags';
import AnnouncementDate from './AnnouncementDate';
import CompanySummaryInfo from './CompanySummaryInfo';
import AnnouncementInfo from './AnnouncementInfo';

export default function RecruitAddContents({ onChange }) {
  const [tags] = useState([
    { name: 'Backend', id: 0, selected: false },
    { name: 'Frontend', id: 1, selected: false },
    { name: 'Fullstack', id: 2, selected: false },
  ]);
  return (
    <>
      {/* 작성자 */}
      <div style={{ margin: '10px 0px 20px 0px' }}>작성자 2020-01-01</div>
      {/* 공고 날짜 */}
      <AnnouncementDate />
      {/* 회사 요약정보 */}
      <CompanySummaryInfo onChange={onChange} />
      {/* 공고정보 */}
      <AnnouncementInfo />
      {/* 태그*/}
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <Tags tagList={tags}>직무추가</Tags>
      </div>
    </>
  );
}
