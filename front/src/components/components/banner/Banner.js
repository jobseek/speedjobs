import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import BannerImg from './BannerImg';
import { GET_BANNER_DONE, GET_BANNER_REQUEST } from '../../../reducers/admin';

const Jumbo = styled.div`
  left: 0;
  top: 0;
  padding: 0;
  user-select: none;
  position: relative;
  height: 25vw;
  overflow-x: hidden;
  border-radius: 0px;
  @media (max-width: 692px) {
    height: 27vw;
  }
`;

export default function Banner(props) {
  const [cnt, setCnt] = useState(0);
  const dispatch = useDispatch();
  const { admin } = useSelector((s) => s);
  const [bannerList, setBannerList] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch({
      type: GET_BANNER_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    if (admin.getBannerDone) {
      setBannerList(
        admin.getBannerList.banners?.map((b, idx) => {
          return { src: b.file.url, key: b.id, order: idx };
        })
      );
      dispatch({
        type: GET_BANNER_DONE,
      });
    }
  }, [admin.getBannerDone, dispatch, admin, admin.getBannerList?.banners]);

  useEffect(() => {
    setList(bannerList);
  }, [bannerList]);

  const mapImg = list.map((i) => (
    <BannerImg now={i.order} src={i.src} key={i.key} zIndex={list.indexOf(i)} />
  ));

  useEffect(() => {
    const time = setTimeout(() => {
      setCnt((prev) => prev + 1);
    }, 20000);
    if (bannerList.length > 0) {
      setList((prev) =>
        [
          ...prev,
          {
            src: bannerList[bannerList.length - 1 - (cnt % bannerList.length)]
              .src,
            key: v4(),
            order: bannerList.length - 1,
          },
        ].map((p) => ({ ...p, order: p.order-- }))
      );
    }
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
