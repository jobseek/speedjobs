export default function registerCheck(company, check) {
  const {
    name,
    email,
    password,
    contact,
    companyName,
    homepage,
    registrationNumber,
  } = company;
  const { confirmPassword } = check;

  const nameReg = /^[a-zA-Z가-힣]{2,15}$/;
  const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwdReg = /^[a-zA-Z0-9_\-!#$%.]{8,20}$/;
  const contactReg = /^\d{2,3}-\d{3,4}-\d{4}$/;
  const companyNameReg = /^[a-zA-Z가-힣]{2,30}$/;
  const homepageReg = /^(http||https):\/\//;
  const regiNumReg = /^\d{3}-\d{2}-\d{5}$/;

  return {
    name: nameReg.test(name),
    email: emailReg.test(email),
    password: pwdReg.test(password),
    contact: contactReg.test(contact),
    companyName: companyNameReg.test(companyName),
    homepage: homepageReg.test(homepage),
    registrationNumber: regiNumReg.test(registrationNumber),
    repeatPassword: confirmPassword === password,
  };
}
