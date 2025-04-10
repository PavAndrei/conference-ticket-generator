import styles from "./styles.module.css";

import { randomNumber } from "../../utils/randomNumber";

import { TicketShape } from "../../icons/TicketShape";
import { TicketConference } from "../TicketConference/TicketConference";
import { TicketUser } from "../TicketUser/TicketUser";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

export const Ticket = () => {
  const { resetForm } = useContext(DataContext);

  return (
    <>
      <div className={styles.ticket}>
        <div className={styles.bg}>
          <TicketShape />
        </div>
        <div className={styles.content}>
          <TicketConference />
          <TicketUser />
        </div>
        <div className={styles.number}>#{randomNumber()}</div>
      </div>

      <button className={styles.reset} type="button" onClick={resetForm}>
        Reset
      </button>
    </>
  );
};
