import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  PROFILE_GET_REQUEST,
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

/**
 * 기업회원 수정 페이지
 * 1. dispatch => PROFILE_GET_REQUEST 액션 발생
 * 2. useState를 이용해서 각 항목의 이름을 선언하고 빈문자열로 초기화한다.
 * 3. 조회 페이지에 있었던 값들을 수정페이지에서도 볼 수 있도록 한다.
 * 4. setForm에 저장되어 있는 각 항목을 input 값에 뿌려준다.
 * 5. 데이터를 수정하게 되면 각 항목에 해당하는 e.target.name을 매칭하여 onChangeInput, onChangeDate 이벤트가 발생하도록한다.
 * 6. setForm을 이용해서 변경된 값들을 저장한다.
 * 7. 마지막으로 '변경 사항 저장' 버튼에 onClick 이벤트를 걸어주어 onSubmitHandler 이벤트가 발생하도록 한다.
 * 8. dispatch를 이용해서 PROFILE_UPDATE_REQUEST 리덕스 상태를 전송하고,
 * 9. Redux_Saga에 변경된 데이터 form, role을 확인하기위한 user.me, 사용자 고유 id를 확인하기 위한 user.me.id를 같이 보내준다.
 * 10. 리덕스가 PROFILE_UPDATE_SUCCESS를 보내주면 성공적으로 수정이 완료되었기 때문에 useHistory를 이용해서 조회 페이지로 가게 한다.
 */
export default function CorporateModify() {
  const [options] = useState([
    { id: 0, avgSalary: '3,000 이상' },
    { id: 1, avgSalary: '3,500 이상' },
    { id: 2, avgSalary: '4,000 이상' },
    { id: 3, avgSalary: '4,500 이상' },
    { id: 4, avgSalary: '5,000 이상' },
    { id: 5, avgSalary: '5,500 이상' },
    { id: 6, avgSalary: '6,000 이상' },
    { id: 7, avgSalary: '6,500 이상' },
    { id: 8, avgSalary: '7,000 이상' },
    { id: 9, avgSalary: '7,500 이상' },
    { id: 10, avgSalary: '8,000 이상' },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

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
    avgSalary: '',
  });

  useEffect(() => {
    if (user.me === null) return;
    dispatch({ type: PROFILE_GET_REQUEST, me: user.me });
  }, [user.me, dispatch]);

  useEffect(() => {
    if (profile.profileGetData) {
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      setForm((p) => ({ ...p, ...profileTemp }));
    }
  }, [profile.profileGetData]);

  const onChangeInput = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (user.me.id === null) {
        dispatch({ type: ME_REQUEST });
      }
      dispatch({
        type: PROFILE_UPDATE_REQUEST,
        data: form,
        me: user.me,
      });
      history.push('/profile');
    },
    [dispatch, form, user.me, history]
  );

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
            <ProfileInputs name={'담장자 연락처'} />
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
            {/* 사업 등록번호*/}
            <ProfileInputs name={'사업자 등록번호'} />
            <InputText
              onChange={(e) => onChangeInput(e)}
              name={'registrationNumber'}
              type="text"
              value={form.registrationNumber || ''}
              disabled
            />
            {/* 회사 규모*/}
            <ProfileInputs name={'회사 규모'} />
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
                {selectedOption || '3,000 이상'}
              </DropDownHeader>
              {isOpen && (
                <DropDownListContainer>
                  <DropDownList>
                    {options.map((option) => (
                      <ListItem onClick={onOptionClicked(option.avgSalary)}>
                        {option.avgSalary}
                      </ListItem>
                    ))}
                  </DropDownList>
                </DropDownListContainer>
              )}
            </DropDownContainer>
            {/* 회사 소개*/}
            <ProfileInputs name={'회사 소개'} />
            <ProfileTextarea
              onChange={(e) => onChangeInput(e)}
              name={'description'}
              value={form.description || ''}
            />
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
