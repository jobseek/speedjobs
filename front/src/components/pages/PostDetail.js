import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Heart, HeartFill, ShareFill } from 'react-bootstrap-icons';
import {
  StyledButton,
  StyledHeaderDiv,
  StyledLike,
  TagBody,
} from '../components/Styled';
import PostDetailComment from '../components/comment/PostDetailComment';
import {
  POST_DELETE_DONE,
  POST_DELETE_REQUEST,
  POST_GET_DONE,
  POST_GET_REQUEST,
  POST_LIST_REQUEST,
} from '../../reducers/post';
import {
  ADD_LIKE_DONE,
  ADD_LIKE_REQUEST,
  UN_LIKE_REQUEST,
} from '../../reducers/like';

const PostTextarea = styled.textarea`
  margin-top: 25px;
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  overflow-y: hidden;
`;

export default function PostDetail(props) {
  const history = useHistory();
  const { id } = useParams();
  const [fav, setFav] = useState(false);
  const location = useLocation();
  const post = useSelector((state) => state.post);
  const like = useSelector((state) => state.like);
  const [content, setContent] = useState({
    title: '',
    content: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: POST_GET_REQUEST,
      data: id,
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (post.postGetDone) {
      setContent({
        title: post.post.title,
        content: post.post.content,
        author: post.post.author,
        createdDate: post.post.createdDate,
      });
      dispatch({
        type: POST_GET_DONE,
      });
    }
  }, [post, id, dispatch]);

  const DeleteHandler = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      data: id,
    });
  };
  useEffect(() => {
    if (post.postDeleteDone) {
      dispatch({
        type: POST_DELETE_DONE,
      });
      history.goBack();
    }
    dispatch({
      type: POST_LIST_REQUEST,
    });
  }, [dispatch, history, post.postDeleteDone]);
  useEffect(() => {
    if (location.state.fav) setFav(true);
    else setFav(false);
  }, [location.state.fav]);

  useEffect(() => {
    if (like.data === null) return;
    if (!like.addLikeDone && !like.unLikeDone) return;
    if (like.data.id !== id) return;
    if (like.addLikeDone) {
      setFav(true);
    } else if (like.unLikeDone) {
      setFav(false);
    }
    dispatch({
      type: ADD_LIKE_DONE,
    });
  }, [like.addLikeDone, like.unLikeDone, like.data, dispatch, id]);

  const favClick = useCallback(
    (e) => {
      dispatch({
        type: ADD_LIKE_REQUEST,
        data: { id },
      });
    },
    [id, dispatch]
  );

  const unFavClick = useCallback(
    (e) => {
      dispatch({
        type: UN_LIKE_REQUEST,
        data: { id },
      });
    },
    [id, dispatch]
  );

  return (
    <>
      <div
        className="container text-left"
        style={{
          padding: '30px 0px 0px',
          textAlign: 'left',
        }}
      >
        {/* 헤더*/}
        <StyledHeaderDiv>
          <div
            className={'container row justify-content-end'}
            style={{ paddingTop: '15px' }}
          >
            <div className={'col-md-8 col-6 p-0'} style={{ marginTop: '14px' }}>
              <h5 style={{ paddingLeft: '15px' }}>{content.title}</h5>
            </div>
            <div
              className={'col-md-4 col-6 text-right'}
              style={{ paddingRight: 0 }}
            >
              <StyledButton
                wide
                style={{ letterSpacing: '10px', paddingLeft: '20px' }}
                onClick={() => history.goBack()}
              >
                목록
              </StyledButton>
              <StyledButton
                white={!fav}
                grey={fav}
                onClick={(e) => {
                  if (fav) unFavClick(e);
                  else favClick(e);
                }}
              >
                찜하기
              </StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        {/* 작성자*/}
        <div className={'container'}>
          <div style={{ margin: '10px 0px 20px 0px' }}>
            {location.state.writer} {location.state.date}
          </div>
        </div>
        {/* 태그*/}
        <div>
          {location.state.tags.map((t) => (
            <TagBody grey>{t.name}</TagBody>
          ))}
        </div>
        {/* 본문*/}
        <div
          className={'container'}
          style={{ whiteSpace: 'pre-line', width: '100%' }}
        >
          <autoheight-textarea>
            <PostTextarea value={content.content} />
          </autoheight-textarea>
        </div>
        <div style={{ textAlign: 'right' }}>
          <StyledButton white>수정</StyledButton>
          <StyledButton white onClick={() => DeleteHandler()}>
            삭제
          </StyledButton>
        </div>
        <PostDetailComment id={id} />
      </div>
      {/* 찜 공유*/}
      <StyledLike>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <span>
            {fav ? (
              <HeartFill onClick={unFavClick}></HeartFill>
            ) : (
              <Heart onClick={favClick}></Heart>
            )}
          </span>
        </div>
        <div style={{ width: '100%', textAlign: 'center', fontSize: '10px' }}>
          {/* 찜수 */}
          <div style={{ height: '10px' }}></div>
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <span>
            <ShareFill></ShareFill>
          </span>
        </div>
      </StyledLike>
    </>
  );
}
