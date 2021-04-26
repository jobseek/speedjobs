import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledHeaderMargin,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import Tags from '../components/Tags';
import PostList from '../components/Post/PostList';
import { GET_LIKE_DONE, GET_LIKE_REQUEST } from '../../reducers/like';

export default function LikeList() {
  const [taglist, setTaglist] = useState([]);
  const targetRef = useRef();
  const tagss = useSelector((state) => state.tag);
  const like = useSelector((state) => state.like);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);

  return (
    <>
      <div className={'container text-left'}>
        <StyledHeaderDiv padding>
          <StyledHeaderMargin className={'container row justify-content-end'}>
            <div
              className={'col-md-9 col-8'}
              style={{ marginTop: '14px', paddingTop: '5px' }}
            >
              <h5>게시글 찜목록</h5>
            </div>
            <div className={'col-md-3 col-4 pr-0 text-right pr-0'}>
              <StyledButton wide>수정</StyledButton>
            </div>
          </StyledHeaderMargin>
        </StyledHeaderDiv>
        <div
          className="container-fluid"
          style={{ marginTop: '70px' }}
        >
          <div className="row justify-content-center">
            <StyledLeftLayout
              borderNone
              className={'col-12 col-lg-2 text-left'}
            >
              <SideMenu />
            </StyledLeftLayout>
            {/* 태그 end*/}

            {/* 게시글*/}
            <ProfileDiv className={'col-12 col-lg-10'}>
              <Tags tagList={taglist} selected={setTaglist}>
                직무
              </Tags>
              <PostList
                type={'community'}
                targetRef={targetRef}
                listLoading={like.getLikeLoading}
                done={like.getLikeDone}
                list={like.list}
                typeRequest={GET_LIKE_REQUEST}
                typeDone={GET_LIKE_DONE}
              ></PostList>
              <div ref={targetRef}></div>
            </ProfileDiv>
            {/* 게시글 end*/}
          </div>
        </div>
      </div>
    </>
  );
}
