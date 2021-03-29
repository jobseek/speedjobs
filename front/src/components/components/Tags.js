import * as PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CaretDownFill, X } from 'react-bootstrap-icons';
import { TagBody } from './Styled';

const TagDrop = styled.div`
  position: absolute;
  border-radius: 5px;
  top: 50px;
  left: 0px;
  background-color: white;
  padding: 10px 30px 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-weight: bold;
  text-align: left;
`;

const TagsInDrop = styled.div`
  margin-bottom: 4px;
`;

export default function Tags({ tagList, children, sm }) {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(0);
  const dropRef = useRef();
  const ClickHandler = (e) => {
    if (dropRef.current) {
      if (show && !dropRef.current.contains(e.target)) setShow(false);
    }
  };

  useEffect(() => {
    addEventListener('click', ClickHandler, true);
    return () => {
      removeEventListener('click', ClickHandler, true);
    };
  });

  const TagToMap = tagList
    .filter((tags) => tags.selected)
    .map((tags) => {
      return (
        <TagBody
          sm={sm}
          key={tags.id}
          onClick={() => {
            tags.selected = false;
            setUpdate(update + 1);
          }}
        >
          {tags.name}
          <X></X>
        </TagBody>
      );
    });

  const TagToDrop = tagList
    .filter((tags) => !tags.selected)
    .map((tags) => {
      return (
        <span key={tags.id}>
          <TagsInDrop
            onClick={() => {
              tags.selected = true;
              setUpdate(update + 1);
            }}
          >
            {tags.name}
          </TagsInDrop>
          {/* {tags !== tagList[tagList.length - 1] && <Line />}*/}
        </span>
      );
    });

  return (
    <span ref={dropRef}>
      <TagBody
        sm={sm}
        tagType
        onClick={() => {
          setShow(show !== true);
        }}
      >
        {children}
        <CaretDownFill />
        {show && <TagDrop>{TagToDrop}</TagDrop>}
      </TagBody>
      {TagToMap}
    </span>
  );
}

Tags.propTypes = { tagList: PropTypes.array };
