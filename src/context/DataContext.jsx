import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);
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

  const onChange = (e) => {
    setInputs((prevInputs) =>
      prevInputs.map((inp) => {
        if (e.target.name === inp.name) {
          if (e.target.type === "file") {
            return { ...inp, file: e.target.files[0] };
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

  return (
    <DataContext.Provider
      value={{ inputs, onChange, onSubmit, isFormFilled, formData }}
    >
      {children}
    </DataContext.Provider>
  );
};
