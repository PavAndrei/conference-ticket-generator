import { createContext, useRef, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
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
    setInputs((prevInputs) =>
      prevInputs.map((inp) => {
        if (e.target.name === inp.name) {
          if (e.target.type === "file") {
            const file = e.target.files[0];
            const preview = URL.createObjectURL(file);
            return { ...inp, file, preview };
          } else {
            return { ...inp, value: e.target.value };
          }
        } else {
          return inp;
        }
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
  };

  const changeImage = (name) => {
    if (inputRefs.current[name]) {
      inputRefs.current[name].click();
    }
  };

  return (
    <DataContext.Provider
      value={{
        inputs,
        onChange,
        onSubmit,
        isFormFilled,
        formData,
        isDragActive,
        setIsDragActive,
        inputRefs,
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
