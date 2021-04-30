import * as PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { X } from 'react-bootstrap-icons';
import { TagBody } from './Styled';

export const TagDrop = styled.div`
  position: absolute;
  border-radius: 5px;
  top: 50px;
  left: 0;
  background-color: white;
  padding: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-weight: bold;
  text-align: left;
  overflow-y: scroll;
  width: 150px;
  height: 150px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TagsInDrop = styled.div`
  width: 100%;
  text-align: left;
  padding: 5px 10px 5px 10px;
  color: black;

  &:hover {
    background-color: #fdf59c;
    color: black;
  }
`;

export default function Tags({ tagList, children, sm, selected }) {
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
            if (selected !== undefined) {
              selected((p) => {
                const next = [...p];
                next[next.indexOf(tags)].selected = false;
                return next;
              });
            } else {
              tags.selected = false;
              setUpdate(update + 1);
            }
          }}
        >
          {tags.name}
          <X />
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
              if (selected !== undefined) {
                selected((p) => {
                  const next = [...p];
                  next[next.indexOf(tags)].selected = true;
                  return next;
                });
              } else {
                tags.selected = true;
                setUpdate(update + 1);
              }
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
        {show && <TagDrop>{TagToDrop}</TagDrop>}
      </TagBody>
      <div>{TagToMap}</div>
    </span>
  );
}

Tags.propTypes = { tagList: PropTypes.array };
