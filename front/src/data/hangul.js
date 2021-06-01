export default function hangul(kor) {
  const check = /[ㄱ-ㅎ|ㅏ-ㅣ가-힣]/;
  if (!kor.match(check)) {
    return kor;
  }
  const f = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const s = [
    'ㅏ',
    'ㅐ',
    'ㅑ',
    'ㅒ',
    'ㅓ',
    'ㅔ',
    'ㅕ',
    'ㅖ',
    'ㅗ',
    'ㅘ',
    'ㅙ',
    'ㅚ',
    'ㅛ',
    'ㅜ',
    'ㅝ',
    'ㅞ',
    'ㅟ',
    'ㅠ',
    'ㅡ',
    'ㅢ',
    'ㅣ',
    '',
  ];
  const t = [
    '',
    'ㄱ',
    'ㄲ',
    'ㄳ',
    'ㄴ',
    'ㄵ',
    'ㄶ',
    'ㄷ',
    'ㄹ',
    'ㄺ',
    'ㄻ',
    'ㄼ',
    'ㄽ',
    'ㄾ',
    'ㄿ',
    'ㅀ',
    'ㅁ',
    'ㅂ',
    'ㅄ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const ga = 44032;
  let fn = -1;
  let sn = 0;
  let tn = 0;
  if (kor.charCodeAt(0) > ga) {
    const uni = kor.charCodeAt(0) - ga;
    fn = parseInt(uni / 588, 10);
    sn = parseInt((uni - fn * 588) / 28, 10) || 0;
    tn = parseInt(uni % 28, 10);
  } else {
    sn = s.length - 1;
    tn = 0;
  }

  // return {
  //   f: f[fn],
  //   s: s[sn],
  //   t: t[tn],
  // };
  return (fn !== -1 ? f[fn] : kor) + s[sn] + t[tn];
}
