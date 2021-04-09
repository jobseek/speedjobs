import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  position: absolute;
  left: 4%;
  width: 92%;
  height: 350px;
  transition: margin 2s ease-in-out;
  margin-left: ${(props) => props.now + 'vw'};
  object-fit: cover;
  z-index: ${(props) => props.zIndex};
  @media (max-width: 768px) {
    height: 170px;
  }
`;

export default function BannerImg({ src, now, zIndex }) {
  return (
    <>
      <Img src={src} now={(now - 2) * 91} zIndex={zIndex}></Img>
    </>
  );
}
