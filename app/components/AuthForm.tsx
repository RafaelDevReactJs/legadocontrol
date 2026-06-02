"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, FormEvent, useEffect, useState } from "react";
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
  const router = useRouter();
  const config = ROLE_CONFIG[role];
  const otherRole: UserRole = role === "aluno" ? "admin" : "aluno";

  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setMode("login");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, [role]);

  const isLogin = mode === "login";
  const passwordsMismatch =
    !isLogin && confirmPassword.length > 0 && password !== confirmPassword;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (passwordsMismatch) {
      return;
    }

    // TODO: integrar com API de autenticação
    console.log(isLogin ? "login" : "register", { role, name, email, password });

    if (isLogin && role === "admin") {
      router.push(PAINEL_ROUTE);
    }
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setName("");
    setEmail("");
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
          {isLogin ? config.badgeLogin : config.badgeRegister}
        </span>
      </div>

      <Typography component="h1" className={styles.heading}>
        {isLogin ? config.headingLogin : config.headingRegister}
      </Typography>
      <Typography component="p" className={styles.description}>
        {isLogin ? config.descriptionLogin : config.descriptionRegister}
      </Typography>

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
