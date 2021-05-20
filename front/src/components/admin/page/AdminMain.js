import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoCard from '../component/InfoCard';
import UserChart from '../data/UserChart';
import { Content, Header } from '../component/adminStyled';
import { USER_GET_DONE, USER_GET_REQUEST } from '../../../reducers/admin';
import PostChart from '../data/PostChart';

export default function AdminMain(props) {
  const dispatch = useDispatch();
  const { admin, user } = useSelector((s) => s);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (user.me !== null) {
      dispatch({
        type: USER_GET_REQUEST,
      });
    }
  }, [user.me, dispatch]);
  useEffect(() => {
    if (admin.getUserDone) {
      const list = admin.getUserList.content;
      console.log(list);
      setUserList([
        list.filter((x) => x?.role === 'ROLE_MEMBER').length,
        list.filter((x) => x?.role === 'ROLE_COMPANY').length,
        list.filter((x) => x?.role === 'ROLE_GUEST').length,
      ]);
      dispatch({
        type: USER_GET_DONE,
      });
    }
  }, [admin.getUserDone, dispatch, admin.getUserList]);
  return (
    <>
      <div className={'row'} style={{ height: '100%' }}>
        <div className={'col-6'}>
          <InfoCard index={1}>
            <Header>통계</Header>
            <Content>
              사이트의 전체적인 동향을 알수있습니다
              <br />
              차트때문에 애니메이션효과가 많아서 동작이느려서..... 수정할 생각을
              해야될수도
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
            <PostChart></PostChart>
          </InfoCard>
        </div>
      </div>
    </>
  );
}
