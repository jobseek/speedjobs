import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const AnnounceBody = styled.div`
  position: relative;
  padding: 40px 0px 40px 150px;
  @media (max-width: 400px) {
    padding: 40px 0px 40px 120px;
  }
  @media (max-width: 360px) {
    font-size: 8px;
  }
`;

const AnnounceTitle = styled.h5`
  text-align: left;
  font-weight: bolder;
  @media (max-width: 360px) {
    font-size: 12px;
  }
`;

const AnnounceTags = styled.ul`
  list-style: none;
  padding: 0px;
`;

const AnnounceTagList = styled.li`
  text-align: left;
  display: inline;
  float: left;
  margin-right: 10px;
`;

const AnnounceImg = styled.div`
  position: absolute;
  width: 100px;
  height: 80px;
  border: 1px solid black;
  display: inline-block;
  margin-right: 40px;
  left: 0px;
  top: 35px;
`;

const AnnounceFavorite = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  //border: 1px solid black;
  right: 0px;
  bottom: 10px;
`;

export default function RecruitCard(props) {
  const AnnounceTag = props.tags.map((tags) => {
    return <AnnounceTagList key={tags}>{tags}</AnnounceTagList>;
  });

  return (
    <AnnounceBody>
      <AnnounceImg></AnnounceImg>
      <AnnounceTitle>
        <Link to={'./recruit/detail'}>{props.title}</Link>
      </AnnounceTitle>
      <div>
        <AnnounceTags>{AnnounceTag}</AnnounceTags>
      </div>
      <AnnounceFavorite
        onClick={() => {
          props.setFav(!props.favorite);
        }}
      >
        {props.favorite ? <HeartFill /> : <Heart />}
      </AnnounceFavorite>
    </AnnounceBody>
  );
}

RecruitCard.defaultProps = {
  title: 'default title',
  job: 'default job',
  date: '1999.01.01~until filled',
  tags: ['c++', 'java', 'python'],
};

RecruitCard.propTyoes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.string,
  height: PropTypes.array,
};
