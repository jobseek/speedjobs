import React, { useState } from 'react';
import axios from 'axios';
import { MyImage, ProfileImg } from '../Styled';

export default function ProfileImage({ onChange }) {
  const [img, setImage] = useState(
    'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  );

  const onChange2 = async (e) => {
    const formData = new FormData();
    formData.append('files', e.target.files[0]);
    console.log(formData);
    console.log(e.target.files[0]);

    const url = await axios
      .post('/file', formData)
      .then((res) => res.data.files[0].url)
      .catch(
        (error) =>
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
      );
    console.log(url);
    setImage(url);
    // e.target.name = 'picture';
    e.target = { name: 'picture', value: url.toString() };
    console.log(e);
    onChange(e);
    // const temp = { e: { target: { name: 'picture', value: url } } };
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
        onChange={onChange2}
        style={{ display: 'none' }}
      />
    </div>
  );
}
