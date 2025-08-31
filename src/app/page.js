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
              width={155}
              height={96}
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
          <p className={styles.pLikeLink}>¿No puedes iniciar sesión?</p>
        </div>
      </div>
    </div>
  );
}
