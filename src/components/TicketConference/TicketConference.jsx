import styles from "./styles.module.css";

import { LogoTicket } from "../../icons/LogoTicket";

export const TicketConference = () => {
  return (
    <div className={styles.conference}>
      <div className={styles.logo}>
        <LogoTicket />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>Coding Conf</div>
        <div className={styles.date}>
          <span>Jan</span> / <span>31</span>, <span>2025</span> /
          <span>Austin</span>, <span>TX</span>
        </div>
      </div>
    </div>
  );
};
