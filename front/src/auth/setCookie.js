export default function setCookie(name, value, type) {
  const exDate = new Date();
  const milliSec = type === 'access' ? 1800000 : 1209600000;
  exDate.setMilliseconds(exDate + milliSec);
  const cookie =
    escape(value) +
    (milliSec == null ? '' : ';path=/;expires=' + exDate.toUTCString());
  document.cookie = name + '=' + cookie;
}

//
// access-validity-in-ms: 1800000
// refresh-validity-in-ms: 1209600000
