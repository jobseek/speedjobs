import React from 'react';
import styled from 'styled-components';
import { SlashCircle } from 'react-bootstrap-icons';

const Container = styled.div`
  margin-top: 150px;
`;

const InsideContainer = styled.div`
  border: 1px solid #eee;
  padding: 100px 0;
`;

export default function NotFound(props) {
  return (
    <>
      <Container>
        <InsideContainer className={'container'}>
          <div style={{ marginBottom: '20px' }}>
            <SlashCircle></SlashCircle>
          </div>
          페이지를 찾을수 없습니다
        </InsideContainer>
      </Container>
    </>
  );
}
