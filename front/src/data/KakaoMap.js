import React, { useEffect } from 'react';
import styled from 'styled-components';

const Maps = styled.div`
  border-radius: 27px;
  width: 100%;
  height: 300px;
`;

function KakaoMap({ position = [37.506502, 127.053617], address, location }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=eecba215264581da2a246aed399a5b72&libraries=services';
    document.body.appendChild(script);
    script.onload = () => {
      /* eslint-disable */
      kakao.maps.load(async () => {
        const container = document.getElementById('kakaoMap');
        const geocoder = new kakao.maps.services.Geocoder();
        const options = {
          center: new kakao.maps.LatLng(position[0], position[1]),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        let coords = 0;
        await new Promise((resolve, reject) => {
          if (address !== '') {
            geocoder.addressSearch(address, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                resolve();
              }
              reject();
            });
          }
        });
        const marker = new kakao.maps.Marker({
          position: coords !== undefined ? coords : map.getCenter(),
        });
        if (coords !== undefined) {
          map.setCenter(coords);
          location([coords.La, coords.Ma]);
        }
        marker.setMap(map);
      });
    };
    /* eslint-enable */
  }, [position, address, location]);

  return (
    <>
      <Maps id={'kakaoMap'} />
    </>
  );
}

export default React.memo(KakaoMap);
