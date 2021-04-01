import axios from 'axios';

export default function hello() {
  return null;
}

export const loginInterceptor = (refresh, removeRefresh, prevIDS) => {
  axios.interceptors.request.eject(prevIDS.request);
  axios.interceptors.response.eject(prevIDS.response);
  const requestInterceptorConfig = (config) => {
    if (config.url === '/auth/logout' && !config.headers._Retry) {
      axios
        .get('/auth/logout', {
          headers: {
            Authorization: `Bearer ${refresh['REFRESH_TOKEN']}`,
            _Retry: true,
          },
        })
        .catch((error) => {
          // console.log('cannot connect sever');
        })
        .finally(() => {
          if (refresh) {
            removeRefresh('REFRESH_TOKEN');
            removeRefresh('ACCESS_TOKEN');
          }
        });
      return null;
    }
    return config;
  };
  const responseInterceptorError = (error) => {
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
            if (response.status === 403 || response.status === 500) {
              throw new Error(response.status);
            }
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
      reject(error);
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
