export type AdminNavItem = {
  label: string;
  href: string;
  description?: string;
};

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Início",
    href: "/painel",
    description: "Visão geral do CT Legado",
  },
  {
    label: "Turmas",
    href: "/painel/turmas",
    description: "Cadastro e gestão de turmas",
  },
  {
    label: "Alunos",
    href: "/painel/alunos",
    description: "Cadastro e gestão de alunos",
  },
  {
    label: "Financeiro",
    href: "/painel/financeiro",
    description: "Mensalidades, pagamentos e relatórios",
  },
];

export const ADMIN_LOGIN_ROUTE = "/login/admin";
