import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import { Info } from "../../icons/Info";

import styles from "./styles.module.css";

export const TextInput = ({ description, type, placeholder, name }) => {
  const { onChange, errors } = useContext(DataContext);

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
      {errors[name] ? (
        <div className={styles.error}>
          <Info isError={true} />
          <p className={styles.errorText}>{errors[name]}</p>
        </div>
      ) : null}
    </label>
  );
};
