import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import Img from '../img/banners/img.png';
import Img2 from '../img/banners/img2.png';
import BannerImg from './BannerImg';

const Jumbo = styled.div`
  left: 0;
  top: 0;
  padding: 0;
  user-select: none;
  position: relative;
  height: 32vw;
  overflow-x: hidden;
`;

export default function Banner(props) {
  const [cnt, setCnt] = useState(0);
  const bannerList = useMemo(
    () => [
      { src: Img, key: 1, order: 0 },
      { src: Img2, key: 2, order: 1 },
    ],
    []
  );
  const [list, setList] = useState(bannerList);

  const mapImg = list.map((i) => (
    <BannerImg
      now={i.order}
      src={i.src}
      key={i.key}
      zIndex={list.indexOf(i)}
    ></BannerImg>
  ));

  useEffect(() => {
    const time = setTimeout(() => {
      setCnt((prev) => prev + 1);
    }, 20000);
    setList((prev) =>
      [
        ...prev,
        {
          src:
            bannerList[bannerList.length - 1 - (cnt % bannerList.length)].src,
          key: v4(),
          order: bannerList.length - 1,
        },
      ].map((p) => ({ ...p, order: p.order-- }))
    );
    return () => {
      clearTimeout(time);
    };
  }, [cnt, bannerList]);

  useEffect(() => {
    if (list.length > bannerList.length + 2) {
      setList((prev) => {
        return prev.slice(1);
      });
    }
  }, [list.length, bannerList.length]);

  return (
    <div className="container-fluid" style={{ padding: 0, marginTop: '59px' }}>
      <Jumbo className="jumbotron">{mapImg}</Jumbo>
    </div>
  );
}
