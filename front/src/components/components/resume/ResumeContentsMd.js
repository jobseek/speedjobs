import React from 'react';
import ResumeBasicMd from './ResumeBasicMd';
import ResumeEducationMd from './ResumeEducationMd';
import ResumeCareerMd from './ResumeCareerMd';
import ResumeSelfMd from './ResumeSelfMd';
import ResumeSkillMd from './ResumeSkillMd';
import ResumeCertificateMd from './ResumeCertificateMd';

export default function ResumeContentsMd({
  onChange,
  bookMark,
  bookMark1,
  setForm,
  form,
  onChangeIntro,
  onChangeHighSchool,
  onChangeUniversity,
  onChangeGraduate,
  onChangeInDate,
  onChangeOutDate,
  onChangeInDate2,
  onChangeOutDate2,
  onChangeInDate3,
  onChangeOutDate3,
  item,
  item2,
  item3,
  id,
}) {
  return (
    <>
      <div className={'container-fluid'}>
        <ResumeBasicMd
          onChange={onChange}
          bookMark={bookMark}
          bookMark1={bookMark1}
          setForm={setForm}
          form={form}
        />
        <ResumeEducationMd
          onChangeHighSchool={onChangeHighSchool}
          onChangeUniversity={onChangeUniversity}
          onChangeGraduate={onChangeGraduate}
          onChangeInDate={onChangeInDate}
          onChangeOutDate={onChangeOutDate}
          onChangeInDate2={onChangeInDate2}
          onChangeOutDate2={onChangeOutDate2}
          onChangeInDate3={onChangeInDate3}
          onChangeOutDate3={onChangeOutDate3}
          setForm={setForm}
          form={form}
          item={item}
          item2={item2}
          item3={item3}
        />
        <ResumeCertificateMd form={form} setForm={setForm} />
        <ResumeCareerMd form={form} setForm={setForm} />
        <ResumeSelfMd
          onChangeIntro={onChangeIntro}
          setForm={setForm}
          form={form}
        />
        <ResumeSkillMd form={form} setForm={setForm} id={id} />
      </div>
    </>
  );
}
