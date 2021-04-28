import React, { useCallback, useState } from 'react';
import InfoCard from '../component/InfoCard';
import { Content, Header } from '../component/adminStyled';
import { AdminStyledCol, AdminStyledRow } from '../component/TagList';
import CompanyInfo from '../component/CompanyInfo';

const dummy = [
  {
    name: '네이버',
    email: 'naver@com',
    id: 0,
    scale: '100',
    location: [130, 120],
    contact: '01022222222',
  },
  {
    name: '네이버',
    email: 'naver@com',
    id: 1,
    scale: '100',
    location: [130, 120],
    contact: '01022222222',
  },
  {
    name: '네이버',
    email: 'naver@com',
    id: 2,
    scale: '100',
    location: [130, 120],
    contact: '01022222222',
  },
  {
    name: '네이버',
    email: 'naver@com',
    id: 3,
    scale: '100',
    location: [130, 120],
    contact: '01022222222',
  },
  {
    name: '네이버',
    email: 'naver@com',
    id: 4,
    scale: '100',
    location: [130, 120],
    contact: '01022222222',
  },
];

export default function CompanySetting(props) {
  const [selected, set] = useState(-1);
  const onClickHandler = useCallback((e) => {
    set(e.id);
  }, []);
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
                  {dummy.map((company) => (
                    <AdminStyledCol
                      onClick={() => onClickHandler(company)}
                      selected={company.id === selected}
                      id={company.id}
                      className={'row m-0'}
                    >
                      <div className={'col-4'}>{company.name}</div>
                      <div className={'col-4'}>{company.email}</div>
                      <div className={'col-4'}>{company.contact}</div>
                    </AdminStyledCol>
                  ))}
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
                <CompanyInfo id={selected}></CompanyInfo>
              )}
            </Content>
          </InfoCard>
        </div>
      </div>
    </>
  );
}
