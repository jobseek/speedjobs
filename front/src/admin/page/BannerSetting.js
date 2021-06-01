import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash } from '@styled-icons/bootstrap';
import styled from 'styled-components';
import { Content, Header } from '../component/adminStyled';
import InfoCard from '../component/InfoCard';
import TagList from '../component/TagList';
import {
  DELETE_BANNER_DONE,
  DELETE_BANNER_REQUEST,
  GET_BANNER_REQUEST,
  SET_BANNER_DONE,
  SET_BANNER_REQUEST,
} from '../../reducers/admin';

const ImgInside = styled.img`
  background-color: white;
  width: 100%;
  height: 120px;
  margin: 20px 0 0;
`;

const Img = ({ src, alt, id, onClick }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Trash
        onClick={() => onClick(id)}
        style={{
          position: 'absolute',
          right: '-5px',
          top: '10px',
          backgroundColor: '#FD8282',
          padding: '5px',
          color: 'white',
          borderRadius: '10px',
        }}
        size={'30px'}
      ></Trash>
      <ImgInside src={src} id={id} alt={alt}></ImgInside>
    </div>
  );
};

const ImgContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  padding-top: 120px;
  width: 100%;
  height: 300px;
  border: 1px dashed gray;
`;

export default function BannerSetting(props) {
  const [src, set] = useState([]);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const dropHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: SET_BANNER_REQUEST,
      data: e.dataTransfer.files[0],
    });
  };

  const onClickHandler = useCallback(
    (e) => {
      console.log(e);
      dispatch({
        type: DELETE_BANNER_REQUEST,
        data: e,
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (admin.setBannerDone) {
      dispatch({
        type: GET_BANNER_REQUEST,
      });
      dispatch({
        type: SET_BANNER_DONE,
      });
    }
  }, [admin.setBannerDone, dispatch]);

  useEffect(() => {
    if (admin.deleteBannerDone) {
      dispatch({
        type: GET_BANNER_REQUEST,
      });
      dispatch({
        type: DELETE_BANNER_DONE,
      });
    }
  }, [admin.deleteBannerDone, dispatch]);
  // 배너불러오기
  useEffect(() => {
    dispatch({
      type: GET_BANNER_REQUEST,
    });
  }, [dispatch]);

  // 배너 불러오기 완료
  useEffect(() => {
    if (admin.getBannerList !== null) {
      set(
        admin.getBannerList.banners.map((b) => {
          return { id: b.id, url: b.file.url };
        })
      );
    }
  }, [admin.getBannerList]);

  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className={'row'} style={{ height: '100%' }}>
        <div className={'col-6'}>
          <InfoCard index={1} height={'100%'}>
            <div
              style={{
                width: '100%',
                height: '100%',
                border: '#eee 1px solid',
              }}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={dropHandler}
            >
              <Header>배너관리</Header>
              <Content>
                4장미만의 사진으론 배너를 구성할수없습니다
                <br />
                3:1혹은 4:1 비율의 사진이 배너로쓰기에 적합합니다
                {src.length === 0 && (
                  <ImgContainer>사진이없습니다</ImgContainer>
                )}
                {src.map((s) => (
                  <Img
                    onClick={onClickHandler}
                    key={s.id}
                    id={s.id}
                    src={s.url}
                    alt={'hello'}
                  />
                ))}
              </Content>
            </div>
          </InfoCard>
        </div>
        <div className={'col-6'}>
          <InfoCard index={2}>
            <Header>태그관리</Header>
            <TagList></TagList>
          </InfoCard>
        </div>
      </div>
    </>
  );
}
