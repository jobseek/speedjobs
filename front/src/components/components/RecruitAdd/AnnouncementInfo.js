import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tags from '../Tags';

export default function AnnouncementInfo({ onChange, setTags }) {
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

  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);

  useEffect(() => {
    setTags([...taglist.filter((t) => t.selected).map((t) => t.id)]);
  }, [taglist, setTags]);


  const [src, setSrc] = useState([]);
  const dropHandler = (e) => {
    e.preventDefault();
    for (const f of e.dataTransfer.files) {
      console.log(f);
      const reader = new FileReader();
      reader.onload = function (event) {
        setSrc((p) => [...p, event.target.result]);
      };
      reader.readAsDataURL(f);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <Tags tagList={tags}>경력요구사항</Tags>
        <Tags tagList={tags2}>고용형태</Tags>
        <Tags tagList={taglist} selected={setTaglist}>
          직무추가
        </Tags>

        <textarea
          placeholder="공고 정보를 입력해주세요."
          name="content"
          style={{
            width: '100%',
            height: '200px',
            resize: 'none',
            border: '1px solid #a1a1a1',
            borderRadius: '15px',
            padding: '5px 10px',
            marginBottom: '10px',
          }}
          onChange={(e) => onChange(e)}
        />

        <div
          style={{
            width: '100%',
            border: '#a1a1a1 1px solid',
            borderRadius: '15px',
            padding: '8px',
            textAlign: 'center',
            fontSize: 'small',
            backgroundColor: '#eee',
          }}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={dropHandler}
        >
          {src.length === 0 && '공고에 필요한 사진을 드래그해주세요.'}
          {src.map((s) => (
            <img
              src={s}
              alt={'hello'}
              style={{ height: '50px', display: 'inline-block' }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
