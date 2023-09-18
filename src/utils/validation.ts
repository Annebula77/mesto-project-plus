import validator from "validator";

const validateInput = (value: string, lengthLimit: number) => {
  const regex = /^[a-zA-Z0-9 .,!?()'"-]+$/;
  return validator.isLength(value, { min: 2, max: lengthLimit }) && validator.matches(value, regex);
};

export const nameValidator = {
  validator: (value: string) => validateInput(value, 30),
  message: 'Invalid input in name. Only letters, numbers, spaces, and certain punctuations are allowed, and the length should not exceed 30 characters.'
};

export const aboutValidator = {
  validator: (value: string) => validateInput(value, 200),
  message: 'Invalid input in about. Only letters, numbers, spaces, and certain punctuations are allowed, and the length should not exceed 200 characters.'
};