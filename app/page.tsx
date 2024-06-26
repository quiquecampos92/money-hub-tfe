import AcmeLogo from "../components/acme-logo";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { lusitana } from "../components/fonts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex justify-center items-center h-20 md:h-40 bg-[#CBCBCB] rounded-lg p-4">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong className="text-[#EB8833] md:text-4xl md:leading-tight">
              Bienvenido a MoneyHub.
            </strong>
            <p className="text-gray-600 my-4">
              Administra tus cuentas, transacciones y gastos de forma sencilla.
            </p>
            <p className="text-gray-600 my-4">
              Añade cuentas de cualquier banco, movimientos de cualquier tipo y registra cada paso económico que realices.
            </p>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-[#00A2DB] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#071F45] md:text-base"
          >
            <span>Inciar sesión</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/resgistro"
            className="flex items-center gap-5 self-start rounded-lg bg-[#00A2DB] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#071F45] md:text-base"
          >
            <span>Registrarme</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/fondo1.jpg"
            width={1000}
            height={760}
            alt="Screenshots of the dashboard project showing desktop version"
            className="hidden md:block rounded-lg"
          />
          <Image
            src="/fonfomovil.jpg"
            width={560}
            height={620}
            alt="Screenshot of the dashboard project showing mobile version"
            className="block md:hidden rounded-lg"
          />
        </div>

      </div>
    </main>
  );
}
