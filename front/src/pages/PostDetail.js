import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Heart, HeartFill, ShareFill } from 'react-bootstrap-icons';
import { useCookies } from 'react-cookie';
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
} from '../reducers/post';
import {
  ADD_LIKE_DONE,
  ADD_LIKE_REQUEST,
  UN_LIKE_REQUEST,
} from '../reducers/like';

const PostTextarea = styled.textarea`
  margin-top: 25px;
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  overflow-y: hidden;
`;

export default function PostDetail(props) {
  // react-router-dom 페이지 이동관련 훅스
  const history = useHistory();
  const { id } = useParams();
  // 찜하기 관련상태
  const [fav, setFav] = useState(false);
  // 내 포스트인지 확인하는 상태
  const [myPost, setMyPost] = useState(false);
  // 리덕스
  const post = useSelector((state) => state.post);
  const like = useSelector((state) => state.like);
  const user = useSelector((state) => state.user);
  // 쿠키확인 훅스
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
  // 게시글 내용 상태
  const [content, setContent] = useState({
    title: '',
    content: '',
    createdDate: [0, 0, 0],
    tags: [],
  });
  const dispatch = useDispatch();

  // 게시글에 들어왔을시에 마이포스트 상태 초기화
  useEffect(() => {
    setMyPost(false);
  }, []);

  // 로그인되어서 새로 리퀘스트가 받아진경우(새로고침 대비)
  // 포스트가 로딩이끝났을경우.
  // 자신의 포스트인지 확인한다음에 수정 삭제버튼 노출
  useEffect(() => {
    if (user.me !== null && post.post) {
      if (user.me.id === post.post.authorId) {
        setMyPost(true);
      }
    }
  }, [user.meDone, post.post, user.me]);

  // 게시글 내용 불러오기
  useEffect(() => {
    if (refresh['REFRESH_TOKEN'] === undefined || user.me !== null) {
      dispatch({
        type: POST_GET_REQUEST,
        data: id,
      });
    }
  }, [dispatch, id, user.me, refresh]);

  // 게시글이 불러와졌다면 내용 세팅
  useEffect(() => {
    if (post.postGetDone) {
      setContent({
        title: post.post.title,
        content: post.post.content,
        author: post.post.author,
        createdDate: post.post.createdDate,
        tags: [
          ...(post.post.tags.POSITION ?? []),
          ...(post.post.tags.SKILL ?? []),
        ],
      });
      setFav(post.post.favorite);
      dispatch({
        type: POST_GET_DONE,
      });
    }
  }, [post, id, dispatch]);

  // 게시글 삭제
  const DeleteHandler = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      data: id,
    });
  };

  // 게시글이 삭제되었다면 뒤로 가기
  useEffect(() => {
    if (post.postDeleteDone) {
      dispatch({
        type: POST_DELETE_DONE,
      });
      history.goBack();
    }
  }, [dispatch, history, post.postDeleteDone]);

  // 찜하기 기능 관련 이펙트
  useEffect(() => {
    if (like.data === null) {
      return;
    }
    if (!like.addLikeDone && !like.unLikeDone) {
      return;
    }
    if (like.data.id !== id) {
      return;
    }
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
        data: { id, type: 'community' },
      });
    },
    [id, dispatch]
  );

  const unFavClick = useCallback(
    (e) => {
      dispatch({
        type: UN_LIKE_REQUEST,
        data: { id, type: 'community' },
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
        <StyledHeaderDiv title={content.title}>
          <div style={{ flex: '0 0' }}>
            <StyledButton
              wide
              style={{ letterSpacing: '7px', paddingLeft: '14px' }}
              onClick={() => history.goBack()}
            >
              목록
            </StyledButton>
          </div>
          <div style={{ flex: '0 0' }}>
            <StyledButton
              white={!fav}
              grey={fav}
              onClick={(e) => {
                if (fav) {
                  unFavClick(e);
                } else {
                  favClick(e);
                }
              }}
            >
              찜하기
            </StyledButton>
          </div>
        </StyledHeaderDiv>
        {/* 작성자*/}
        <div className={'container'}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 'lighter',
              margin: '10px 0px 20px 0px',
            }}
          >
            {content.author} {content?.createdDate[0]}-{content?.createdDate[1]}
            -{content?.createdDate[2]}
          </div>
        </div>
        {/* 태그*/}
        <div className={'container-fluid'}>
          <div>
            {content.tags.map((t) => (
              <TagBody sm grey>
                {t.name}
              </TagBody>
            ))}
          </div>
          {/* 본문*/}
          <div
            className={'container-fluid'}
            style={{
              whiteSpace: 'pre-line',
              width: '100%',
              padding: 0,
              fontSize: '14px',
            }}
          >
            <autoheight-textarea>
              <PostTextarea value={content.content} />
            </autoheight-textarea>
          </div>
          {myPost && (
            <div style={{ textAlign: 'right' }}>
              <StyledButton
                white
                onClick={() => history.push(`../modify/${id}`)}
              >
                수정
              </StyledButton>
              <StyledButton white onClick={() => DeleteHandler()}>
                삭제
              </StyledButton>
            </div>
          )}
          {user.me?.role === 'ROLE_ADMIN' && (
            <div style={{ textAlign: 'right' }}>
              <StyledButton white onClick={() => DeleteHandler()}>
                삭제
              </StyledButton>
            </div>
          )}
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
