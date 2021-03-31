import axios from 'axios';

export default function hello() {
  return null;
}

export const loginInterceptor = (refresh) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return new Promise((resolve, reject) => {
        const originalReq = error.config;
        if (
          error.response.status === 403 &&
          error.config &&
          !error.config.__isRetryRequest
        ) {
          originalReq.__isRetryRequest = true;
          const res = fetch('http://localhost:8081/api/auth/reissue', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${refresh['REFRESH_TOKEN']}`,
            },
            redirect: 'follow',
          })
            .then((response) => response.json())
            .then((response) => {
              if (response.status === 403) {
                throw new Error('403');
              }
              console.log('response:');
              console.log(response);
              axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${response.accessToken}`;
              return axios(originalReq);
            })
            .catch((err) => {
              reject(err);
            });
          resolve(res);
        }
      });
    }
  );
};
