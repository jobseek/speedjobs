import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  ProfileDiv,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import PostList from '../components/Post/PostList';
import {
  RECRUIT_LIST_DONE,
  RECRUIT_LIST_REQUEST,
} from '../../reducers/recruit';

export default function MyRecruitments() {
  const targetRef = useRef();
  const { recruit, user } = useSelector((state) => state);
  return (
    <>
      <div className={'container text-left'}>
        <StyledHeaderDiv padding title={'공고 목록'}></StyledHeaderDiv>
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
              style={{ paddingLeft: '40px' }}
            >
              {/* <Tags tagList={taglist} selected={setTaglist}>*/}
              {/*  직무*/}
              {/* </Tags>*/}
              <PostList
                type={'recruit'}
                targetRef={targetRef}
                listLoading={recruit.recruitListLoading}
                done={recruit.recruitListDone}
                list={recruit.recruitList}
                typeRequest={RECRUIT_LIST_REQUEST}
                typeDone={RECRUIT_LIST_DONE}
                option={{ companyName: user.me?.nickname }}
              />
              <div ref={targetRef} />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </>
  );
}
