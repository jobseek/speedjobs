import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import setCookie from '../auth/setCookie';

export default function SocialLogin(props) {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setCookie('REFRESH_TOKEN', query.get('token'));
    history.push('/');
  }, [history, location]);

  return (
    <>
      <div></div>
    </>
  );
}
