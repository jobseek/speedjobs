import React, { useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

function PostChart(props) {
  // labels ,지난 7일 날짜,
  const initData = useMemo(
    () => ({
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '커뮤니티 글 등록 현황',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgb(159,159,159)',
        },
        {
          label: '공고 글 등록 현황',
          data: [2, 3, 20, 5, 1, 4],
          backgroundColor: 'rgba(242, 212, 17)',
        },
      ],
    }),
    []
  );
  useEffect(() => {
    const today = new Date();
    console.log(`${today.getMonth() + 1}월${today.getDate()}일`);
  }, []);
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };
  return (
    <>
      <Bar data={initData} options={options} />
    </>
  );
}

export default React.memo(PostChart);
