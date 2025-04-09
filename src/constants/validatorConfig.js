export const validatorConfig = {
  file: {
    isRequired: { message: "File is required." },
    isValidType: { message: "File must be in JPG or PNG format." },
    isValidSize: { message: "File size must not exceed 500KB." },
  },
  name: {
    isRequired: { message: "Name is required." },
    isTrimmed: { message: "Name must not start or end with spaces." },
    isCapitalized: { message: "Name must start with a capital letter." },
    isOnlyLetters: { message: "Name can contain only English letters." },
  },
  email: {
    isRequired: { message: "Email is required." },
    isEmail: { message: "Email is invalid." },
  },
  git: {
    isRequired: { message: "GitHub username is required." },
    startsWithAt: { message: "GitHub username must start with '@'." },
    hasNoSpaces: { message: "GitHub username must not contain spaces." },
  },
};
