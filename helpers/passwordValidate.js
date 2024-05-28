function validatePassword(password) {
  const capitalRegex = /[A-Z]/;
  const smallRegex = /[a-z]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const numberRegex = /[0-9]/;

  const hasCapital = capitalRegex.test(password);
  const hasSmall = smallRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const isLengthValid = password.length >= 8;

  return hasCapital && hasSmall && hasSpecialChar && hasNumber && isLengthValid;
}

module.exports = { validatePassword };
