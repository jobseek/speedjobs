import React, { useState } from 'react';
import styled from 'styled-components';

import Tags from '../Tags';

const ResumeTitle = styled.div`
  margin-bottom: 15px;
  font-size: 25px;
`;

const Warning = styled.span`
  margin-left: 20px;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -1px;
  @media (max-width: 992px) {
    display: block;
    margin-left: 0px;
    margin-top: 10px;
    font-size: 10px;
  }
`;

export default function ResumeSkill() {
  const [tags] = useState([
    { name: '#C', id: 0, selected: false },
    { name: '#C++', id: 1, selected: false },
    { name: '#JAVA', id: 2, selected: false },
    { name: '#Python', id: 3, selected: false },
  ]);

  return (
    <>
      <div>
        <ResumeTitle>
          Skill <Warning>자신있는 언어를 선택해주세요</Warning>
        </ResumeTitle>
        <div className={'col-12'}>
          <Tags tagList={tags}>Language</Tags>
        </div>
      </div>
    </>
  );
}
