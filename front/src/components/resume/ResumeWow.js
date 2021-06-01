import React, { useCallback } from 'react';
import { LockFill, UnlockFill } from '@styled-icons/bootstrap';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const MyLock = styled(LockFill)`
  width: 25px;
  color: red;
`;

const MyUnlock = styled(UnlockFill)`
  width: 25px;
  color: #7c7c7c;
`;

const ResumeTitle = styled.div`
  margin-bottom: 30px;
  margin-top: 10px;
  font-size: 19px;
  //font-weight: lighter;
  width: 65%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  white-space: nowrap;
  @media (max-width: 692px) {
    font-size: 16px;
  }
`;

const PostSubTitle = styled.span`
  font-size: 14px;
  font-weight: lighter;
  @media (max-width: 692px) {
    font-size: 12px;
  }
`;

export default function ResumeWow({
  id,
  title,
  open,
  createdDate,
  modifiedDate,
}) {
  const history = useHistory();
  const onClickHandler = useCallback(() => {
    history.push(`/resume/${id}`);
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
        <ResumeTitle onClick={onClickHandler}>
          {open === 'NO' ? (
            <span>
              <MyLock />
            </span>
          ) : (
            <span>
              <MyUnlock />
            </span>
          )}
          &emsp;{title}
        </ResumeTitle>
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '15px',
            textAlign: 'end',
          }}
        >
          <div>
            <PostSubTitle>작성 {createdDate}</PostSubTitle>
          </div>
          <div>
            <PostSubTitle>수정 {modifiedDate}</PostSubTitle>
          </div>
        </div>
      </div>
    </>
  );
}
