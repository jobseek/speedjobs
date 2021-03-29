import React from 'react';
// import Cards from '../../components/Cards';
import TitleCardsSm from './TitleCardsSm';
import Cards from '../../components/Cards';

export default function TitleCards(props) {
  return (
    <div className="row">
      <div className="col-sm-12 col-lg-6 p-3 mb-3">
        <Cards title="title" subTitle="subtitle" height="1">
          hello
        </Cards>
      </div>
      <div className="col-sm-12 col-lg-6 p-3">
        <TitleCardsSm></TitleCardsSm>
      </div>
    </div>
  );
}
