export const signInvalidation = (email, password, rePassword, role, name) => {
  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    throw new Error("입력 값을 확인해주세요.");
  }
};
