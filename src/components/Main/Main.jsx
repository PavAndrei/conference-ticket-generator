import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import styles from "./styles.module.css";

import { Container } from "../Container/Container";
import { Form } from "../Form/Form";
import { Ticket } from "../Ticket/Ticket";
import { Title } from "../Title/Title";
import { Message } from "../Message/Message";

export const Main = () => {
  const { isFormFilled } = useContext(DataContext);

  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.wrapper}>
          <Title />
          <Message />
          {isFormFilled ? <Ticket /> : <Form />}
        </div>
      </Container>
    </main>
  );
};
