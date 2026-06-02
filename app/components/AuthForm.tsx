"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, FormEvent, useEffect, useState } from "react";
import { getRtkErrorMessage } from "@/lib/api/getRtkErrorMessage";
import { redirectAfterAuth } from "@/lib/auth/redirectAfterAuth";
import { syncSessionCookie } from "@/lib/auth/syncSessionCookie";
import { useLoginMutation, useSignUpMutation } from "@/store/api/authApi";
import type { LoginResponse } from "@/types/session";
import { AUTH_ROUTES, AuthMode, PAINEL_ROUTE, UserRole } from "../types/auth";
import styles from "./AuthForm.module.css";

type AuthFormProps = {
  role: UserRole;
};

const ROLE_CONFIG = {
  aluno: {
    badgeLogin: "Área do aluno",
    badgeRegister: "Nova conta",
    headingLogin: "Entrar",
    headingRegister: "Cadastre-se",
    descriptionLogin:
      "Acesse sua conta para acompanhar treinos e graduações.",
    descriptionRegister:
      "Crie sua conta e faça parte da família CT Legado.",
    submitLogin: "Entrar",
    submitRegister: "Criar conta",
    otherRoleLabel: "É admin ou instrutor?",
    otherRoleLink: "Acessar painel",
    allowsRegister: true,
    redirectAfterLogin: null,
  },
  admin: {
    badgeLogin: "Admin / Instrutor",
    badgeRegister: "Admin / Instrutor",
    headingLogin: "Entrar",
    headingRegister: "Entrar",
    descriptionLogin:
      "Acesse o painel para gerenciar turmas, alunos e graduações.",
    descriptionRegister:
      "Acesse o painel para gerenciar turmas, alunos e graduações.",
    submitLogin: "Acessar painel",
    submitRegister: "Acessar painel",
    otherRoleLabel: "É aluno?",
    otherRoleLink: "Entrar como aluno",
    allowsRegister: false,
    redirectAfterLogin: PAINEL_ROUTE,
  },
} as const;

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

export default function AuthForm({ role }: AuthFormProps) {
  const config = ROLE_CONFIG[role];
  const otherRole: UserRole = role === "aluno" ? "admin" : "aluno";

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();

  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmitting = isLoginLoading || isSignUpLoading;

  useEffect(() => {
    setMode("login");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage(null);
  }, [role]);

  const isLogin = mode === "login";
  const passwordsMismatch =
    !isLogin && confirmPassword.length > 0 && password !== confirmPassword;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (passwordsMismatch) {
      return;
    }

    try {
      let session: LoginResponse;

      if (isLogin) {
        session = await login({ email, password }).unwrap();
      } else {
        session = await signUp({ email, password, name }).unwrap();
      }

      if (!session.access_token) {
        setErrorMessage(
          "Login sem token de acesso. Verifique se o e-mail foi confirmado."
        );
        return;
      }

      await syncSessionCookie(session);

      if (config.redirectAfterLogin) {
        redirectAfterAuth(config.redirectAfterLogin);
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
        return;
      }
      setErrorMessage(getRtkErrorMessage(error));
    }
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage(null);
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
          {isLogin ? config.badgeLogin : config.badgeRegister}
        </span>
      </div>

      <Typography component="h1" className={styles.heading}>
        {isLogin ? config.headingLogin : config.headingRegister}
      </Typography>
      <Typography component="p" className={styles.description}>
        {isLogin ? config.descriptionLogin : config.descriptionRegister}
      </Typography>

      {errorMessage && (
        <Alert severity="error" className={styles.alert}>
          {errorMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && config.allowsRegister && (
          <FormField
            id="name"
            label="Nome completo"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />

        {!isLogin && config.allowsRegister && (
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
            disabled={isSubmitting}
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
          disabled={passwordsMismatch || isSubmitting}
          className={styles.submitButton}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={18} color="inherit" />
            ) : undefined
          }
        >
          {isLogin ? config.submitLogin : config.submitRegister}
        </Button>
      </Box>

      <div className={styles.footer}>
        {config.allowsRegister && (
          <Typography component="p" className={styles.footerText}>
            {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}{" "}
            <Button
              type="button"
              onClick={() => switchMode(isLogin ? "register" : "login")}
              className={styles.switchLink}
              disabled={isSubmitting}
            >
              {isLogin ? "Cadastre-se" : "Entrar"}
            </Button>
          </Typography>
        )}

        <Typography
          component="p"
          className={`${styles.footerText} ${config.allowsRegister ? styles.roleSwitch : ""}`}
        >
          {config.otherRoleLabel}{" "}
          <Link href={AUTH_ROUTES[otherRole]} className={styles.roleLink}>
            {config.otherRoleLink}
          </Link>
        </Typography>
      </div>
    </Box>
  );
}
