import React from 'react';
import ResumeBasic from './ResumeBasic';
import ResumeEducation from './ResumeEducation';
import ResumeCareer from './ResumeCareer';
import ResumeSelfMd from './ResumeSelfMd';
import ResumeSkill from './ResumeSkill';
import ResumeCertificate from './ResumeCertificate';

export default function ResumeContents({
  onChange,
  handleOpen,
  open,
  setForm,
  form,
  onChangeIntro,
  onChangeHigh,
  onChangeUniversity,
  onChangeGraduate,
  onChangeHighInDate,
  onChangeHighOutDate,
  onChangeUniversityInDate,
  onChangeUniversityOutDate,
  onChangeGraduateInDate,
  onChangeGraduateOutDate,
  high,
  university,
  graduate,
  id,
}) {
  return (
    <>
      <div className={'container-fluid'}>
        <ResumeBasic
          onChange={onChange}
          handleOpen={handleOpen}
          open={open}
          setForm={setForm}
          form={form}
        />
        <ResumeEducation
          onChangeHigh={onChangeHigh}
          onChangeUniversity={onChangeUniversity}
          onChangeGraduate={onChangeGraduate}
          onChangeHighInDate={onChangeHighInDate}
          onChangeHighOutDate={onChangeHighOutDate}
          onChangeUniversityInDate={onChangeUniversityInDate}
          onChangeUniversityOutDate={onChangeUniversityOutDate}
          onChangeGraduateInDate={onChangeGraduateInDate}
          onChangeGraduateOutDate={onChangeGraduateOutDate}
          setForm={setForm}
          form={form}
          high={high}
          university={university}
          graduate={graduate}
        />
        <ResumeCertificate form={form} setForm={setForm} />
        <ResumeCareer form={form} setForm={setForm} />
        <ResumeSelfMd
          onChangeIntro={onChangeIntro}
          setForm={setForm}
          form={form}
        />
        <ResumeSkill form={form} setForm={setForm} id={id} />
      </div>
    </>
  );
}
