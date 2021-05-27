import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoCard from '../component/InfoCard';
import { Content, Header } from '../component/adminStyled';
import {
  DELETE_USER_DONE,
  DELETE_USER_REQUEST,
  USER_GET_DONE,
  USER_GET_REQUEST,
} from '../../../reducers/admin';
import { AdminStyledCol, AdminStyledRow } from '../component/TagList';
import moreString from '../../data/moreString';
import MemberInfo from '../component/MemberInfo';
import Alert from '../component/Alert';

export default function MemberSetting(props) {
  const { admin, user } = useSelector((s) => s);
  const [alert, setAlert] = useState(false);
  const [userList, setList] = useState([]);
  const [selected, setSelected] = useState(-1);
  const dispatch = useDispatch();
  const onClickHandler = useCallback((e) => {
    setSelected(e);
  }, []);

  const toggleAlert = useCallback((flag) => {
    if (flag !== undefined) {
      setAlert(flag);
      return;
    }
    setAlert((p) => !p);
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

  const onOk = useCallback(() => {
    dispatch({
      type: DELETE_USER_REQUEST,
      data: selected.id,
    });
    setAlert(false);
  }, [selected, dispatch]);

  useEffect(() => {
    if (admin.deleteUserDone) {
      setSelected(-1);
      dispatch({
        type: DELETE_USER_DONE,
      });
      dispatch({
        type: USER_GET_REQUEST,
      });
    }
  }, [admin.deleteUserDone, dispatch]);

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
          <InfoCard index={2}>
            <Header>회원정보</Header>
            <Content>
              <MemberInfo
                setAlert={toggleAlert}
                selected={selected}
              ></MemberInfo>
            </Content>
          </InfoCard>
        </div>
        {alert && (
          <Alert setAlert={toggleAlert} onOk={onOk}>
            정말로 삭제하시겠습니까?
          </Alert>
        )}
      </div>
    </>
  );
}
