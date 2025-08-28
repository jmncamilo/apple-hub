import Image from "next/image";
import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.loginBox}>
        <h1>Login</h1>
      </div>
    </div>
  );
}
