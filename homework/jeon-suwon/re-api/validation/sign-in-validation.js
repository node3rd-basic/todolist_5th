import { CustomError } from "../common/custom.error.js";

export const signUpvalidation = (email, password, rePassword, role, name) => {
  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    throw new CustomError("입력 값을 확인해주세요.", 409);
  }
};
