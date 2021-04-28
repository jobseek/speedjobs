import React, { useState } from 'react';
import Cards from '../../components/Cards';

export default function AnnounceCard() {
  const [list] = useState([
    {
      title: '네이버 공채 모집',
      subtitle:
        '2021년 하반기 네이버 공채를 모집합니다. 2021년 하반기 네이버 공채를 모집합니다.',
      content: '작가님의 건강한 창작 활동을 응원합니다.',
    },
    {
      title: '카카오 공채 모집',
      subtitle: '2021년 하반기 카카오 공채를 모집합니다.',
      content: '작가님의 건강한 창작 활동을 응원합니다.',
    },
    {
      title: '라인 경력직 상시모집',
      subtitle: '2021년 하반기 라인 경력직을 모집합니다.',
      content: '작가님의 건강한 창작 활동을 응원합니다.',
    },
    {
      title: '쿠팡 경력직 모집',
      subtitle: '2021년 하반기 쿠팡 경력직을 모집합니다.',
      content: '작가님의 건강한 창작 활동을 응원합니다.',
    },
    {
      title: '배달의 민족 공채 모집',
      subtitle: '2021년 하반기 네이버 공채를 모집합니다.',
      content: '작가님의 건강한 창작 활동을 응원합니다.',
    },
    {
      title: '카카오 공채 모집',
      subtitle: '2021년 하반기 카카오 공채를 모집합니다.',
      content: '작가님의 건강한 창작 활동을 응원합니다.',
    },
  ]);
  const Arr = list.map((c, index) => {
    return (
      <div className="col-md-3 mb-2 col-sm-6" key={index}>
        <Cards title={c.title} subTitle={c.subtitle} content={c.content} />
      </div>
    );
  });
  return <div className="row">{Arr}</div>;
}
