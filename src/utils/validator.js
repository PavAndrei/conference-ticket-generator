export const validator = (dataArray, config) => {
  const errors = {};

  dataArray.forEach(({ name, value, type, file }) => {
    const rules = config[name];
    if (!rules) return;

    for (const rule in rules) {
      const { message } = rules[rule];

      switch (rule) {
        case "isRequired":
          if (type === "file") {
            if (!file) {
              errors[name] = message;
              break;
            }
          } else {
            if (!value || (typeof value === "string" && value.trim() === "")) {
              errors[name] = message;
              break;
            }
          }
          break;

        case "isValidType":
          if (file && !["image/jpeg", "image/png"].includes(file.type)) {
            errors[name] = message;
          }
          break;

        case "isValidSize":
          if (file && file.size > 500 * 1024) {
            errors[name] = message;
          }
          break;

        case "isTrimmed":
          if (value !== value.trim()) {
            errors[name] = message;
          }
          break;

        case "isCapitalized":
          if (!/^[A-Z]/.test(value)) {
            errors[name] = message;
          }
          break;

        case "isOnlyLetters":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            errors[name] = message;
          }
          break;

        case "isEmail":
          if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
            errors[name] = message;
          }
          break;

        case "startsWithAt":
          if (!value.startsWith("@")) {
            errors[name] = message;
          }
          break;

        case "hasNoSpaces":
          if (/\s/.test(value)) {
            errors[name] = message;
          }
          break;

        default:
          break;
      }

      if (errors[name]) break; // Прерываем по первой ошибке
    }
  });

  return errors;
};
