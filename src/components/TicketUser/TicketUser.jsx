import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import styles from "./styles.module.css";

import { GitHub } from "../../icons/GitHub";

export const TicketUser = () => {
  const { formData } = useContext(DataContext);

  return (
    <div className={styles.user}>
      <img
        className={styles.img}
        src={URL.createObjectURL(formData.file)}
        alt={formData.name}
      />
      <div className={styles.userdata}>
        <div className={styles.username}>{formData.name}</div>
        <div className={styles.usergit}>
          <GitHub />
          {formData.git}
        </div>
      </div>
    </div>
  );
};
