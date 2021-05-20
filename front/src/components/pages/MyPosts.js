import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  ProfileDiv,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import PostList from '../components/Post/PostList';
import { POST_LIST_DONE, POST_LIST_REQUEST } from '../../reducers/post';

export default function MyPosts() {
  const targetRef = useRef();
  const { post, user } = useSelector((state) => state);

  return (
    <>
      <div className={'container text-left'}>
        <StyledHeaderDiv padding title={'게시글 목록'} />
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
              style={{ paddingLeft: '40px', paddingRight: '20px' }}
            >
              {/* <Tags tagList={taglist} selected={setTaglist}>*/}
              {/*  직무*/}
              {/* </Tags>*/}
              <PostList
                type={'community'}
                targetRef={targetRef}
                listLoading={post.postListLoading}
                done={post.postListDone}
                list={post.postList}
                typeRequest={POST_LIST_REQUEST}
                typeDone={POST_LIST_DONE}
                option={{ author: user.me?.nickname }}
              />
              <div ref={targetRef} />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </>
  );
}
