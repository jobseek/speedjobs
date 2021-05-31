import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  PROFILE_GET_REQUEST,
  PROFILE_UPDATE_DONE,
  PROFILE_UPDATE_REQUEST,
} from '../../../reducers/profile';
import {
  InputText,
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../../components/Styled';
import SideMenu from '../../components/SideMenu';
import ProfileImage from '../../components/Profile/ProfileImage';
import ProfileInputs from '../../components/Profile/ProfileInputs';
import ProfileTextarea from '../../components/Profile/ProfileTextarea';
import AnnounceLocation from '../../components/RecruitAdd/AnnounceLocation';
import { ME_REQUEST } from '../../../reducers/user';

const DropDownContainer = styled('div')`
  position: relative;
  margin: 0 auto;
`;

const DropDownHeader = styled('div')`
  width: 100%;
  border-radius: 27px;
  margin-bottom: 10px;
  padding: 3px 20px 3px;
  height: 35px;
  font-weight: 500;
  border: 1px solid silver;
  cursor: pointer;
`;

const DropDownListContainer = styled('div')``;

const DropDownList = styled('ul')`
  width: 100%;
  border-radius: 27px;
  position: absolute;
  padding-left: 20px;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  font-weight: 500;
  z-index: 1;
  overflow-y: scroll;
  height: 150px;

  &:first-child {
    padding-top: 0.8em;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListItem = styled('li')`
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;

  &:hover {
    color: black;
    font-weight: bold;
  }
`;
export default function CorporateModify() {
  const [options] = useState([
    { id: 0, avgSalary: 3000, name: '3,000 이상' },
    { id: 1, avgSalary: 3500, name: '3,500 이상' },
    { id: 2, avgSalary: 4000, name: '4,000 이상' },
    { id: 3, avgSalary: 4500, name: '4,500 이상' },
    { id: 4, avgSalary: 5000, name: '5,000 이상' },
    { id: 5, avgSalary: 5500, name: '5,500 이상' },
    { id: 6, avgSalary: 6000, name: '6,000 이상' },
    { id: 7, avgSalary: 6500, name: '6,500 이상' },
    { id: 8, avgSalary: 7000, name: '7,000 이상' },
    { id: 9, avgSalary: 7500, name: '7,500 이상' },
    { id: 10, avgSalary: 8000, name: '8,000 이상' },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [refresh] = useCookies(['REFRESH_TOKEN']);

  const toggling = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const profile = useSelector((state) => state.profile);
  const [form, setForm] = useState({
    companyName: '',
    name: '',
    nickname: '',
    registrationNumber: '',
    contact: '',
    picture: '',
    description: '',
    scale: '',
    homepage: '',
    address: '',
    detailedAddress: '',
    avgSalary: '',
    latitude: '',
    longitude: '',
  });

  const onChangeInput = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onChangeDescription = (e) => {
    if (e.target.value.length <= 100) {
      setForm((p) => ({ ...p, description: e.target.value }));
    } else {
      alert('100자 이내로 작성해주세요');
    }
  };

  const onOptionClicked = (value, name) => () => {
    setSelectedOption(name);
    setForm((p) => ({ ...p, avgSalary: value }));
    setIsOpen(false);
  };

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: PROFILE_UPDATE_REQUEST,
        data: form,
        me: user.me,
      });
    },
    [dispatch, form, user.me]
  );

  useEffect(() => {
    if (profile.profileUpdateDone) {
      dispatch({ type: PROFILE_UPDATE_DONE });
      dispatch({
        type: ME_REQUEST,
        data: { accessToken: refresh['ACCESS_TOKEN'] },
      });
      history.push('/profile');
    }
  }, [profile, history, dispatch, refresh]);

  useEffect(() => {
    dispatch({ type: PROFILE_GET_REQUEST, me: user.me });
  }, [user.me, dispatch]);

  useEffect(() => {
    if (profile.profileGetDone) {
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      setForm((p) => ({ ...p, ...profileTemp }));
    }
  }, [profile.profileGetData, profile.profileGetDone, dispatch]);

  return (
    <div className="container text-left">
      <StyledHeaderDiv padding title={'기업 정보 수정'}>
        <div
          className={'col-md-3 col-4 text-right'}
          style={{ paddingRight: '0' }}
        >
          <StyledButton
            style={{ marginRight: '0' }}
            wide
            onClick={(e) => onSubmitHandler(e)}
          >
            변경 사항 저장
          </StyledButton>
        </div>
      </StyledHeaderDiv>
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center">
          <StyledLeftLayout borderNone className={'col-12 col-lg-2 text-left'}>
            <SideMenu />
          </StyledLeftLayout>
          <ProfileDiv className={'col-12 col-lg-10'}>
            {/* 기업 로고 이미지*/}
            <ProfileImage
              name={'picture'}
              onChange={(e) => onChangeInput(e)}
              value={form.picture || ''}
            />
            {/* 기업 이름*/}
            <ProfileInputs name={'기업 이름'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'companyName'}
              type="text"
              value={form.companyName || ''}
              disabled
            />
            {/* 담당자 이름*/}
            <ProfileInputs name={'담당자 이름'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'name'}
              type="text"
              value={form.name || ''}
            />
            {/* 담당자 닉네임*/}
            <ProfileInputs name={'담당자 닉네임'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'nickname'}
              type="text"
              value={(form.nickname = form.name || '')}
              readonly
            />
            {/* 담당자 연락처*/}
            <ProfileInputs name={'담당자 연락처'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'contact'}
              type="text"
              value={form.contact || ''}
            />
            {/* 담장자 이메일*/}
            <ProfileInputs name={'담당자 이메일'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'email'}
              type="email"
              value={form.email || ''}
            />
            {/* 대표 홈페이지*/}
            <ProfileInputs name={'대표 홈페이지'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'homepage'}
              type="text"
              value={form.homepage || ''}
            />
            {/* 사업자 등록번호*/}
            <ProfileInputs name={'사업자 등록번호'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'registrationNumber'}
              type="text"
              value={form.registrationNumber || ''}
              disabled
            />
            {/* 주소*/}
            <AnnounceLocation form={form} setForm={setForm} />
            {/* 사원수*/}
            <ProfileInputs name={'사원수'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'scale'}
              type="text"
              value={form.scale || ''}
            />
            {/* 평균 연봉*/}
            <ProfileInputs name={'평균 연봉'} />
            <DropDownContainer>
              <DropDownHeader onClick={toggling}>
                {selectedOption || form.avgSalary}
              </DropDownHeader>
              {isOpen && (
                <DropDownListContainer>
                  <DropDownList>
                    {options.map((option) => (
                      <ListItem
                        key={option.id}
                        onClick={onOptionClicked(option.avgSalary, option.name)}
                      >
                        {option.name}
                      </ListItem>
                    ))}
                  </DropDownList>
                </DropDownListContainer>
              )}
            </DropDownContainer>

            {/* 소개*/}
            <ProfileInputs name={'소개'} />
            <ProfileTextarea
              onChange={onChangeDescription}
              form={form}
              value={form.description || ''}
              setForm={setForm}
            />
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
