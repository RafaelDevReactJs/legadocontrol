"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { ComponentProps, FormEvent, useState } from "react";
import styles from "./AuthForm.module.css";

type AuthMode = "login" | "register";

function FormField({
  id,
  label,
  ...props
}: ComponentProps<typeof TextField> & { label: string }) {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
      </label>
      <TextField
        id={id}
        fullWidth
        variant="outlined"
        className={styles.textField}
        {...props}
      />
    </div>
  );
}

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isLogin = mode === "login";
  const passwordsMismatch =
    !isLogin && confirmPassword.length > 0 && password !== confirmPassword;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (passwordsMismatch) {
      return;
    }

    // TODO: integrar com API de autenticação
    console.log(isLogin ? "login" : "register", { name, email, password });
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <Box component="section" className={styles.card}>
      <div className={styles.logo}>
        <Image
          src="/assets/Legado.svg"
          alt="CT Legado"
          width={220}
          height={73}
          priority
          className={styles.logoImage}
        />
      </div>

      <div className={styles.badge}>
        <span className={styles.badgeDot} />
        <span className={styles.badgeText}>
          {isLogin ? "Área do aluno" : "Nova conta"}
        </span>
      </div>

      <Typography component="h1" className={styles.heading}>
        {isLogin ? "Entrar" : "Cadastre-se"}
      </Typography>
      <Typography component="p" className={styles.description}>
        {isLogin
          ? "Acesse sua conta para acompanhar treinos e graduações."
          : "Crie sua conta e faça parte da família CT Legado."}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <FormField
            id="name"
            label="Nome completo"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        )}

        <FormField
          id="email"
          label="E-mail"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
        />

        <FormField
          id="password"
          label="Senha"
          type="password"
          required
          autoComplete={isLogin ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {!isLogin && (
          <FormField
            id="confirmPassword"
            label="Confirmar senha"
            type="password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            error={passwordsMismatch}
            helperText={
              passwordsMismatch ? "As senhas não coincidem." : undefined
            }
          />
        )}

        {isLogin && (
          <div className={styles.forgotRow}>
            <Button type="button" className={styles.forgotButton}>
              Esqueceu a senha?
            </Button>
          </div>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={passwordsMismatch}
          className={styles.submitButton}
        >
          {isLogin ? "Entrar" : "Criar conta"}
        </Button>
      </Box>

      <div className={styles.footer}>
        <Typography component="p" className={styles.footerText}>
          {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}{" "}
          <Button
            type="button"
            onClick={() => switchMode(isLogin ? "register" : "login")}
            className={styles.switchLink}
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
          </Button>
        </Typography>
      </div>
    </Box>
  );
}
