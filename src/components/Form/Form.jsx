import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import styles from "./styles.module.css";

import { TextInput } from "../TextInput/TextInput";
import { FileInput } from "../FileInput/FileInput";

export const Form = () => {
  const { inputs, onSubmit } = useContext(DataContext);

  return (
    <form className={styles.form}>
      {inputs.map((input) =>
        input.type === "file" ? (
          <FileInput
            key={input.name}
            description={input.description}
            type={input.type}
            file={input.file}
            name={input.name}
          />
        ) : (
          <TextInput
            key={input.name}
            description={input.description}
            type={input.type}
            placeholder={input.placeholder}
            value={input.value}
            name={input.name}
          />
        )
      )}
      <button onClick={onSubmit} className={styles.btn}>
        Generate My Ticket
      </button>
      <div className={styles.decor}></div>
    </form>
  );
};
