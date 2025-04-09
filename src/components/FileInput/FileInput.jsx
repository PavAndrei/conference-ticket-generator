import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import { Upload } from "../../icons/Upload";
import { Info } from "../../icons/Info";

import styles from "./styles.module.css";

export const FileInput = ({ description, type, name }) => {
  const { onChange } = useContext(DataContext);

  return (
    <label className={styles.group}>
      <p className={styles.description}>{description}</p>
      <input
        className={styles.fileInput}
        type={type}
        name={name}
        accept="image/*"
        onChange={onChange}
      />
      <div className={styles.uploadArea}>
        <div className={styles.uploadAreaIcon}>
          <Upload />
        </div>
        <p className={styles.uploadAreaText}>
          Drag and drop or click to upload
        </p>
      </div>
      <div className={styles.warning}>
        <span>
          <Info></Info>
        </span>
        <span>Upload your photo {"(JPG or PNG, max size: 500KB)"}.</span>
      </div>
    </label>
  );
};
