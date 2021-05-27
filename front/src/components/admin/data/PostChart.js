import React, { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

function PostChart({ postData }) {
  // labels ,지난 7일 날짜,
  const [data, set] = useState();
  const initData = useMemo(() => {
    return {
      labels: [
        moment().subtract(4, 'days').format('MM-DD'),
        moment().subtract(3, 'days').format('MM-DD'),
        moment().subtract(2, 'days').format('MM-DD'),
        moment().subtract(1, 'days').format('MM-DD'),
        moment().format('MM-DD'),
      ],
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
    };
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

  useEffect(() => {
    if (postData.post) {
      console.log(postData);
      set({
        ...initData,
        datasets: [
          {
            label: '커뮤니티 글 등록 현황',
            data: postData.post,
            backgroundColor: 'rgb(159,159,159)',
          },
          {
            label: '공고 글 등록 현황',
            data: postData.recruit,
            backgroundColor: 'rgba(242, 212, 17)',
          },
        ],
      });
    }
  }, [postData, initData]);
  return (
    <>
      <Bar data={data ?? initData} options={options} />
    </>
  );
}

export default React.memo(PostChart);
