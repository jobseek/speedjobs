import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MyImage, ProfileImg } from '../Styled';

const Button = styled.div``;

export default function ProfileImage2(props) {
  const [img, setImage] = useState(
    'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  );
  const [img2, setImage2] = useState(null);

  const onChange2 = (e) => {
    console.log('hello');
    setImage2(e.target.files[0]);
  };

  const onChange = async (e) => {
    const formData = new FormData();
    formData.append('files', e.target.files[0]);
    console.log(formData);
    console.log(e.target.files[0]);
    // setImage(e.target.files[0]);
    // const reader = new FileReader();
    // reader.onload = (evt) => {
    //   setImage(evt.target.result);
    // };
    // if (e.target.files[0] !== undefined)
    //   reader.readAsDataURL(e.target.files[0]);
    const url = await axios
      .post('/file', formData)
      .then((res) => res.data.files[0].url)
      .catch(
        (error) =>
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
      );
    console.log(url);
    setImage(url);
  };

  const onClick2 = async () => {
    const formData = new FormData();
    formData.append('files', img2);
    // 서버의 upload API 호출
    console.log(formData);
    const url = await axios
      .post('/banner', formData)
      .then((res) => res.data.data[0].url)
      .catch((error) => console.error(error));
    console.log(url);
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
          src={img}
          alt="profile"
          style={{
            cursor: 'pointer',
          }}
        />
      </ProfileImg>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <input type="file" onChange={onChange2} />
      <Button onClick={onClick2}>제출</Button>
    </div>
  );
}
