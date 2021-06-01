import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Applicant, SubmitDate } from './SubmitItem';

const Title = styled.p`
  margin-bottom: 5px;
  @media (max-width: 768px) {
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 42%;
    height: 15px;
  }
`;

export default function ResumeItem({ resume }) {
  const history = useHistory();
  const [id, setId] = useState();
  useEffect(() => {
    if (resume.resumeId === undefined) setId(resume.id);
    else {
      setId(resume.resumeId);
    }
  }, [resume.id, resume.resumeId]);

  return (
    <div
      className={'container-fluid text-left'}
      style={{
        position: 'relative',
        padding: '3px 10px',
        width: '95%',
      }}
    >
      <div
        style={{ margin: '0' }}
        onClick={() => history.push(`../resume/${id}`)}
      >
        <Title>{resume.title}</Title>
      </div>
      <Applicant sm>{resume.email}</Applicant>
      <SubmitDate sm>{resume.name}</SubmitDate>
    </div>
  );
}
