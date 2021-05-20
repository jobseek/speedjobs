import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const List = styled.li`
  display: inline-block;
  margin-right: 10px;
  width: 100%;
  transition: background-color 1s linear;

  &:hover {
    background-color: #eee;
  }
`;

export default function TitleCards({ title, list }) {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    if (typeof list === 'object') {
      setInfo([...list]);
    }
  }, [list]);

  const infoArr = info.map((item, index) => (
    <div key={index}>
      <List>
        {item.title}{' '}
        <span style={{ color: 'gray', fontSize: '10px' }}>{item.date}</span>
      </List>
    </div>
  ));

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
        <h3
          style={{
            fontWeight: 700,
            letterSpacing: '1px',
            marginBottom: '10px',
          }}
        >
          {title}
        </h3>
        <ul style={{ listStyle: 'none', padding: '0' }}>{infoArr}</ul>
      </div>
    </div>
  );
}
