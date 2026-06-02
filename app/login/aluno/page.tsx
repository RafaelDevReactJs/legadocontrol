import AuthForm from "../../components/AuthForm";
import AuthLayout from "../../components/AuthLayout";

export const metadata = {
  title: "CT Legado — Login Aluno",
  description: "Acesse sua conta de aluno no CT Legado Jiu-Jitsu",
};

export default function AlunoLoginPage() {
  return (
    <AuthLayout heroText="Tradição nordestina e Jiu-Jitsu de elite. Entre na sua conta e continue escrevendo sua história no tatame.">
      <AuthForm key="aluno" role="aluno" />
    </AuthLayout>
  );
}
