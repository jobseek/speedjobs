import React, { useState } from 'react';
import styled from 'styled-components';
import Tags from '../Tags';
import AnnouncementDate from './AnnouncementDate';
import CompanySummaryInfo from './CompanySummaryInfo';
import AnnouncementInfo from './AnnouncementInfo';
import { PostWriterDate } from '../Styled';

const AnnounceHeader = styled.div`
  font-size: 20px;
  color: #373737;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0 0 15px;
`;
export default function RecruitAddContents({ onChange }) {
  const [tags] = useState([
    { name: 'Backend', id: 0, selected: false },
    { name: 'Frontend', id: 1, selected: false },
    { name: 'Fullstack', id: 2, selected: false },
  ]);
  return (
    <>
      {/* 작성자 */}
      <PostWriterDate>작성자 2020-01-01</PostWriterDate>
      {/* 공고 날짜 */}
      <AnnounceHeader>공고기간</AnnounceHeader>
      <AnnouncementDate />
      {/* 회사 요약정보 */}
      <AnnounceHeader>회사요약정보</AnnounceHeader>
      <CompanySummaryInfo onChange={onChange} />
      {/* 공고정보 */}
      <AnnounceHeader>공고정보</AnnounceHeader>
      <AnnouncementInfo />
      {/* 태그*/}

      <Tags tagList={tags}>직무추가</Tags>
    </>
  );
}
