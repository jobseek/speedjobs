import { ChatSquareQuote, Heart, HeartFill } from 'react-bootstrap-icons';
import { EyeShow } from '@styled-icons/fluentui-system-filled/EyeShow';
import { useHistory } from 'react-router';
import React, { useCallback } from 'react';
import { TagBody } from './Styled';
import { Blank } from '../pages/Community';

export default function Post({
  title,
  tags,
  writer,
  commentCount,
  viewCount,
  likeCount,
  date,
  fav,
  id,
  type,
}) {
  const history = useHistory();
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
        fav,
      },
    });
  }, [date, fav, history, id, tags, type, writer]);

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
        <h4 style={{ marginBottom: '30px', marginTop: '10px' }}>
          <span onClick={onClickHandler}>{title}</span>
        </h4>
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
          <div style={{ display: 'inline-block' }}>
            <ChatSquareQuote style={{ width: '25px' }} /> {commentCount}
          </div>
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            <EyeShow style={{ width: '25px' }} /> {viewCount}
          </div>
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            {fav ? <HeartFill /> : <Heart />} {likeCount}
          </div>
        </div>
      </div>
    </>
  );
}
