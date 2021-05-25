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
  margin-bottom: 20px;
  margin-top: 10px;
  font-size: 25px;
  font-weight: lighter;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  white-space: nowrap;
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
          &nbsp;&nbsp;{title}
        </ResumeTitle>
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '15px',
            textAlign: 'end',
          }}
        >
          <div>작성 : {createdDate}</div>
          <div>수정 : {modifiedDate}</div>
        </div>
      </div>
    </>
  );
}
