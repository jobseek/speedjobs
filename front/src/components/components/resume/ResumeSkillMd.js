import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Warning } from '../Styled';
import { RESUME_GET_DONE } from '../../../reducers/resume';
import TagShower from '../tag/TagShower';
import TagSelector from '../tag/TagSelector';

export default function ResumeSkillMd({ setForm }) {
  const [totalTag, setTotalTag] = useState([]);
  const [tagList, setTagList] = useState([]);
  const resume = useSelector((state) => state.resume);
  const tagss = useSelector((state) => state.tag);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalTag([...tagList.filter((t) => t.selected).map((t) => t.id)]);
  }, [tagList]);

  useEffect(() => {
    setForm((p) => ({ ...p, tags: totalTag }));
  }, [totalTag, setForm]);

  useEffect(() => {
    if (resume.resumeGet) {
      if (tagss.tagGetData) {
        const temp = Array.from(tagss.tagGetData.tags.SKILL);
        const tempFromResume = [
          ...(resume.resumeGet.tags ?? []).map((t) => t.id),
        ];
        const tt = temp.map((t) => {
          if (tempFromResume.indexOf(t.id) >= 0)
            return { ...t, selected: true };
          return { ...t, selected: false };
        });
        setTagList((p) => [...tt]);
        dispatch({
          type: RESUME_GET_DONE,
        });
      }
    }
  }, [tagss.tagGetData, resume.resumeGetDone, dispatch, resume]);

  return (
    <>
      <h5>
        Skill <Warning>자신있는 언어를 선택해주세요</Warning>
      </h5>
      <div className={'col-12'}>
        <TagSelector tagList={tagList} setTagList={setTagList}>
          기술
        </TagSelector>
        <TagShower tagList={tagList} setTagList={setTagList} />
      </div>
    </>
  );
}
