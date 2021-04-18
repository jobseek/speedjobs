import React, { useState } from 'react';
import axios from 'axios';

export default function ProfileImage(props) {
  const [item, setItem] = useState({
    selectedFiled: null,
  });

  const handleFileInput = (e) => {
    setItem({ selectedFiled: e.target.files[0] });
  };

  const handlePost = () => {
    const formData = new FormData();
    formData.append('file', item.selectedFiled);

    return axios
      .patch('/user/update/member/1', formData)
      .then((res) => {
        alert('성공');
      })
      .catch((err) => {
        alert('실패');
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={(e) => handleFileInput(e)} />
      <button type="button" onClick={handlePost} />
    </div>
  );
}
