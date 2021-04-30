import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TagBody } from '../Styled';
import { TagDrop, TagsInDrop } from '../Tags';

export default function TagSelector({ tagList, setTagList, children, sm }) {
  const dropRef = useRef();
  const [show, setShow] = useState(false);
  const onClickHandler = useCallback(() => {
    setShow((p) => !p);
  }, [setShow]);

  const ClickHandler = useCallback(
    (e) => {
      if (dropRef.current) {
        if (show && !dropRef.current.contains(e.target)) setShow(false);
      }
    },
    [setShow, dropRef, show]
  );

  const onClickInside = useCallback(
    (tags) => {
      setTagList((p) => {
        p[p.indexOf(tags)].selected = true;
        return [...p];
      });
    },
    [setTagList]
  );

  useEffect(() => {
    addEventListener('click', ClickHandler, true);
    return () => {
      removeEventListener('click', ClickHandler, true);
    };
  }, [ClickHandler]);

  const tagToDrop = tagList
    .filter((tags) => !tags.selected)
    .map((tags) => {
      return (
        <TagsInDrop key={tags.id} onClick={() => onClickInside(tags)}>
          {tags.name}
        </TagsInDrop>
      );
    });
  return (
    <span ref={dropRef}>
      <TagBody sm={sm} tagType onClick={() => onClickHandler()}>
        {children}
        {show && <TagDrop>{tagToDrop}</TagDrop>}
      </TagBody>
    </span>
  );
}
