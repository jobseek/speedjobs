import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FilterSelector, SpanToDiv } from '../Styled';
import TagSelector from '../tag/TagSelector';
import TagShower from '../tag/TagShower';
import { InfoText } from './CompanySummaryInfo';

export default function AnnouncementInfo({ onChange, form, setForm }) {
  // experience 태그
  const experienceTags = [
    { name: '경력무관', sort: -1 },
    { name: '신입', sort: 0 },
    { name: '경력 1년 이상', sort: 1 },
    { name: '경력 2년 이상', sort: 2 },
    { name: '경력 3년 이상', sort: 3 },
    { name: '경력 4년 이상', sort: 4 },
    { name: '경력 5년 이상', sort: 5 },
    { name: '경력 6년 이상', sort: 6 },
    { name: '경력 7년 이상', sort: 7 },
    { name: '경력 8년 이상', sort: 8 },
    { name: '경력 9년 이상', sort: 9 },
    { name: '경력 10년 이상', sort: 10 },
  ];
  const experienceHandler = (sort) => {
    setForm((p) => ({ ...p, experience: sort }));
  };

  // position 태그
  const positionTags = [
    { name: '정규직', sort: 'PERMANENT' },
    { name: '계약직', sort: 'TEMPORARY' },
  ];
  const positionHandler = (sort) => {
    setForm((p) => ({ ...p, position: sort }));
  };

  // 직무 태그
  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      const tempFromRecruit = [...(form.tags?.POSITION ?? []).map((t) => t.id)];
      const tt = temp.map((t) => {
        if (tempFromRecruit.indexOf(t.id) >= 0) return { ...t, selected: true };
        return { ...t, selected: false };
      });
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData, form.tags?.POSITION]);
  useEffect(() => {
    setForm((p) => {
      const ids = taglist.filter((t) => t.selected).map((t) => t.id);
      if (ids === []) {
        // eslint-disable-next-line
        return { ...p };
      } else {
        return { ...p, tagIds: [...ids] };
      }
    });
  }, [taglist, setForm]);

  // thumbnail 입력
  const inputRef = useRef();
  const [src, setSrc] = useState('');
  useEffect(() => {
    if (form.thumbnail !== null) {
      setSrc(form.thumbnail);
    }
  }, [form.thumbnail]);
  const dropHandler = async (e) => {
    e.preventDefault();
    // e.type이 change 또는 drop
    if (e.type === 'drop' && e.dataTransfer.files.length !== 1) {
      alert('한개의 파일만 가능합니다.');
    } else {
      let f = '';
      if (e.type === 'drop') {
        f = e.dataTransfer.files[0];
      } else {
        f = e.target.files[0];
      }
      const data = new FormData();
      data.append('files', f);
      const url = await axios
        .post('/file', data)
        .then((res) => res.data.files[0].url)
        .catch(
          () =>
            'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
        );
      if (
        f.type !== 'image/jpeg' &&
        f.type !== 'image/png' &&
        f.type !== 'image/gif'
      ) {
        alert('이미지 파일만 등록할 수 있습니다.');
      } else if (f.size > 1024 * 1024 * 10) {
        alert('10MB 이하 이미지만 가능합니다.');
      } else {
        setSrc(url);
      }
    }
  };
  useEffect(() => {
    if (src !== '') {
      setForm((p) => ({ ...p, thumbnail: src }));
    }
  }, [src, setForm]);
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <>
      <div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block' }}>
            <TagSelector tagList={taglist} setTagList={setTaglist}>
              직무
            </TagSelector>
          </div>
          <div
            style={{
              display: 'inline-block',
              height: '38px',
              verticalAlign: 'top',
            }}
          >
            <FilterSelector
              filterList={positionTags}
              filterHandler={positionHandler}
            >
              정규직
            </FilterSelector>
            <FilterSelector
              filterList={experienceTags}
              filterHandler={experienceHandler}
            >
              요구 경력
            </FilterSelector>
          </div>
          <SpanToDiv style={{ color: '#a1a1a1' }}>
            현재 설정값 : {form.position === 'PERMANENT' ? '정규직' : '계약직'}{' '}
            {/* eslint-disable*/}
            {form.experience > 0
              ? form.experience + '년 이상'
              : form.experience === 0
              ? '신입'
              : '경력무관'}
            {/* eslint-disable*/}
          </SpanToDiv>
        </div>
        <div className={'text-left'} style={{ height: '50px', zIndex: '0' }}>
          <TagShower tagList={taglist} setTagList={setTaglist} />
        </div>
        <InfoText
          placeholder="공고 정보를 입력해주세요."
          name="content"
          style={{ marginTop: 0 }}
          value={form?.content}
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
            cursor: 'pointer',
          }}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={dropHandler}
          onClick={onButtonClick}
        >
          {src === '' ? (
            '공고에 필요한 썸네일사진을 드래그해주세요.'
          ) : (
            <img
              src={src}
              alt={'저장된 사진이 없습니다.'}
              style={{ height: '50px', display: 'inline-block' }}
            />
          )}
        </div>
        <input
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={dropHandler}
        />
      </div>
    </>
  );
}
