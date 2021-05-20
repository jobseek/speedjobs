import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  ProfileDiv,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import SubmitItem from '../components/SubmitItem';
import {
  RECRUIT_LIST_DONE,
  RECRUIT_LIST_REQUEST,
} from '../../reducers/recruit';

const ApplicationInfo = styled.div`
  border: 1px #eee solid;
  border-radius: 5px;
  width: 95%;
  height: 60px;
  margin: 0 auto 10px;
  padding: 10px 50px;
  color: #707070;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CountNumber = styled.span`
  font-size: 25px;
  margin-right: 8px;
`;

const ListSetting = styled.div`
  margin-left: 25px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export default function SubmitList() {
  const dispatch = useDispatch();
  const { user, recruit } = useSelector((state) => state);
  const [recruitCount, setRecruitCount] = useState('');
  const [arr, setArr] = useState([]);

  // 기업이 작성한 공고목록 불러오기
  useEffect(() => {
    dispatch({
      type: RECRUIT_LIST_REQUEST,
      data: { size: 99, page: 0, companyName: user.me?.nickname },
    });
  }, [dispatch, user.me?.nickname]);
  useEffect(() => {
    if (recruit.recruitList) {
      const tmp = recruit.recruitList.content.length;
      setRecruitCount(tmp);
      setArr(recruit.recruitList.content);
      dispatch({
        type: RECRUIT_LIST_DONE,
      });
    }
  }, [dispatch, recruit.recruitList]);

  const mapArr = arr.map((i, index) => (
    <SubmitItem
      key={index}
      id={i.id}
      title={i.title}
      date={i.openDate}
      tags={i.tags}
      position={i.position}
    />
  ));

  return (
    <div className="container text-left">
      <StyledHeaderDiv padding title={'지원이력서 목록'} />
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center">
          <StyledLeftLayout borderNone className={'col-12 col-lg-2 text-left'}>
            {/* 기업회원을 위한 사이드메뉴로 수정 필요 */}
            <SideMenu />
          </StyledLeftLayout>
          <ProfileDiv className={'col-12 col-lg-10 p-0'}>
            <ListSetting>
              <ApplicationInfo>
                <span>
                  <CountNumber>{recruitCount}</CountNumber>
                  <span>채용중 공고</span>
                </span>
                <span>
                  <CountNumber>5</CountNumber>
                  <span>지원자</span>
                </span>
                <span>
                  <CountNumber>{recruitCount}</CountNumber>
                  <span>전체 공고</span>
                </span>
              </ApplicationInfo>
              {mapArr}
            </ListSetting>
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
