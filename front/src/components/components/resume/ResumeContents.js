import React from 'react';
import ResumeBasic from './ResumeBasic';
import ResumeEducation from './ResumeEducation';
import ResumeCareer from './ResumeCareer';
import ResumeSelf from './ResumeSelf';
import ResumeSkill from './ResumeSkill';
import ResumeCertificate from './ResumeCertificate';

export default function ResumeContents({
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
}) {
  return (
    <>
      <div className={'container-fluid'}>
        <ResumeBasic
          onChange={onChange}
          bookMark={bookMark}
          bookMark1={bookMark1}
          setForm={setForm}
          form={form}
        />
        <ResumeEducation
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
          item={item}
          item2={item2}
          item3={item3}
        />
        <ResumeCertificate form={form} setForm={setForm} />
        <ResumeCareer form={form} setForm={setForm} />
        <ResumeSelf
          onChangeIntro={onChangeIntro}
          setForm={setForm}
          form={form}
        />
        <ResumeSkill form={form} setForm={setForm} />
      </div>
    </>
  );
}
