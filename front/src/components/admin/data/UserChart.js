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
      <ResponsiveBar
        width={500}
        height={500}
        data={data}
        keys={['user']}
        indexBy={'date'}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band,round:true' }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'date',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 1,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'user',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      ></ResponsiveBar>
    </>
  );
}
