import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { HeartFill, ShareFill } from 'react-bootstrap-icons';
import {
  StyledButton,
  StyledHeaderDiv,
  StyledLike,
  TagBody,
} from '../components/Styled';
import PostDetailComment from '../components/comment/PostDetailComment';
import { POST_GET_DONE, POST_GET_REQUEST } from '../../reducers/post';

export default function PostDetail(props) {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const post = useSelector((state) => state.post);
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
      console.log(post.post);
      setContent({
        title: post.post.title,
        content: post.post.content,
      });
      dispatch({
        type: POST_GET_DONE,
      });
    }
  }, [post.postGetDone, post, dispatch]);
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
              <StyledButton white>찜하기</StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        {/* 작성자*/}
        <div className={'container'}>
          <div style={{ margin: '10px 0px 20px 0px' }}>
            {location.state.writer} {location.state.date}
          </div>
          {/* 태그*/}
          <div>
            {location.state.tags.map((t) => (
              <TagBody grey>{t.name}</TagBody>
            ))}
          </div>
          {/* 본문*/}
          <div style={{ whiteSpace: 'pre-line', width: '100%' }}>
            {content.content}
          </div>
        </div>
        {/* 찜 공유*/}
        <StyledLike>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <span>
              <HeartFill></HeartFill>
            </span>
          </div>
          <div style={{ width: '100%', textAlign: 'center', fontSize: '10px' }}>
            99+
          </div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <span>
              <ShareFill></ShareFill>
            </span>
          </div>
        </StyledLike>
        <PostDetailComment id={id} />
      </div>
    </>
  );
}
