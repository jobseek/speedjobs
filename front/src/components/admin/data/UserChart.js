import React from 'react';
import { ResponsiveBar } from 'nivo';

const data = [
  {
    date: '4.14',
    user: 10,
  },
  {
    date: '4.15',
    user: 200,
  },
  {
    date: '4.16',
    user: 300,
  },
  {
    date: '4.17',
    user: 330,
  },
];

export default function UserChart(props) {
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveBar
          data={data}
          margin={{ top: 15, bottom: 25, left: 50 }}
          keys={['user']}
          indexBy={'date'}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band,round:true' }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            legend: 'date',
            legendPosition: 'center',
            legendOffset: 20,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            legend: 'user',
            legendPosition: 'center',
            legendOffset: -30,
          }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        ></ResponsiveBar>
      </div>
    </>
  );
}
