import { ChatSquareQuote, Heart, HeartFill } from 'react-bootstrap-icons';
import { EyeShow } from '@styled-icons/fluentui-system-filled/EyeShow';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagBody } from './Styled';
import { Blank } from '../pages/Community';
import {
  ADD_LIKE_DONE,
  ADD_LIKE_REQUEST,
  UN_LIKE_REQUEST,
} from '../../reducers/like';

const PostTitle = styled.div`
  margin-bottom: 30px;
  margin-top: 10px;
  font-size: 25px;
  font-weight: lighter;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  white-space: nowrap;
`;

export default function Post({
  title,
  tags,
  writer,
  commentCount,
  viewCount,
  favoriteCount,
  date,
  fav,
  id,
  type,
}) {
  const [inFav, set] = useState(fav);
  const [inFavCnt, setCnt] = useState(favoriteCount);
  const history = useHistory();
  const dispatch = useDispatch();
  const like = useSelector((state) => state.like);
  // 태그 맵
  const mapTags = tags.map((tag) => (
    <TagBody grey sm key={tag.id}>
      {tag.name}
    </TagBody>
  ));

  const onClickHandler = useCallback(() => {
    history.push({
      pathname: `/${
        type === 'community' ? 'community/post' : 'recruit/detail'
      }/${id}`,
      state: {
        writer,
        tags,
        date,
        fav: inFav,
      },
    });
  }, [date, history, id, tags, type, writer, inFav]);

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
      set(true);
      setCnt((p) => p + 1);
    } else if (like.unLikeDone) {
      set(false);
      setCnt((p) => p - 1);
    }
    dispatch({
      type: ADD_LIKE_DONE,
    });
  }, [like.addLikeDone, like.unLikeDone, like.data, dispatch, id]);
  const favClick = useCallback(
    (e) => {
      dispatch({
        type: ADD_LIKE_REQUEST,
        data: { id, type },
      });
    },
    [id, dispatch, type]
  );

  const unFavClick = useCallback(
    (e) => {
      dispatch({
        type: UN_LIKE_REQUEST,
        data: { id, type },
      });
    },
    [id, dispatch, type]
  );
  return (
    <>
      <div
        className={'container-fluid text-left'}
        style={{
          borderBottom: '1px solid #eee',
          position: 'relative',
          padding: '10px',
        }}
      >
        <PostTitle onClick={onClickHandler}>{title}</PostTitle>
        <Blank />
        {mapTags}
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '15px',
            textAlign: 'end',
          }}
        >
          <div>{writer}</div>
          <div style={{ marginBottom: '20px' }}>{date}</div>
          {type === 'community' && (
            <div style={{ display: 'inline-block' }}>
              <ChatSquareQuote style={{ width: '25px' }} /> {commentCount}
            </div>
          )}
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            <EyeShow style={{ width: '25px' }} /> {viewCount}
          </div>
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            {inFav ? (
              <HeartFill onClick={unFavClick}></HeartFill>
            ) : (
              <Heart onClick={favClick}></Heart>
            )}
            <span style={{ width: '1px', marginRight: '5px' }}></span>
            {inFavCnt}
          </div>
        </div>
      </div>
    </>
  );
}
