import React from 'react';
import Cards from '../../components/Cards';

export default function AnnounceCard(props) {
  const AnnounceArr = ['네이버', '카카오', '구글', '라인', '쿠팡', '배민'];
  const ArrToCards = AnnounceArr.map((iter) => {
    return (
      <div className="col-md-4 mb-3 col-sm-6" key={iter}>
        <Cards title={iter} subTitle={iter + ' sub'}>
          {iter + ' content'}
        </Cards>
      </div>
    );
  });

  return <div className="row">{ArrToCards}</div>;
}
