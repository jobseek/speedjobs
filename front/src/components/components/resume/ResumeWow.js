import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Blank } from '../../pages/Community';

const ResumeTitle = styled.div`
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

export default function ResumeWow({ id, title, open, createdDate }) {
  const history = useHistory();
  const onClickHandler = useCallback(() => {
    history.push(`/resume/resume/${id}`);
  }, [history, id]);
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
        <ResumeTitle onClick={onClickHandler}>{title}</ResumeTitle>
        <Blank />
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '15px',
            textAlign: 'end',
          }}
        >
          <div>공개여부 : {open}</div>
          <div>작성일 : {createdDate}</div>
        </div>
      </div>
    </>
  );
}
