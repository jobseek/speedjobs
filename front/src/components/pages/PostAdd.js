import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  PostTextArea,
  PostTitleInput,
  PostWriterDate,
  StyledButton,
  StyledHeaderDiv,
} from '../components/Styled';
import { POST_ADD_REQUEST } from '../../reducers/post';
import Tags from '../components/Tags';

export default function PostAdd() {
  const [form, setForm] = useState({ title: '', content: '', tagIds: [] });
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const history = useHistory();
  const onChangHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  useEffect(() => {
    if (post.postAddDone) {
      history.goBack();
    }
  }, [post, history]);
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (form.title === '' || form.content === '') {
        if (form.title === '') {
          alert('제목을 입력하세요');
        } else if (form.content === '') {
          alert('내용을 입력하세요');
        }
      } else {
        dispatch({ type: POST_ADD_REQUEST, data: form });
      }
    },
    [dispatch, form]
  );
  const [totalTag, setTotalTag] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [tagList2, setTagList2] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    setTotalTag([
      ...tagList.filter((t) => t.selected).map((t) => t.id),
      ...tagList2.filter((t) => t.selected).map((t) => t.id),
    ]);
  }, [tagList, tagList2]);
  useEffect(() => {
    setForm((p) => ({ ...p, tagIds: totalTag }));
  }, [totalTag]);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      const temp2 = Array.from(tagss.tagGetData.tags.SKILL);

      // temp.forEach((item) => {
      //   res.concat([...res, { ...item, item }]);
      //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      // });
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      setTagList((p) => [...p, ...tt]);
      const tt2 = temp2.map((t) => {
        return { ...t, selected: false };
      });
      setTagList2((p) => [...p, ...tt2]);
    }
  }, [tagss.tagGetData]);

  return (
    <div
      className="container text-left"
      style={{
        padding: '30px 0px 0px',
        textAlign: 'left',
      }}
    >
      <form>
        {/* 헤더*/}
        <StyledHeaderDiv fix>
          <div
            className={'container row justify-content-end'}
            style={{ paddingTop: '15px', paddingRight: 0 }}
          >
            <div className={'col-md-8 col-6 p-0'} style={{ marginTop: '14px' }}>
              <PostTitleInput
                onChange={(e) => onChangHandler(e)}
                name={'title'}
                placeholder={'제목을 입력해주세요'}
              />
            </div>
            <div
              className={'col-md-4 col-6 text-right'}
              style={{ paddingRight: 0 }}
            >
              <StyledButton
                wide
                style={{ letterSpacing: '10px', paddingLeft: '20px' }}
                onClick={(e) => {
                  onSubmitHandler(e);
                }}
              >
                등록
              </StyledButton>
              <StyledButton white onClick={() => history.goBack()}>
                뒤로
              </StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        {/* 작성자*/}
        <div className={'container'}>
          <PostWriterDate>작성자 2020-01-01</PostWriterDate>
          {/* 태그*/}
          {/* 본문*/}
          <PostTextArea
            name={'content'}
            onChange={(e) => onChangHandler(e)}
            placeholder="내용을 입력하세요"
            rows={'20'}
          />
          <div style={{ marginTop: '40px' }}>
            <Tags tagList={tagList} selected={setTagList}>
              직무
            </Tags>
            <Tags tagList={tagList2} selected={setTagList2}>
              기술
            </Tags>
          </div>
        </div>
      </form>
    </div>
  );
}
