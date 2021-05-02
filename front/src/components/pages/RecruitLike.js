import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import Tags from '../components/Tags';
import PostList from '../components/Post/PostList';
import { GET_LIKE_DONE, GET_LIKE_REQUEST } from '../../reducers/like';

export default function CommunityLike(props) {
  const targetRef = useRef();
  const { like } = useSelector((state) => state);
  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      // const res = [];
      console.log(temp);
      // temp.forEach((item) => {
      //   res.concat([...res, { ...item, item }]);
      //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      // });
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      console.log(tt);
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);

  return (
    <>
      <div className={'container text-left'}>
        <StyledHeaderDiv padding title={'공고 찜목록'}>
          <div style={{ flex: '0 0' }}>
            <StyledButton wide>수정</StyledButton>
          </div>
        </StyledHeaderDiv>
        <div className="container" style={{ marginTop: '70px' }}>
          <div className="row justify-content-center">
            <StyledLeftLayout
              borderNone
              className={'col-12 col-lg-2 text-left'}
            >
              <SideMenu />
            </StyledLeftLayout>
            <ProfileDiv
              className={'col-12 col-lg-10'}
              style={{ paddingLeft: '30px' }}
            >
              <Tags tagList={taglist} selected={setTaglist}>
                직무
              </Tags>
              <PostList
                type={'recruit'}
                targetRef={targetRef}
                listLoading={like.getLikeLoading}
                done={like.getLikeDone}
                list={like.list}
                typeRequest={GET_LIKE_REQUEST}
                typeDone={GET_LIKE_DONE}
              ></PostList>
              <div ref={targetRef}></div>
              {/* {mapPost}*/}
            </ProfileDiv>
          </div>
        </div>
      </div>
    </>
  );
}
