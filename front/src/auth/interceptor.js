import axios from 'axios';
import address from './address';

export default function hello() {
  return null;
}

export const loginInterceptor = (
  refresh,
  removeRefresh,
  prevIDS,
  dispatch,
  needLogin
) => {
  axios.interceptors.request.eject(prevIDS.request);
  axios.interceptors.response.eject(prevIDS.response);
  const requestInterceptorConfig = (config) => {
    if (config.url === '/auth/logout' && !config.headers._Retry) {
      config.headers['Authorization'] = `Bearer ${refresh['REFRESH_TOKEN']}`;
      return config;
    }
    // if (config.headers['Authorization'] === undefined && !needLogin) {
    //   console.log('?');
    //   config.headers['Authorization'] = `Bearer ${refresh['ACCESS_TOKEN']}`;
    //   return config;
    // }
    return config;
  };
  const responseInterceptorError = (error) => {
    return new Promise((resolve, reject) => {
      const originalReq = error.config;
      if (
        (error.response.status === 403 || error.response.status === 500) &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        originalReq.__isRetryRequest = true;
        fetch(`http://${address()}:8081/api/auth/reissue`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${refresh['REFRESH_TOKEN']}`,
          },
          redirect: 'follow',
        })
          .then((response) => {
            if (!response.ok) throw new Error('유저정보 불러오기 실패');
            return response.json();
          })
          .then((response) => {
            originalReq.headers[
              'Authorization'
            ] = `Bearer ${response.accessToken}`;
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${response.accessToken}`;
            resolve(axios(originalReq));
          })
          .catch((err) => {
            reject(error);
          });
      }
    });
  };
  const IDS = { request: 0, response: 0 };
  IDS.request = axios.interceptors.request.use(
    requestInterceptorConfig,
    (error) => {}
  );
  IDS.response = axios.interceptors.response.use((response) => {
    return response;
  }, responseInterceptorError);
  return IDS;
};
