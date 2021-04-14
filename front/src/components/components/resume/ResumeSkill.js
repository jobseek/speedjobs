import React, { useState } from 'react';

import Tags from '../Tags';
import { Warning } from '../Styled';

export default function ResumeSkill() {
  const [tags] = useState([
    { name: '#C', id: 0, selected: false },
    { name: '#C++', id: 1, selected: false },
    { name: '#JAVA', id: 2, selected: false },
    { name: '#Python', id: 3, selected: false },
  ]);

  return (
    <>
      <h5>
        Skill <Warning>자신있는 언어를 선택해주세요</Warning>
      </h5>
      <div className={'col-12'}>
        <Tags tagList={tags}>Language</Tags>
      </div>
    </>
  );
}
