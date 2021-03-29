import { Heart, HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import React from 'react';
import { TagBody } from './Styled';

export default function Post({ title, tags, writer, date, fav }) {
  // 태그 맵
  const mapTags = tags.map((tag) => (
    <TagBody grey sm key={tag}>
      {tag}
    </TagBody>
  ));

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
          <Link to={'./community/post'}>{title}</Link>
        </h4>
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
          {fav ? <HeartFill></HeartFill> : <Heart></Heart>}
        </div>
      </div>
    </>
  );
}
