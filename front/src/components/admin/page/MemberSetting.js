import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoCard from '../component/InfoCard';
import { Content, Header } from '../component/adminStyled';
import { USER_GET_DONE, USER_GET_REQUEST } from '../../../reducers/admin';
import { AdminStyledCol, AdminStyledRow } from '../component/TagList';
import moreString from '../../data/moreString';
import MemberInfo from '../component/MemberInfo';

export default function MemberSetting(props) {
  const { admin, user } = useSelector((s) => s);
  const [userList, setList] = useState([]);
  const [selected, setSelected] = useState(-1);
  const dispatch = useDispatch();
  const onClickHandler = useCallback((e) => {
    setSelected(e);
  }, []);
  useEffect(() => {
    if (user.me !== null) {
      dispatch({
        type: USER_GET_REQUEST,
      });
    }
  }, [user.me, dispatch]);
  useEffect(() => {
    if (admin.getUserDone) {
      setList(
        admin.getUserList.content
          .filter((x) => x !== null)
          .sort((x) => x.createDate)
      );
      console.log(admin.getUserList.content);
      dispatch({
        type: USER_GET_DONE,
      });
    }
  }, [admin.getUserDone, dispatch, admin.getUserList?.content]);
  return (
    <>
      <div className={'row'} style={{ height: '100%' }}>
        <div className={'col-6'}>
          <InfoCard index={1}>
            <Header>회원목록</Header>
            <Content style={{ padding: 0 }}>
              <div className={'container-fluid p-0'}>
                <AdminStyledRow className={'row m-0'}>
                  <div className={'col-4'}>이름</div>
                  <div className={'col-4'}>아이디</div>
                  <div className={'col-4'}>연락처</div>
                </AdminStyledRow>
                <div style={{ overflowY: 'scroll', height: '85vh' }}>
                  {userList.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                      승인 대기목록이 없습니다
                    </div>
                  ) : (
                    userList?.map((u) => (
                      <AdminStyledCol
                        selected={u?.id === selected.id}
                        id={u.id}
                        className={'row m-0'}
                        onClick={() => onClickHandler(u)}
                        key={u.id}
                      >
                        {u.role === 'ROLE_COMPANY' && (
                          <>
                            <div className={'col-4'}>{u.nickname}</div>
                            <div className={'col-4'}>
                              {moreString(u.email, 15)}
                            </div>
                            <div className={'col-4'}>{u.contact}</div>
                          </>
                        )}
                        {u.role === 'ROLE_MEMBER' && (
                          <>
                            <div className={'col-4'}>{u.nickname}</div>
                            <div className={'col-4'}>
                              {moreString(u.email, 15)}
                            </div>
                            <div className={'col-4'}>{u.contact}</div>
                          </>
                        )}
                      </AdminStyledCol>
                    ))
                  )}
                </div>
              </div>
            </Content>
          </InfoCard>
        </div>
        <div className={'col-6'}>
          <InfoCard
            index={2}
            height={'48%'}
            styleProps={{ marginBottom: '4%' }}
          >
            <Header>회원정보</Header>
            <Content>
              <MemberInfo selected={selected}></MemberInfo>
            </Content>
          </InfoCard>
          <InfoCard index={3} height={'48%'}>
            <Header>회원활동</Header>
          </InfoCard>
        </div>
      </div>
    </>
  );
}
