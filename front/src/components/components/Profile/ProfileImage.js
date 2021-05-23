import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { MyImage, ProfileImg } from '../Styled';

const MyImageLoading = styled(MyImage)`
  border-top: 5px solid #f5df4d;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * 이미지 업로드 컴포넌트
 * 1. 상위 컴포넌트에서 onChange, value 상태를 가지고 온다.
 * 2. 프로필 이미지를 클릭했을 때 파일을 선택할 수 있는 창이 나오도록 한다. => input태그와 MyImage태그를 이용
 * 3. useRef를 이용해서 프로필 이미지를 클릭했을 때 즉, onClick(onButtonClick) 이벤트가 발생했을 때 input 태그를 클릭한 것처럼 만든다.
 * 4. 이미지 파일을 선택하게되면 input 태그에서 onChange(onFileChange) 이벤트가 발생한다.
 * 5. data라는 Formdata 객체를 생성해서 선택된 파일을 담아준다.
 * 6. axios를 통해 data를 api에 전송해서 결과값으로 url을 받아온다. 에러가 발생한 경우 기본 이미지가 나오도록한다.
 * 7. e.target에 name이 'picture'이고 value가 'url.toString'으로 저장한다.
 * 8. 마지막으로 MyImage태그의 onChange 이벤트가 발생하도록 하면 이미지 업로드 성공
 */

export default function ProfileImage({ onChange, value }) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onFileChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const data = new FormData();
    data.append('files', e.target.files[0]);

    const url = await axios
      .post('/file', data)
      .then((res) => res.data.files[0].url)
      .catch(
        () =>
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
      );

    if (file === undefined) {
      console.log('파일 미선택');
    } else if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      alert('이미지 파일만 등록할 수 있습니다.');
    } else if (file.size > 1024 * 1024 * 10) {
      alert('10MB 이하 이미지만 가능합니다.');
    } else {
      e.target = { name: 'picture', value: url.toString() };
      onChange(e);
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <ProfileImg>
        {!loading && (
          <MyImage
            onClick={onButtonClick}
            onChange={onChange}
            src={value}
            alt="profile"
            style={{
              cursor: 'pointer',
            }}
          />
        )}
        {loading && <MyImageLoading />}
      </ProfileImg>
    </div>
  );
}
