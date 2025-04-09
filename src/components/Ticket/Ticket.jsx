import styles from "./styles.module.css";

import { TicketShape } from "../../icons/TicketShape";
import { TicketConference } from "../TicketConference/TicketConference";
import { TicketUser } from "../TicketUser/TicketUser";

export const Ticket = () => {
  return (
    <div className={styles.ticket}>
      <div className={styles.bg}>
        <TicketShape />
      </div>
      <div className={styles.content}>
        <TicketConference />
        <TicketUser />
      </div>
      <div className={styles.number}>#01609</div>
    </div>
  );
};
