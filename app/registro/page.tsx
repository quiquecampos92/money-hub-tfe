import AcmeLogo from '@/components/acme-logo';
import LoginForm from '@/components/login-form';
import RegistroForm from '@/components/registro-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:shadow-lg">
        <div className="flex justify-center items-center h-20 md:h-36 w-full rounded-lg bg-[#CBCBCB] p-3">
          <div className="flex items-center justify-center w-32 md:w-36 text-white">
            <AcmeLogo />
          </div>
        </div>
        <RegistroForm />
      </div>
    </main>

  );
}
