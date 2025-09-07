"use client";
import styles from "./login.module.css";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "@/hooks/useForm";
import { postOptions } from "@/lib/utils/optionsFetch";
import { useFetchAction } from "@/hooks/useFetchAction";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function Login() {
  // Estado para manejar el mensaje de error
  const [visibleError, setVisibleError] = useState(false);

  // Invocando useRouter
  const router = useRouter();

  // Desestructurando los estados y funciones necesarias del custom hook
  const { form, handleChange } = useForm({ email: "", password: "" });

  // Desestructurando el useFetchAction
  const { request } = useFetchAction();

  // Función manejadora del click para enviar petición POST y validar el login
  const onClickLogin = async () => {
    const result = await request("/api/login", postOptions(form));

    if (result?.success) {
      router.push("/dashboard");
      console.log('Autorizado...');
    } else {
      // alert("Error de credenciales");
      setVisibleError(true);
    }
  };

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
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.inputLogin}
            type="text"
            placeholder="Correo electrónico"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            className={styles.inputLogin}
            type="password"
            placeholder="Contraseña"
          />
          <button onClick={onClickLogin}>Ingresar</button>
          <p className={styles.pLikeLink}>¿No puedes iniciar sesión?</p>
        </div>
      </div>
      {visibleError && <ErrorMessage message={'¡Credenciales inválidas! Verifíca los campos o solicita acceso.'} />}
    </div>
  );
}