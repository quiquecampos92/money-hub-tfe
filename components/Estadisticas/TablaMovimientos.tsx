import { Movimiento } from '@/shared/interfaces/Interfaces';
import { inter, lusitana } from '../fonts';
import { format } from 'date-fns';

interface MovimientosGroup {
    [key: string]: {
        [key: string]: Movimiento[]
    }
}
interface Props {
    movimientos: MovimientosGroup;
}

export const TablaMovimientos = async ({ movimientos }: Props) => {

    return (
        <div className="flex w-full flex-col md:col-span-4 bg-white rounded-md shadow-md p-4">
            <h2 className={`${lusitana.className} mb-[5px] text-xl md:text-2xl`}>
                Movimientos
            </h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 gap-[20px]">
                {Object.entries(movimientos).map(([año, meses]) => (
                    <div key={año} className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold bg-[#00a2db] text-white text-center">
                            Año {año}
                        </h3>

                        <div
                            className='flex flex-row gap-4 justify-between'
                        >
                            {Object.entries(meses).map(([mes, movimientos]) => (
                                <div key={mes} className="flex flex-col gap-2">
                                    <h4 className="text-lg font-bold capitalize">
                                        {mes}
                                    </h4>

                                    <div className="flex flex-col gap-[10px]">
                                        {movimientos?.map((movimiento: Movimiento, index: number) => (
                                            <div key={index} className="flex flex-col gap-0">
                                                <span
                                                    className={`text-md font-bold ${movimiento?.tipo === 'ingreso' ? 'text-green-500' : 'text-red-500'}`}
                                                >
                                                    {movimiento?.cantidad}
                                                </span>

                                                <span
                                                    className='text-sm text-gray-500'
                                                >
                                                    {movimiento?.concepto}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}