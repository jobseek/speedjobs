export default function moreString(str, num) {
  if (str === undefined) return '';
  let ret = str;
  if (str.length > num) {
    ret = str.substr(0, num);
    ret += '...';
  }
  return ret;
}
