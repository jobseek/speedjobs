import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AnnouncementDate from './AnnouncementDate';
import CompanySummaryInfo from './CompanySummaryInfo';
import AnnouncementInfo from './AnnouncementInfo';
import { PostWriterDate } from '../Styled';

const AnnounceHeader = styled.div`
  font-size: 20px;
  color: #373737;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0 0 10px;
`;
export default function RecruitAddContents({ onChange, setTags }) {
  const [author, setAuthor] = useState('');
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.me !== null) {
      setAuthor(user.me.name);
    }
  }, [user.me]);
  return (
    <>
      {/* 작성자 */}
      <PostWriterDate>{author} 2020-01-01</PostWriterDate>

      {/* 회사 요약정보 */}
      <AnnounceHeader>회사요약정보</AnnounceHeader>
      <CompanySummaryInfo />
      {/* 공고 날짜 */}
      <AnnounceHeader>공고기간</AnnounceHeader>
      <AnnouncementDate onChange={onChange} />
      {/* 공고정보 */}
      <AnnounceHeader>공고정보</AnnounceHeader>
      <AnnouncementInfo setTags={setTags} onChange={onChange} />
    </>
  );
}
