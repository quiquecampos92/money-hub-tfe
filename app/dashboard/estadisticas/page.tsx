import { Selecter } from '@/components/Estadisticas/Selecter';
import { TablaMovimientos } from '@/components/Estadisticas/TablaMovimientos';
import { Grafico } from '@/components/grafico';
import { Movimiento } from '@/shared/interfaces/Interfaces';
import { fetchMovimientos } from '@/shared/middlewares/data';

export default async function Page() {
  const grafica = await fetchMovimientos("ASC", undefined, undefined);

  return (
    <main>
      <h1 className="text-3xl font-bold text-center md:text-4xl mb-8 text-[#00A2DB] bg-[#F0F4F8] border-4 border-[#00A2DB] border-solid rounded-t-lg rounded-b-none p-4">
        Estadísticas
      </h1>
        <Selecter movimientos={grafica} />
    </main>
  );
}
