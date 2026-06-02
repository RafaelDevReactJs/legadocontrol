import AuthForm from "../../components/AuthForm";
import AuthLayout from "../../components/AuthLayout";

export const metadata = {
  title: "CT Legado — Login Admin / Instrutor",
  description: "Acesse o painel administrativo do CT Legado Jiu-Jitsu",
};

export default function AdminLoginPage() {
  return (
    <AuthLayout heroText="Painel de gestão do CT Legado. Gerencie turmas, alunos, graduações e acompanhe a operação do tatame.">
      <AuthForm key="admin" role="admin" />
    </AuthLayout>
  );
}
