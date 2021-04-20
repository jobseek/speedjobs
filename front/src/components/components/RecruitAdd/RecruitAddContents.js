import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
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
  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      // const res = [];
      console.log(temp);
      // temp.forEach((item) => {
      //   res.concat([...res, { ...item, item }]);
      //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      // });
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      console.log(tt);
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);
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
      <Tags tagList={taglist}>직무추가</Tags>
    </>
  );
}
