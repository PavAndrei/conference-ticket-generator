import styles from "./styles.module.css";

import { Container } from "../Container/Container";
import { HeaderLogo } from "../../icons/HeaderLogo";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <HeaderLogo />
      </Container>
    </header>
  );
};
