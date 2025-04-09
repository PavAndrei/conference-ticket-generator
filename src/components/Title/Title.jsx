import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import styles from "./styles.module.css";

export const Title = () => {
  const { formData } = useContext(DataContext);

  if (formData?.name) {
    return (
      <h1 className={styles.title}>
        Congrats, <span className={styles.colored}>{formData.name}</span>!
        <span className={styles.shifted}>Your ticket is ready.</span>
      </h1>
    );
  }

  return (
    <h1 className={styles.title}>
      Your journey to Coding Conf
      <span className={styles.shifted}>2025 Starts Here!</span>
    </h1>
  );
};
