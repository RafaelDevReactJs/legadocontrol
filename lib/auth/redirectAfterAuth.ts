/**
 * Navegação completa garante que o cookie de sessão
 * seja enviado ao proxy antes de carregar /painel.
 */
export function redirectAfterAuth(path: string): void {
  window.location.assign(path);
}
