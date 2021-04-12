export default function signUpCheck(form, check) {
  const { name, email, password } = form;
  const { confirmPassword } = check;
  const idReg = /^[a-zA-Z가-힣]{2,15}$/;
  const pwdReg = /^[a-zA-Z0-9_\-!#$%.]{8,20}$/;
  const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return {
    name: idReg.test(name),
    password: pwdReg.test(password),
    email: emailReg.test(email),
    repeatPassword: confirmPassword === password,
  };
}
