import styles from "./login.module.css";
import Image from "next/image";

export default function Login() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.loginBox}>
        <div className={styles.marginLoginBox}>
          <div className={styles.logoApp}>
            <Image
              src="/applehub-logo.png"
              alt="Logo de la aplicación"
              width={150}
              height={91}
            />
          </div>
          <h1 className={styles.titleH1}>Iniciar Sesión</h1>
          <input
            className={styles.inputLogin}
            type="text"
            placeholder="Correo electrónico"
          />
          <input
            className={styles.inputLogin}
            type="password"
            placeholder="Contraseña"
          />
          <button>Ingresar</button>
        </div>
      </div>
    </div>
  );
}
