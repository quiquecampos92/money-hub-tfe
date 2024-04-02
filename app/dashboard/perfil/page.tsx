import { Metadata } from 'next';
import UserTable from '@/components/Perfil/table';
import { fetchCuentasUser, fetchMovimientos } from '@/shared/middlewares/data';
import { UpdateUser } from '@/components/movimientos/buttons';

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
      <h1 className="text-3xl font-bold text-center md:text-4xl mb-8 text-[#00A2DB] bg-[#F0F4F8] border-4 border-[#00A2DB] border-solid rounded-t-lg rounded-b-none p-4">
        Datos del Usuario
      </h1>

      <div
        className='my-[10px] ml-auto'
      >
        {/* <UpdateUser  /> */}
      </div>

      <div
        className='mt-[20px]'
      >
        {(!cuentas || cuentas.length === 0) ?
        <div
          className='flex flex-col items-center p-[100px] rounded-lg w-full border border-blue-400'
        >
          <p>Aun no hay usuarios cargados en el sistema</p>
        </div>
        : <UserTable />
        }
      </div>
    </main>
  );
}
