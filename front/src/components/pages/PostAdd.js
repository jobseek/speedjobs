import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  HeaderTitle,
  PostTextArea,
  PostTitleInput,
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
        <StyledHeaderDiv>
          <HeaderTitle>
            <PostTitleInput
              onChange={(e) => onChangHandler(e)}
              name={'title'}
              placeholder={'제목을 입력해주세요'}
              maxLength="20"
            />
          </HeaderTitle>
          <div style={{ flex: '0 0' }}>
            <StyledButton
              wide
              style={{ letterSpacing: '10px', paddingLeft: '20px' }}
              onClick={(e) => {
                onSubmitHandler(e);
              }}
            >
              등록
            </StyledButton>
          </div>
          <div style={{ flex: '0 0' }}>
            <StyledButton white onClick={() => history.goBack()}>
              뒤로
            </StyledButton>
          </div>
        </StyledHeaderDiv>
        <div className={'container'}>
          {/* <PostWriterDate>Author 2020-01-01</PostWriterDate>*/}
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
