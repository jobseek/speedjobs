import React, { useCallback } from 'react';
import { TagBody } from '../Styled';

export default function TagShower({ tagList = [], sm, setTagList }) {
  const onClickMap = useCallback(
    (tags) => {
      setTagList((p) => {
        p[p.indexOf(tags)].selected = false;
        return [...p];
      });
    },
    [setTagList]
  );
  const tagToMap = tagList
    .filter((tags) => tags.selected)
    .map((tags) => (
      <TagBody sm={sm} key={tags.id} onClick={() => onClickMap(tags)}>
        {tags.name}
      </TagBody>
    ));
  return (
    <>
      <div>{tagToMap}</div>
    </>
  );
}
