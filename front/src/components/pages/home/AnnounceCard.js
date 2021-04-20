import React, { useState } from 'react';
import Cards from '../../components/Cards';

export default function AnnounceCard() {
  const [list] = useState([
    {
      title: '네이버 공채 모집',
      subtitle: '2021년 하반기 네이버 공채를 모집합니다.',
    },
    {
      title: '카카오 공채 모집',
      subtitle: '2021년 하반기 카카오 공채를 모집합니다.',
    },
    {
      title: '라인 경력직 상시모집',
      subtitle: '2021년 하반기 라인 경력직을 모집합니다.',
    },
    {
      title: '쿠팡 경력직 모집',
      subtitle: '2021년 하반기 쿠팡 경력직을 모집합니다.',
    },
  ]);
  const Arr = list.map((c) => {
    return (
      <div className="col-md-3 mb-3 col-sm-6">
        <Cards title={c.title} subTitle={c.subtitle} />
      </div>
    );
  });
  return <div className="row">{Arr}</div>;
}
