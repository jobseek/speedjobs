import React from 'react';
import ResumeBasic from './ResumeBasic';
import ResumeEducation from './ResumeEducation';
import ResumeCareer from './ResumeCareer';
import ResumeSelf from './ResumeSelf';
import ResumeSkill from './ResumeSkill';
import ResumeCertificate from './ResumeCertificate';

export default function ResumeContents(setData) {
  return (
    <>
      <div className={'container-fluid'}>
        <ResumeBasic setData={setData} />
        <ResumeEducation />
        <ResumeCertificate />
        <ResumeCareer />
        <ResumeSelf />
        <ResumeSkill />
      </div>
    </>
  );
}
