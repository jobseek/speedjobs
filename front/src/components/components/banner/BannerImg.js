import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  position: absolute;
  width: 100vw;
  left: 0;
  height: 100%;
  transition: opacity 2s ease-in-out;
  opacity: ${(props) => (props.now ? 1 : 0)};
  object-fit: fill;
  z-index: ${(props) => props.zIndex};
`;

export default function BannerImg({ src, now, zIndex, order }) {
  return (
    <>
      <Img src={src} now={now === order} zIndex={zIndex}></Img>
    </>
  );
}
