import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import styles from "./styles.module.css";

export const Message = () => {
  const { formData } = useContext(DataContext);

  if (formData?.email) {
    return (
      <div>
        <p className={styles.text}>
          <span> We've emailed your ticket to</span>
          <span className={styles.colored}>{formData.email}</span> and will send
          updates in <span>the run up to the event.</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className={styles.text}>
        Secure your spot at next year's biggest coding conference
      </p>
    </div>
  );
};
