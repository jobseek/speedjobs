import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import InfoCard from '../component/InfoCard';
import { Content, Header } from '../component/adminStyled';
import { AdminStyledCol, AdminStyledRow } from '../component/TagList';
import CompanyInfo from '../component/CompanyInfo';
import { USER_GET_DONE, USER_GET_REQUEST } from '../../reducers/admin';

export default function CompanySetting(props) {
  const [selected, set] = useState(-1);
  const [refresh, setRefresh] = useState(true);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const onClickHandler = useCallback((e) => {
    set(e);
  }, []);
  useEffect(() => {
    if (refresh) {
      dispatch({
        type: USER_GET_REQUEST,
        data: 'ROLE_GUEST',
      });
    }
  }, [dispatch, refresh]);

  useEffect(() => {
    return () => {
      setUserList([]);
    };
  }, []);

  useEffect(() => {
    if (admin.getUserDone) {
      console.log(admin.getUserList.content);
      setUserList(admin.getUserList.content);
      dispatch({
        type: USER_GET_DONE,
      });
      setRefresh(false);
    }
  }, [admin.getUserDone, admin.getUserList, dispatch, setUserList, refresh]);
  return (
    <>
      <div className={'row'}>
        <div className={'col-6'}>
          <InfoCard index={1}>
            <Header>승인대기목록</Header>
            <Content style={{ padding: 0 }}>
              <div className={'container-fluid p-0'}>
                <AdminStyledRow className={'row m-0'}>
                  <div className={'col-4'}>이름</div>
                  <div className={'col-4'}>아이디</div>
                  <div className={'col-4'}>연락처</div>
                </AdminStyledRow>
                <div style={{ overflowY: 'scroll', height: '80vh' }}>
                  {userList.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                      승인 대기목록이 없습니다
                    </div>
                  ) : (
                    userList?.map((company) => (
                      <AdminStyledCol
                        onClick={() => onClickHandler(company)}
                        selected={company?.id === selected.id}
                        id={company?.id}
                        className={'row m-0'}
                      >
                        <div className={'col-4'}>{company.name}</div>
                        <div className={'col-4'}>{company.email}</div>
                        <div className={'col-4'}>{company.contact}</div>
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
            <Header>회사정보</Header>
            <Content>
              {selected === -1 ? (
                '기업회원을 선택해주세요'
              ) : (
                <CompanyInfo
                  info={selected}
                  set={set}
                  refresh={setRefresh}
                ></CompanyInfo>
              )}
            </Content>
          </InfoCard>
        </div>
      </div>
    </>
  );
}
