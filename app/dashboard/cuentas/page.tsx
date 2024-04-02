import { Metadata } from 'next';
import CuentasTable from '@/components/Cuentas/table';
import { fetchCuentasUser, fetchMovimientos } from '@/shared/middlewares/data';
import { CreateCuenta } from '@/components/movimientos/buttons';

export const metadata: Metadata = {
  title: 'Cuentas',
};

export default async function Page() {
  const cuentas = await fetchCuentasUser("ASC");
  const movimientos = await fetchMovimientos("ASC", undefined, undefined);

  return (
    <main
      className='w-full flex flex-col'
    >
      <h1 className="font-bold text-3xl md:text-4xl text-[#00A2DB]">
        Cuentas
      </h1>

      <div
        className='my-[10px] ml-auto'
      >
        <CreateCuenta />
      </div>

      <div
        className='mt-[20px]'
      >
        {(!cuentas || cuentas.length === 0) ?
        <div
          className='flex flex-col items-center p-[100px] rounded-lg w-full border border-blue-400'
        >
          <p>Aun no hay cuentas cargadas en el sistema</p>
        </div>
        : <CuentasTable cuentas={cuentas} movimientos={movimientos} />
        }
      </div>
    </main>
  );
}
