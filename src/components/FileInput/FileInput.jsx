import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import { Upload } from "../../icons/Upload";
import { Info } from "../../icons/Info";

import styles from "./styles.module.css";

export const FileInput = ({ name, description }) => {
  const {
    inputs,
    onChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    removeImage,
    changeImage,
    inputRefs,
    isDragActive,
  } = useContext(DataContext);

  const inputData = inputs.find((inp) => inp.name === name);

  if (!inputData) return null;

  return (
    <div className={styles.group}>
      <p className={styles.description} onClick={() => changeImage(name)}>
        {description}
      </p>

      <input
        ref={(el) => (inputRefs.current[name] = el)}
        className={styles.fileInput}
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
      />

      <div
        className={`${styles.uploadArea} ${
          isDragActive ? styles.uploadAreaDrag : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, name)}
        onClick={() => changeImage(name)}
      >
        {inputData.preview ? (
          <div className={styles.previewContainer}>
            <img
              src={inputData.preview}
              alt="Preview"
              className={styles.previewImage}
            />
            <div className={styles.previewButtons}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  changeImage(name);
                }}
                className={styles.changeBtn}
              >
                Change
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(name);
                }}
                className={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.uploadAreaIcon}>
              <Upload />
            </div>
            <p className={styles.uploadAreaText}>
              Drag and drop or click to upload
            </p>
          </>
        )}
      </div>
      <div className={styles.warning}>
        <span>
          <Info></Info>
        </span>
        <span>Upload your photo {"(JPG or PNG, max size: 500KB)"}.</span>
      </div>
    </div>
  );
};
