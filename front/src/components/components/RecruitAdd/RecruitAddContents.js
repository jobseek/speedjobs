import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tags from '../Tags';
import AnnouncementDate from './AnnouncementDate';
import CompanySummaryInfo from './CompanySummaryInfo';
import AnnouncementInfo from './AnnouncementInfo';

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
      <div style={{ margin: '10px 0px 20px 0px' }}>작성자 2020-01-01</div>
      {/* 회사 요약정보 */}
      <CompanySummaryInfo onChange={onChange} />
      {/* 공고정보 */}
      <AnnouncementInfo onChange={onChange} />
      {/* 태그*/}
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <Tags tagList={taglist}>직무</Tags>
      </div>
    </>
  );
}
