import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import { Blank } from '../pages/Community';
import { TagBody } from './Styled';
import { APPLY_LIST_DONE, APPLY_LIST_REQUEST } from '../../reducers/company';

const ResumeTitle = styled.h5`
  @media (max-width: 768px) {
    width: 65%;
  }
`;

const Applicant = styled.div`
  position: absolute;
  right: 180px;
  top: 10px;
  @media (max-width: 768px) {
    right: 20px;
  }

  ${(props) =>
    props.sm &&
    css`
      top: 0;
    `}
`;

const SubmitDate = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  @media (max-width: 768px) {
    top: 40px;
  }

  ${(props) =>
    props.sm &&
    css`
      top: 0;
      @media (max-width: 768px) {
        visibility: hidden;
      }
    `}
`;

export default function SubmitItem({ id, title, date, position, tags }) {
  const { company } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [arr, setArr] = useState([]);
  const [show, setShow] = useState(false);

  const onClickHandler = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      dispatch({
        type: APPLY_LIST_REQUEST,
        data: id,
      });
    }
  };
  useEffect(() => {
    if (company.applyListDone && company.applyListId === id) {
      setArr(company.applyListData?.content);
      dispatch({
        type: APPLY_LIST_DONE,
      });
    }
  }, [
    company.applyListData.content,
    company.applyListDone,
    company.applyListId,
    dispatch,
    id,
  ]);

  const resumeArr = arr.map((resume, index) => (
    <div
      key={index}
      className={'container-fluid text-left'}
      style={{
        position: 'relative',
        padding: '3px 10px',
        width: '95%',
      }}
    >
      <h6
        style={{ margin: '0' }}
        onClick={() => history.push(`../resume/resume/${resume.resumeId}`)}
      >
        {resume.title}
      </h6>
      <Applicant sm>{resume.email}</Applicant>
      <SubmitDate sm>{resume.name}</SubmitDate>
    </div>
  ));

  const mapTags = tags.POSITION.map((tag, index) => (
    <TagBody grey sm key={index}>
      {tag.name}
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
          width: '95%',
        }}
      >
        <ResumeTitle onClick={() => onClickHandler()}>{title}</ResumeTitle>
        <Blank />
        {mapTags}
        <Applicant>{position}</Applicant>
        <SubmitDate>
          {date[0]}-{date[1]}-{date[2]}
        </SubmitDate>
      </div>
      <div
        style={{
          margin: 'auto',
          paddingTop: '3px',
          paddingBottom: '5px',
          borderBottom: '1px solid #eee',
          width: '95%',
        }}
      >
        {show && resumeArr}
      </div>
    </>
  );
}
