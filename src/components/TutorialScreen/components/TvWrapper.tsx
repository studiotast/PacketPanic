import React from "react";
import styles from "./TvWrapper.module.scss";

interface TvWrapperProps {
  children?: React.ReactNode;
}

const TvWrapper: React.FC<TvWrapperProps> = ({ children }) => {
  return (
    <div className={styles.tvScreen}>
      <div className={styles.tvWrapper}>
        <img src="/images/tv.png" alt="tv" className={styles.tvImage} />
        {children}
      </div>
    </div>
  );
};

export default TvWrapper;
