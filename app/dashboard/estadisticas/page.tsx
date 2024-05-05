import { Selecter } from '@/components/Estadisticas/Selecter';
import { fetchCuentasUser } from '@/shared/middlewares/data';

export default async function Page() {
  const cuentas = await fetchCuentasUser("ASC");

  return (
    <main>
      <h1 className="text-3xl font-bold text-center md:text-4xl mb-8 text-[#00A2DB] bg-[#F0F4F8] border-4 border-[#00A2DB] border-solid rounded-t-lg rounded-b-none p-4">
        Estadísticas
      </h1>
        <Selecter cuentas={cuentas} />
    </main>
  );
}
