import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToTop(props) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <></>;
}
