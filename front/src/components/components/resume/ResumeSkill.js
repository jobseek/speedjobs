import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Tags from '../Tags';
import { Warning } from '../Styled';

export default function ResumeSkill({ setForm }) {
  const [totalTag, setTotalTag] = useState([]);
  const [tagList, setTagList] = useState([]);

  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    setTotalTag([...tagList.filter((t) => t.selected).map((t) => t.id)]);
  }, [tagList]);

  useEffect(() => {
    setForm((p) => ({ ...p, tags: totalTag }));
  }, [totalTag, setForm]);

  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.SKILL);

      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      setTagList((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);

  return (
    <>
      <h5>
        Skill <Warning>자신있는 언어를 선택해주세요</Warning>
      </h5>
      <div className={'col-12'}>
        <Tags tagList={tagList} selected={setTagList}>
          기술
        </Tags>
      </div>
    </>
  );
}
