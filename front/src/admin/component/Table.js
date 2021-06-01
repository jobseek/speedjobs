import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  & > * {
    flex: 1;
  }
`;

const Data = styled.div`
  display: flex;
  margin: 3px 0;
  padding-bottom: 5px;
  & > * {
    flex: 1;
  }
`;

export default function Table({
  headers = ['test'],
  data = ['test'],
  linkText = 'testLink',
  link,
}) {
  return (
    <>
      <Container>
        <Header>
          {headers.map((header, index) => (
            <span key={index}>{header}</span>
          ))}
        </Header>
        {data.map((d, index) => (
          <Data key={index}>
            {d.map((ds, idx) => (
              <span key={idx}>{ds}</span>
            ))}
          </Data>
        ))}
        <div
          style={{
            textAlign: 'right',
            color: 'gray',
            fontWeight: 'lighter',
            fontSize: '10px',
          }}
          onClick={link}
        >
          {linkText}
        </div>
      </Container>
    </>
  );
}
