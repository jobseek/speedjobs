import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import Img from '../img/banners/img.jpeg';
import Img2 from '../img/banners/img2.jpeg';
import Img3 from '../img/banners/img3.jpeg';
import Img4 from '../img/banner.jpg';
import BannerImg from './BannerImg';

const Jumbo = styled.div`
  left: 0;
  top: 0;
  padding: 0;
  user-select: none;
  position: relative;
  height: 350px;
  overflow-x: hidden;
  @media (max-width: 768px) {
    height: 170px;
  }
`;

export default function Banner(props) {
  const [cnt, setCnt] = useState(0);
  const bannerList = useMemo(
    () => [
      { src: Img, key: 1, order: 1 },
      { src: Img2, key: 2, order: 2 },
      { src: Img3, key: 3, order: 3 },
      { src: Img4, key: 4, order: 0 },
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
    }, 10000);
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
    if (list.length > 6) {
      setList((prev) => {
        return prev.slice(1);
      });
    }
  }, [list.length]);

  return (
    <div className="container-fluid" style={{ padding: 0, marginTop: '59px' }}>
      <Jumbo className="jumbotron">{mapImg}</Jumbo>
    </div>
  );
}
