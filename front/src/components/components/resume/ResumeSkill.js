import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Tags from '../Tags';
import { Warning } from '../Styled';

export default function ResumeSkill() {
  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.SKILL);
      // const res = [];
      // temp.forEach((item) => {
      //   res.concat([...res, { ...item, item }]);
      //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      // });
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);

  return (
    <>
      <h5>
        Skill <Warning>자신있는 언어를 선택해주세요</Warning>
      </h5>
      <div className={'col-12'}>
        <Tags tagList={taglist}>기술</Tags>
      </div>
    </>
  );
}
