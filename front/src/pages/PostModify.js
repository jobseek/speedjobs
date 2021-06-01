import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
  HeaderTitle,
  PostTextArea,
  PostTitleInput,
  StyledButton,
  StyledHeaderDiv,
} from '../components/Styled';
import {
  POST_GET_DONE,
  POST_GET_REQUEST,
  POST_MODIFY_DONE,
  POST_MODIFY_REQUEST,
} from '../reducers/post';
import Tags from '../components/Tags';

export default function PostModify() {
  const { id } = useParams();
  const [form, setForm] = useState({
    ...location.state,
  });
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const history = useHistory();
  // 태그 정보 불러오기
  const [tagList, setTagList] = useState([]);
  const [tagList2, setTagList2] = useState([]);
  const tagss = useSelector((state) => state.tag);

  const onChangHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // 태그 폼에 세팅
  useEffect(() => {
    setForm((p) => ({
      ...p,
      tagIds: [
        ...tagList.filter((t) => t.selected).map((t) => t.id),
        ...tagList2.filter((t) => t.selected).map((t) => t.id),
      ],
    }));
  }, [tagList2, tagList]);

  // 이전 정보 가져오기
  useEffect(() => {
    dispatch({
      type: POST_GET_REQUEST,
      data: id,
    });
  }, [dispatch, id]);
  useEffect(() => {
    if (post.postGetDone) {
      setForm((prev) => ({
        ...prev,
        title: post.post.title,
        content: post.post.content,
        tagIds: post.post.tagIds,
      }));
    }
  }, [dispatch, post.postGetDone, post.post, tagList, tagList2]);

  // 수정 정보 내보내기
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
        dispatch({ type: POST_MODIFY_REQUEST, postId: id, data: form });
      }
    },
    [dispatch, form, id]
  );
  useEffect(() => {
    if (post.postModifyDone) {
      dispatch({
        type: POST_MODIFY_DONE,
      });
      history.goBack();
    }
  }, [post, history, dispatch]);

  useEffect(() => {
    if (post.postGetDone) {
      if (tagss.tagGetData) {
        const temp = Array.from(tagss.tagGetData.tags.POSITION);
        const temp2 = Array.from(tagss.tagGetData.tags.SKILL);
        const tempFromPost = [
          ...(post.post.tags.POSITION ?? []).map((t) => t.id),
          ...(post.post.tags.SKILL ?? []).map((t) => t.id),
        ];
        const tt = temp.map((t) => {
          if (tempFromPost.indexOf(t.id) >= 0) {
            return { ...t, selected: true };
          }
          return { ...t, selected: false };
        });
        setTagList((p) => [...p, ...tt]);
        const tt2 = temp2.map((t) => {
          if (tempFromPost.indexOf(t.id) >= 0) {
            return { ...t, selected: true };
          }
          return { ...t, selected: false };
        });
        setTagList2((p) => [...p, ...tt2]);
        dispatch({
          type: POST_GET_DONE,
        });
      }
    }
  }, [tagss.tagGetData, post.postGetDone, dispatch, post.post?.tags]);

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
              value={form.title}
              placeholder={'제목을 입력해주세요'}
              maxLength="35"
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
              수정
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
            value={form.content}
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
