import React from 'react';

export default function TitleCards() {
  return (
    <div className="col-sm-12 col-lg-6 p-3 mb-3">
      <div
        style={{
          border: '1px solid rgba(0,0,0,.125)',
          height: '100%',
          borderRadius: '15px',
          padding: '10px 10px',
        }}
      >
        <h3 style={{ fontWeight: 700, letterSpacing: '1px' }}>공고일정</h3>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <div>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              네이버
            </li>
            <span style={{ color: 'gray' }}>2021-04-20 ~ 2021-05-10</span>
          </div>
          <div>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              카카오
            </li>
            <span style={{ color: 'gray' }}>2021-04-20 ~ 2021-05-10</span>
          </div>
          <div>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              라인
            </li>
            <span style={{ color: 'gray' }}>2021-04-20 ~ 2021-05-10</span>
          </div>
          <div>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              쿠팡
            </li>
            <span style={{ color: 'gray' }}>2021-04-20 ~ 2021-05-10</span>
          </div>
          <div>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              배달의 민족
            </li>
            <span style={{ color: 'gray' }}>2021-04-20 ~ 2021-05-10</span>
          </div>
        </ul>
      </div>
    </div>
  );
}
