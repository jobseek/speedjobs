import React from 'react';
import { StyledArticle } from '../Styled';
import ResumeBasic from './ResumeBasic';
import ResumeEducation from './ResumeEducation';
import ResumeCareer from './ResumeCareer';
import ResumeSelf from './ResumeSelf';
import ResumeSkill from './ResumeSkill';
import ResumeCertificate from './ResumeCertificate';

export default function ResumeContents() {
  return (
    <>
      <StyledArticle className={'col-12 col-lg-10'}>
        <div className={'container-fluid'}>
          <ResumeBasic />
          <ResumeEducation />
          <ResumeCertificate />
          <ResumeCareer />
          <ResumeSelf />
          <ResumeSkill />
        </div>
      </StyledArticle>
    </>
  );
}
