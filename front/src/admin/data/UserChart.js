import React, { useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

function UserChart({ userData }) {
  const [chartData, setChartData] = useState({});
  const initData = useMemo(
    () => ({
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(242, 212, 17)',
        'rgb(159,159,159)',
        'rgb(250,123,123)',
      ],
    }),
    []
  );
  const data = useMemo(
    () => ({
      labels: ['기존회원', '기업회원', '승인대기'],
      datasets: [],
    }),
    []
  );
  useEffect(() => {
    if (userData === undefined || userData.length === 0) return;
    const datasets = { ...initData, data: userData };
    const fullData = { ...data, datasets: [datasets] };
    setChartData(fullData);
  }, [userData, data, initData]);
  // data 는 기업회원 기업회원 그리고 승인대기 회원 순으로 작성해야 합니다
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <Doughnut
          data={chartData}
          height={50}
          width={100}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </>
  );
}

export default React.memo(UserChart);
