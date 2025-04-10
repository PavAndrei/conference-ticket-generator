import { validator } from "../utils/validator";
import { validatorConfig } from "../constants/validatorConfig";

export const validateField = (name, value, type = "text") => {
  if (type === "file") {
    const file = value;
    if (!file) return "File is required";

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 500 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Only JPG and PNG formats are allowed";
    }

    if (file.size > maxSize) {
      return "File size must not exceed 500KB";
    }

    return null;
  }

  const fakeInput = [{ name, value }];
  const fieldConfig = { [name]: validatorConfig[name] };
  const result = validator(fakeInput, fieldConfig);
  return result[name] || null;
};
