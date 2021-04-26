import React, { useState } from 'react';
import axios from 'axios';
import { MyImage, ProfileImg } from '../Styled';

export default function ProfileImage({ onChange, value }) {
  const [img, setImage] = useState(
    'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  );

  console.log(value.url);

  const onChange2 = async (e) => {
    const file = e.target.files[0];
    console.log('=== 이미지 파일 정보 ===', file);

    // FormData 객체 생성해서 이미지 파일을 저장 ===> 이미지 미리보기
    const formData = new FormData();
    formData.append('files', e.target.files[0]);
    console.log('=== formData ===', formData);

    // s3 API 호출
    const url = await axios
      .post('/file', formData)
      .then((res) => res.data.files[0].url)
      .catch(
        () =>
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
      );

    /**
     * 이미지 업로드 조건
     * 1. 이미지를 선택하지 않을 경우
     * 2. 이미지 형식이 아닌 파일을 선택항 경우
     * 3. 이미지 용량을 초과한 경우
     * 4. 위의 조건을 모두 만족하지 않을 경우 이미지 업로드 성공
     */
    if (file === undefined) {
      console.log('=== 이미지 업로드 실패(파일 미선택) ===');
      setImage(img);
    } else if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      alert('이미지 파일만 등록할 수 있습니다.');
      console.log('=== 이미지 업로드 실패(잘못된 파일 형식) ===');
      setImage(img);
    } else if (file.size > 1024 * 1024) {
      alert('1MB 이하 이미지만 가능합니다.');
      console.log('=== 이미지 업로드 실패(용량 초과) ===');
      setImage(img);
    } else {
      console.log('=== 이미지 업로드 성공 ===');
      setImage(url);
      e.target = { name: 'picture', value: url.toString() };
      onChange(e);
    }
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = async () => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <ProfileImg>
        <MyImage
          onClick={handleClick}
          onChange={onChange}
          src={value}
          alt="profile"
          style={{
            cursor: 'pointer',
          }}
        />
      </ProfileImg>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={onChange2}
        style={{ display: 'none' }}
        accept="image/gif, image/jpeg, image/png"
      />
    </div>
  );
}
