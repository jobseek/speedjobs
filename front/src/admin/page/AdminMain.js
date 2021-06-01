import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import InfoCard from '../component/InfoCard';
import UserChart from '../data/UserChart';
import { Content, Header } from '../component/adminStyled';
import {
  GET_POST_REQUEST,
  USER_GET_DONE,
  USER_GET_REQUEST,
} from '../../reducers/admin';
import PostChart from '../data/PostChart';
import getDates, { getFullDates } from '../data/getDates';
import Table from '../component/Table';

export default function AdminMain({ set }) {
  const dispatch = useDispatch();
  const { admin, user } = useSelector((s) => s);
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState({});
  useEffect(() => {
    if (user.me !== null) {
      dispatch({
        type: USER_GET_REQUEST,
      });
      dispatch({
        type: GET_POST_REQUEST,
        data: moment().subtract(4, 'days').format('YYYY-MM-DD'),
      });
    }
  }, [user.me, dispatch]);
  useEffect(() => {
    if (admin.getUserDone) {
      const list = admin.getUserList.content;
      setUserList([
        list.filter((x) => x?.role === 'ROLE_MEMBER').length,
        list.filter((x) => x?.role === 'ROLE_COMPANY').length,
        list.filter((x) => x?.role === 'ROLE_GUEST').length,
      ]);
      dispatch({
        type: USER_GET_DONE,
      });
    }
    if (admin.getPostDone) {
      const days = getDates();
      setPostList({
        post: days.map((d) => {
          return admin.postList.post.content.filter(
            (p) => p.createdDate[2] === parseInt(d, 10)
          ).length;
        }),

        recruit: days.map((d) => {
          return admin.postList.recruit.content.filter(
            (r) => r.createdDate[2] === parseInt(d, 10)
          ).length;
        }),
      });
    }
  }, [
    admin.getUserDone,
    dispatch,
    admin.getUserList,
    admin.getPostDone,
    admin.postList,
  ]);

  return (
    <>
      <div className={'row'} style={{ height: '100%' }}>
        <div className={'col-6'}>
          <InfoCard index={1}>
            <Header>통계</Header>
            <Content>
              <Table
                headers={['기존회원', '기업회원', '승인대기']}
                data={[userList]}
                linkText={'유저정보 더보기'}
                link={() => set('Member')}
              ></Table>
              <Table
                headers={['날짜', '커뮤니티', '공고']}
                data={getFullDates().map((d, index) => [
                  d,
                  postList.post && postList.post[4 - index],
                  postList.post && postList.recruit[4 - index],
                ])}
                linkText={'글 정보 더보기'}
                link={() => set('Post')}
              ></Table>
            </Content>
          </InfoCard>
        </div>
        <div className={'col-6'}>
          <InfoCard
            index={2}
            height={'48%'}
            styleProps={{ marginBottom: '4%', padding: '10px' }}
          >
            <UserChart userData={userList}></UserChart>
          </InfoCard>
          <InfoCard styleProps={{ padding: '10px' }} index={3} height={'47%'}>
            <PostChart postData={postList}></PostChart>
          </InfoCard>
        </div>
      </div>
    </>
  );
}
