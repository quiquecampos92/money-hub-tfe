import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '../fonts';
import { Movimiento } from '@/shared/interfaces/Interfaces';
import { format } from 'date-fns';

interface Props {
  movimientos: Movimiento[];
}

export default async function LatestMovimientos({ movimientos }: Props) {

  return (
    <div className="flex w-full flex-col md:col-span-4 bg-white rounded-md shadow-md p-4">
      <h2 className={`${lusitana.className} mb-[5px] text-xl md:text-2xl`}>
        Movimientos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {movimientos.map((movimiento: Movimiento, i: number) => {
            return (
              <div
                key={movimiento.id}
                className={clsx('flex flex-row items-center justify-between py-4',
                  {'border-t': i !== 0},
                )}
              >
                <div className="flex items-center w-full">
                  <div className="min-w-0 mr-4 w-full">
                    <div className={`truncate text-sm font-semibold md:text-base ${movimiento.tipo === "gasto" ? "text-[#bf1b1b]" : "text-[#53e310]"}`}>
                      {movimiento.tipo === "gasto" ? "-" : "+"} {movimiento.cantidad}
                    </div>

                    <div
                      className='flex justify-between w-full items-center'
                    >
                    <div className="text-sm text-gray-500 md:text-base">
                      Concepto: {movimiento.concepto}
                    </div>

                    <div className="text-sm text-gray-500 md:text-base">
                      {movimiento?.date && format(new Date(movimiento.date), 'dd/MM/yyyy')}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Actualizado justo ahora</h3>
        </div>
      </div>
    </div>
  ); 
}
