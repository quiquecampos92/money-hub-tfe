import { CreateMovimientos } from '@/components/movimientos/buttons';
import { fetchCuentasUser } from '@/shared/middlewares/data';
import { Metadata } from 'next';
import { FilterTable } from '@/components/movimientos/FiltersTable';


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

  const cuentas = await fetchCuentasUser("ASC");

  return (
    <div
      className='w-full flex flex-col'
    >
      <h1 className="text-3xl font-bold text-center md:text-4xl mb-8 text-[#00A2DB] bg-[#F0F4F8] border-4 border-[#00A2DB] border-solid rounded-t-lg rounded-b-none p-4">
        Movimientos
      </h1>

      <div
        className='my-[10px] ml-auto'
      >
        <CreateMovimientos />
      </div>
      {/* Aqui se muestra el select de las fechas seleccionadas */}
      {/* <SelecterDate movimientos={movimientos} /> */}

      <FilterTable cuentas={cuentas} queryParams={query} currentPage={currentPage} />
    </div>
  );
}
