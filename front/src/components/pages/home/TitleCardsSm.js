import React from 'react';
import Cards from '../../components/Cards';

export default function TitleCardsSm(props) {
  return (
    <>
      <div className="row mb-3">
        <div className="col-6">
          <Cards title="title" subTitle="subtitle">
            hello
          </Cards>
        </div>
        <div className="col-6">
          <Cards title="title" subTitle="subtitle">
            hello
          </Cards>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <Cards title="title" subTitle="subtitle">
            hello
          </Cards>
        </div>
        <div className="col-6">
          <Cards title="title" subTitle="subtitle">
            hello
          </Cards>
        </div>
      </div>
    </>
  );
}
