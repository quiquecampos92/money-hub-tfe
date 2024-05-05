"use client"

import { Cuenta, Movimiento } from "@/shared/interfaces/Interfaces"
import { TablaMovimientos } from "./TablaMovimientos"
import { useEffect, useState } from "react"
import { Grafico } from "../grafico"
import { format } from "date-fns"
import { Calendar } from 'primereact/calendar';
import { truncate } from "lodash"
import { lusitana } from '../fonts';
import queryString from "query-string"
import { EstadisticasSkeleton } from "../skeletons"

interface Props {
    cuentas: Cuenta[];
}

export const Selecter = ({ cuentas }: Props) => {
    const [concepto, setConcepto] = useState<string>('todos')
    const [movimientos, setMovimientos] = useState<Movimiento[]>([])
    const [dates, setDates] = useState<any>();
    const [finalDate, setFinalDates] = useState<any>();
    const [cuenta, setCuenta] = useState<string>('todas')
    const [tipo, setTipo] = useState<"ingreso" | "gasto" | "todos">("todos")
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const formatDates = cleanDates(dates)
        setFinalDates(formatDates)
    }, [dates])

    useEffect(() => {
        setLoading(true)
        let query = {}
        if (finalDate?.start && finalDate?.end) query = { ...query, fechasInf: finalDate?.start, fechasSup: finalDate?.end }
        if (tipo) query = { ...query, tipo }
        if (cuenta) query = { ...query, cuenta }
        if (concepto) query = { ...query, concepto: concepto }
        query = { ...query, limit: 50 }

        const endpoint = `/api/movimientos` + "?" + queryString.stringify(query);

        fetch(endpoint, { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setMovimientos(data?.data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))

    }, [finalDate, cuenta, tipo, concepto])

    const cleanDates = (dates: any) => {
        if (dates?.length > 1)
            return {
                start: format(new Date(dates[0]), 'yyyy-MM-dd'),
                end: format(new Date(dates[1]), 'yyyy-MM-dd') === '1970-01-01'
                    ? null
                    : format(new Date(dates[1]), 'yyyy-MM-dd'),
            }
    }

    const groupMovimientosPorMes = (movimientos: Movimiento[]) => movimientos.reduce((acc: any, movimiento) => {
        const fecha = new Date(movimiento.date);
        const mes = fecha.toLocaleString('default', { month: 'long' });
        const año = fecha.getFullYear();

        if (!acc[año]) {
            acc[año] = {};
        }

        if (!acc[año][mes]) {
            acc[año][mes] = [];
        }

        acc[año][mes].push(movimiento);

        return acc;
    }, {});

    return (
        <div
            className="w-full flex flex-col gap-[20px]"
        >
            <div
                className="w-full flex flex-col bg-white rounded-md shadow-md p-4"
            >
                <h2 className={`${lusitana.className} mb-[5px] text-xl md:text-2xl`}>
                    Filtros
                </h2>

                <div
                    className="w-full flex"
                >
                    <select
                        className='p-2 rounded-md border border-gray-300 w-[200px]'
                        onChange={(e) => setConcepto(e.target.value)}
                    >
                        <option value={"todos"}>Todos</option>
                        {movimientos
                            ?.reduce((uniqueMovimientos: any, movimiento: any) => {
                                if (!uniqueMovimientos.includes(movimiento.concepto)) {
                                    uniqueMovimientos.push(movimiento.concepto);
                                }
                                return uniqueMovimientos;
                            }, []).map((concepto: any, index: number) => (
                                <option key={index} value={concepto}>{concepto}</option>
                            ))}
                    </select>

                    <div
                        className='w-full flex justify-end gap-[10px]'
                    >
                        <Calendar
                            value={dates}
                            onChange={(e) => {
                                setDates(e?.value)
                            }}
                            selectionMode="range"
                            readOnlyInput
                            hideOnRangeSelection
                            placeholder='Filtrar por fecha'
                            showButtonBar
                            hideOnDateTimeSelect={true}
                            showIcon
                        />

                        <select
                            onChange={(e: any) => setTipo(e.target.value)}
                            className='p-2 rounded-md border border-gray-300 w-[215px]'
                            defaultValue={"todos"}
                        >
                            {["ingreso", "gasto", "todos"].map((tipo: any, index: number) => (
                                <option className='capitalize' key={index} value={tipo}>{tipo}</option>
                            ))}
                        </select>

                        <select
                            onChange={(e) => setCuenta(e.target.value)}
                            className='p-2 rounded-md border border-gray-300 w-[215px]'
                        >
                            <option value={"todas"}>Todas</option>
                            {cuentas?.map((cuenta: Cuenta, index: number) => (
                                <option key={index} value={cuenta?.id}>{truncate(cuenta.iban, { length: 10, omission: "" })}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? <EstadisticasSkeleton />
            :
                <>
                    <Grafico
                        movimientos={movimientos}
                    />

                    <TablaMovimientos movimientos={groupMovimientosPorMes(movimientos)} />
                </>
            }
        </div>
    )
}