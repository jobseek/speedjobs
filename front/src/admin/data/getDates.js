import moment from 'moment';

export default function getDates() {
  const days = () => {
    const ret = [];
    for (let i = 0; i < 5; i++) {
      const day = moment().subtract(i, 'days').format('DD');
      ret.push(day);
    }
    return ret;
  };
  return days();
}

export function getFullDates() {
  const days = () => {
    const ret = [];
    for (let i = 0; i < 5; i++) {
      const day = moment().subtract(i, 'days').format('MM-DD');
      ret.push(day);
    }
    return ret;
  };
  return days();
}
