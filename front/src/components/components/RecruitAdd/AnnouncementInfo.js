import React, { useState } from 'react';
import { DataInputs } from '../Styled';
import Tags from '../Tags';

export default function AnnouncementInfo() {
  const [tags] = useState([
    { name: '신입', id: 0, selected: false },
    { name: '경력 1년이상', id: 1, selected: false },
    { name: '경력 2년이상', id: 3, selected: false },
    { name: '경력 5년이상', id: 4, selected: false },
    { name: '경력 10년이상', id: 5, selected: false },
  ]);
  const [tags2] = useState([
    { name: '정규직', id: 0, selected: false },
    { name: '인턴', id: 1, selected: false },
  ]);
  return (
    <>
      <div>
        <textarea
          style={{
            width: '100%',
            height: '200px',
            resize: 'none',
            border: '1px solid #a1a1a1',
            borderRadius: '15px',
            padding: '5px 10px',
            marginBottom: '10px',
          }}
        >
          글입력
        </textarea>
        <Tags tagList={tags}>경력요구사항</Tags>
        <Tags tagList={tags2}>고용형태</Tags>
      </div>
    </>
  );
}
