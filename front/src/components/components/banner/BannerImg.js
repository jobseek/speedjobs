import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  position: absolute;
  left: 2%;
  width: 96%;
  height: 350px;
  transition: all 2s ease-in-out;
  margin-left: ${(props) => props.now + 'vw'};
  opacity: ${(props) => (props.now === 0 ? 1 : 0.3)};
  object-fit: cover;
  z-index: ${(props) => props.zIndex};
  @media (max-width: 768px) {
    height: 170px;
  }
`;

export default function BannerImg({ src, now, zIndex }) {
  return (
    <>
      <Img src={src} now={(now - 2) * 96} zIndex={zIndex}></Img>
    </>
  );
}
