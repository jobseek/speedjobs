import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ProfileDiv,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import PostList from '../components/Post/PostList';
import { GET_LIKE_DONE, GET_LIKE_REQUEST } from '../../reducers/like';
import TagShower from '../components/tag/TagShower';
import TagSelector from '../components/tag/TagSelector';

export default function CommunityLike() {
  const targetRef = useRef();
  const { like } = useSelector((state) => state);
  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
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
        <StyledHeaderDiv padding title={'공고 찜목록'}></StyledHeaderDiv>
        <div className="container" style={{ marginTop: '70px' }}>
          <div className="row justify-content-center">
            <StyledLeftLayout
              borderNone
              className={'col-12 col-lg-2 text-left'}
            >
              <SideMenu />
            </StyledLeftLayout>
            <ProfileDiv
              className={'col-12 p-0 col-lg-10'}
              style={{ paddingLeft: '30px' }}
            >
              <TagShower tagList={taglist} setTagList={setTaglist} />
              <PostList
                type={'recruit'}
                targetRef={targetRef}
                listLoading={like.getLikeLoading}
                done={like.getLikeDone}
                list={like.list}
                typeRequest={GET_LIKE_REQUEST}
                typeDone={GET_LIKE_DONE}
              />
              <div ref={targetRef} />
              {/* {mapPost}*/}
            </ProfileDiv>
          </div>
        </div>
      </div>
    </>
  );
}
