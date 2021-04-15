import React from 'react';
import Report from '../component/Report';
import InfoCard from '../component/InfoCard';
import UserChart from '../data/UserChart';
import { Container } from '../component/adminStyled';

export default function AdminMain(props) {
  return (
    <>
      <Container>
        <Report></Report>
      </Container>
      <Container right style={{ overflow: 'scroll' }}>
        <InfoCard index={0}>
          <UserChart />
        </InfoCard>
        <InfoCard index={1}>
          <UserChart></UserChart>
        </InfoCard>
      </Container>
    </>
  );
}
