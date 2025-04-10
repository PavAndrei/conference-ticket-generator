import { createContext, useRef, useState } from "react";

import { validator } from "../utils/validator";

import { validatorConfig } from "../constants/validatorConfig";
import { inputsInitialState } from "../constants/inputsInitialState";
import { validateField } from "../utils/validateField";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [inputs, setInputs] = useState(inputsInitialState);

  const inputRefs = useRef({});

  const onChange = (e) => {
    const { name, type, value, files } = e.target;

    const selectedFile = type === "file" ? files?.[0] : null;

    setInputs((prevInputs) =>
      prevInputs.map((inp) => {
        if (inp.name === name) {
          if (type === "file") {
            if (!selectedFile) {
              return inp;
            }

            const preview = URL.createObjectURL(selectedFile);
            return { ...inp, file: selectedFile, preview };
          } else {
            return { ...inp, value: value.trim() };
          }
        }
        return inp;
      })
    );

    if (type === "file") {
      if (selectedFile) {
        const error = validateField(name, selectedFile, "file");
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
      }
    } else {
      const trimmed = value.trim();
      const error = validateField(name, trimmed);
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

  const resetForm = () => {
    setInputs(inputsInitialState);

    setFormData(null);
    setIsFormFilled(false);
    setErrors({});

    Object.keys(inputRefs.current).forEach((name) => {
      if (inputRefs.current[name]) {
        inputRefs.current[name].value = "";
      }
    });
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
        resetForm,

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
