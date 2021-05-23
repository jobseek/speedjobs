import { useHistory } from 'react-router';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ToggleOff } from '@styled-icons/bootstrap/ToggleOff';
import { ToggleOn } from '@styled-icons/bootstrap/ToggleOn';
import {
  Private,
  ResumeImg,
  ResumeTitles,
  StyledHeaderMargin,
  Warning,
} from '../Styled';
import ResumeInputs from './ResumeInputs';
import { PROFILE_GET_REQUEST } from '../../../reducers/profile';
import ResumeGender from './ResumeGender';

const Toggle1 = styled(ToggleOff)`
  width: 30px;
  color: gray;
  cursor: pointer;
`;

const Toggle2 = styled(ToggleOn)`
  width: 30px;
  color: #f5df4d;
  cursor: pointer;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 200px;
  height: 35px;
  border-radius: 5px;
  background-color: #fdfdfd;
  border: 1px solid silver;
  margin-bottom: 5px;
  padding-left: 15px;

  &:focus {
    outline: none;
  }
`;
export default function ResumeBasic({
  onChange,
  bookMark,
  bookMark1,
  setForm,
  form,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [img, setImage] = useState(
    'https://www.namethedish.com/wp-content/uploads/2020/03/img-placeholder-portrait.png.webp'
  );

  const onChangeHandler2 = useCallback(
    (e) => {
      const event = { target: { name: 'birth', value: e } };
      if (event.target.name === 'birth') {
        setForm((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }
    },
    [setForm]
  );

  useEffect(() => {
    if (profile.profileGetData) {
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      if (profileTemp.birth === null) {
        alert('이력서에 필요한 추가정보를 입력해주세요.(성별/연락처/생년월일)');
        history.push('/profile/individual/modify');
      }
      setForm((p) => ({
        ...p,
        name: profileTemp.name,
        contact: profileTemp.contact,
        gender: profileTemp.gender,
        birth: new Date(
          profileTemp.birth[0],
          profileTemp.birth[1],
          profileTemp.birth[2]
        ),
      }));
    }
  }, [profile.profileGetData, setForm, history]);

  useEffect(() => {
    if (user.me === null) {
      return;
    }
    dispatch({ type: PROFILE_GET_REQUEST, me: user.me });
  }, [user.me, dispatch]);

  const onChange2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('files', e.target.files[0]);

    const url = await axios
      .post('/file', formData)
      .then((res) => res.data.files[0].url)
      .catch(
        () =>
          'https://www.namethedish.com/wp-content/uploads/2020/03/img-placeholder-portrait.png.webp'
      );
    if (file === undefined) {
      setImage(img);
    } else if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      alert('이미지 파일만 등록할 수 있습니다.');
      setImage(img);
    } else if (file.size > 1024 * 1024 * 10) {
      alert('1MB 이하 이미지만 가능합니다.');
      setImage(img);
    } else {
      setImage(url);
      form.resumeImage = url;
    }
  };
  const hiddenFileInput = React.useRef(null);
  const handleClick = async () => {
    hiddenFileInput.current.click();
  };

  return (
    <form>
      <div style={{ marginBottom: '40px' }}>
        <h5 style={{ display: 'inline-block' }}>기본 정보</h5>
        <Warning>
          입력하신 정보는 절대 사용자 동의 없이 외부로 유출, 공개되지 않습니다.
        </Warning>
        <span>
          <div
            style={{
              position: 'absolute',
              border: 'none',
              background: 'none',
              right: '9px',
              top: '9px',
            }}
          >
            {bookMark1 ? <Private>공개</Private> : <Private>비공개</Private>}
            {bookMark1 ? (
              <Toggle2
                onClick={() => bookMark()}
                onChange={(e) => onChange(e)}
              />
            ) : (
              <Toggle1
                onClick={() => bookMark()}
                onChange={(e) => onChange(e)}
              />
            )}
          </div>
        </span>
        <div
          style={{
            width: '200px',
            height: '230px',
            margin: '25px auto',
          }}
        >
          <ResumeImg
            onClick={handleClick}
            src={img}
            alt="resumeImg"
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={onChange2}
            style={{ display: 'none' }}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <StyledHeaderMargin style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ResumeInputs
              itemName={'이름'}
              flex={'1 0 200px'}
              onChange={(e) => onChange(e)}
              name={'name'}
              value={form?.name || ''}
            />
            <div style={{ width: '205px' }}>
              <ResumeTitles>&nbsp;성별</ResumeTitles>
              <ResumeGender
                onChange={(e) => onChange(e)}
                name={'gender'}
                value={form?.gender || ''}
              />
            </div>
          </StyledHeaderMargin>
        </div>
        <div style={{ display: 'flex' }}>
          <ResumeInputs
            itemName={'연락처'}
            basic
            onChange={(e) => onChange(e)}
            name={'contact'}
            value={form?.contact || ''}
          />
          <div
            style={{
              marginRight: '5px',
              flex: '0 0 200px',
            }}
          >
            <ResumeTitles>&nbsp;생년월일</ResumeTitles>
            <div className="customDatePickerWidth">
              <StyledDatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                selected={form?.birth}
                onChange={(e) => onChangeHandler2(e)}
                peekMonthDropdown
                showYearDropdown
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <ResumeInputs
            itemName={'주소'}
            basic
            onChange={(e) => onChange(e)}
            name={'address'}
            value={form?.address || ''}
          />
        </div>
        <ResumeInputs
          itemName={'Github'}
          sns
          onChange={(e) => onChange(e)}
          name={'githubUrl'}
          value={form?.githubUrl || ''}
        />
        <ResumeInputs
          itemName={'기술 블로그'}
          sns
          onChange={(e) => onChange(e)}
          name={'blogUrl'}
          value={form?.blogUrl || ''}
        />
      </div>
    </form>
  );
}
