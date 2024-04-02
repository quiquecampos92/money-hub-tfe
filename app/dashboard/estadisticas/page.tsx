import { Selecter } from '@/components/Estadisticas/Selecter';
import { TablaMovimientos } from '@/components/Estadisticas/TablaMovimientos';
import { Grafico } from '@/components/grafico';
import { Movimiento } from '@/shared/interfaces/Interfaces';
import { fetchMovimientos } from '@/shared/middlewares/data';

export default async function Page() {
  const grafica = await fetchMovimientos("ASC", undefined, undefined);

  return (
    <main>
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-[#00A2DB]">
        Estadísticas
      </h1>
        <Selecter movimientos={grafica} />
    </main>
  );
}
