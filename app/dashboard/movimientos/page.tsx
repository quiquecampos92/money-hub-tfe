import { CreateMovimientos } from '@/components/movimientos/buttons';
import Pagination from '@/components/movimientos/pagination';
import MovimientosTable from '@/components/movimientos/table';
import { InvoicesTableSkeleton } from '@/components/skeletons';
import { fetchMovimientos, fetchMovimientosPages, fetchCuentasUser } from '@/shared/middlewares/data';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SelecterCuenta } from '@/components/movimientos/SelecterCuenta';
import { SelecterDate } from '@/components/movimientos/SelecterDate';


export const metadata: Metadata = {
  title: 'Movimientos',
};

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const cuentas = await fetchCuentasUser("ASC"); //esta es coppiada de lo mismo que para filtrar movimientos
  const movimientos = await fetchMovimientos("DESC", currentPage);
  const totalPages = await fetchMovimientosPages();

  return (
    <div
      className='w-full flex flex-col'
    >
<h1 className="text-3xl font-bold text-center md:text-4xl mb-8 text-[#00A2DB] bg-[#F0F4F8] border-4 border-[#00A2DB] border-solid rounded-t-lg rounded-b-none p-4">
  Movimientos
</h1>

      {/* Aqui se muestra el select de las cuentas bancarias del usuario */}
      {/* Aqui se muestra el select de las fechas seleccionadas */}
      {/* <SelecterDate movimientos={grafica} />  */}
      <div
        className='my-[10px] ml-auto'
      >
        <CreateMovimientos />
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        {(!movimientos || movimientos.length === 0) ?
          <div
            className='flex flex-col items-center p-[100px] rounded-lg w-full border border-blue-400'
          >
            <p>Aun no hay cuentas cargadas en el sistema</p>
          </div>
          : <SelecterCuenta cuentas={cuentas} /> 

        }
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        {(movimientos && movimientos.length > 0) && <Pagination totalPages={totalPages as number} />}      
      </div>
    </div>
  );
}
