import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import styles from "./styles.module.css";

export const TextInput = ({ description, type, placeholder, name }) => {
  const { onChange } = useContext(DataContext);

  return (
    <label className={styles.group}>
      <p className={styles.description}>{description}</p>
      <input
        onChange={(e) => onChange(e)}
        type={type}
        name={name}
        className={styles.input}
        placeholder={placeholder}
      />
    </label>
  );
};
