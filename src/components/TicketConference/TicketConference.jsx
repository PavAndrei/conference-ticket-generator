import styles from "./styles.module.css";

import { LogoTicket } from "../../icons/LogoTicket";

import { getNextYear } from "../../utils/getNextYear";

export const TicketConference = () => {
  return (
    <div className={styles.conference}>
      <div className={styles.logo}>
        <LogoTicket />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>Coding Conf</div>
        <div className={styles.date}>
          <span>Jan</span> / <span>31</span>, <span>{getNextYear()}</span> /
          <span>Austin</span>, <span>TX</span>
        </div>
      </div>
    </div>
  );
};
