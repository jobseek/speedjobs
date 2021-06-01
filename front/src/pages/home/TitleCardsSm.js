import React from 'react';
import Cards from '../../components/Cards';
import logo512 from '../../components/img/logo512.png';

export default function TitleCardsSm() {
  return (
    <>
      <div className="row mb-3">
        <div className="col-6">
          <Cards title={null}>
            <img src={logo512} alt="logo512" style={{ width: '40%' }} />
          </Cards>
        </div>
        <div className="col-6">
          <Cards title={null}>
            <img src={logo512} alt="logo512" style={{ width: '40%' }} />
          </Cards>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <Cards title={null}>
            <img src={logo512} alt="logo512" style={{ width: '40%' }} />
          </Cards>
        </div>
        <div className="col-6">
          <Cards title={null}>
            <img src={logo512} alt="logo512" style={{ width: '40%' }} />
          </Cards>
        </div>
      </div>
    </>
  );
}
