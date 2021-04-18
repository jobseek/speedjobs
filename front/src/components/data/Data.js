import React from 'react';
import axios from 'axios';

export const postMember = async (data) => {
  axios
    .post('http://localhost:8080/SignUp', data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default function Data(props) {
  return (
    <>
      <div>hello</div>
    </>
  );
}
