import { createContext, useEffect, useRef, useState } from "react";

import { validator } from "../utils/validator";
import { validatorConfig } from "../constants/validatorConfig";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [hasChanged, setHasChanged] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [inputs, setInputs] = useState([
    { name: "file", description: "Upload Avatar", type: "file", file: null },
    {
      name: "name",
      description: "Full Name",
      type: "text",
      placeholder: "John Doe",
      value: "",
    },
    {
      name: "email",
      description: "Email Address",
      type: "email",
      placeholder: "example@email.com",
      value: "",
    },
    {
      name: "git",
      description: "GitHub Username",
      type: "text",
      placeholder: "@yourusername",
      value: "",
    },
  ]);

  const inputRefs = useRef({});

  const onChange = (e) => {
    const { name, type, value, files } = e.target;

    setHasChanged(true);

    setInputs((prevInputs) =>
      prevInputs.map((inp) => {
        if (inp.name === name) {
          if (type === "file") {
            const file = files[0];

            if (file) {
              const preview = URL.createObjectURL(file);
              return { ...inp, file, preview };
            }

            return { ...inp, file: null, preview: null };
          } else {
            return { ...inp, value: value.trim() };
          }
        }
        return inp;
      })
    );

    // Валидация по типу
    if (type === "file") {
      const file = files[0];
      const error = validateField(name, file, "file");
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    } else {
      const error = validateField(name, value.trim());
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const data = {};
    inputs.forEach((inp) => {
      data[inp.name] = inp.type === "file" ? inp.file : inp.value;
    });
    setFormData(data);
    setIsFormFilled(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const preview = URL.createObjectURL(droppedFile);

      const fakeEvent = {
        target: {
          name,
          type: "file",
          files: [droppedFile],
          file: droppedFile,
          preview,
        },
      };

      onChange(fakeEvent);

      if (inputRefs.current[name]) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFile);
        inputRefs.current[name].files = dataTransfer.files;
      }
    }
  };

  const removeImage = (name) => {
    setInputs((prevInputs) =>
      prevInputs.map((inp) =>
        inp.name === name ? { ...inp, file: null, preview: null } : inp
      )
    );

    if (inputRefs.current[name]) {
      inputRefs.current[name].value = "";
    }

    const error = validateField(name, null, "file");
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const changeImage = (name) => {
    if (inputRefs.current[name]) {
      inputRefs.current[name].click();
    }
  };

  const validate = () => {
    const errors = validator(inputs, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateField = (name, value, type = "text") => {
    if (type === "file") {
      const file = value;
      if (!file) return "File is required";

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 500 * 1024; // 500 KB

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

  return (
    <DataContext.Provider
      value={{
        inputs,
        errors,
        formData,
        isFormFilled,
        validate,
        onChange,
        onSubmit,

        inputRefs,
        isDragActive,
        setIsDragActive,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        removeImage,
        changeImage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
