"use client"

import { Calendar } from 'primereact/calendar';
import { Cuenta, Movimiento } from "@/shared/interfaces/Interfaces"
import MovimientosTable from "./table"
import { Suspense, useEffect, useState } from "react";
import { truncate } from "lodash"
import { format } from 'date-fns';
import queryString from 'query-string';
import Pagination from './pagination';
import { InvoicesTableSkeleton } from '../skeletons';

interface Props {
    cuentas: Cuenta[];
    queryParams: string;
    currentPage: number;
}

export const FilterTable = ({ cuentas, currentPage, queryParams }: Props) => {
    const [dates, setDates] = useState<any>();
    const [finalDate, setFinalDates] = useState<any>();
    const [cuenta, setCuenta] = useState<string>('todas')
    const [tipo, setTipo] = useState<"ingreso" | "gasto" | "todos">("todos")
    const [movimientos, setMovimientos] = useState<Movimiento[]>([])
    const [total, setTotal] = useState<number>(0)
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
        if(currentPage) query = { ...query, page: currentPage }

        const endpoint = `/api/movimientos` + "?" + queryString.stringify(query);

        fetch(endpoint, { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setTotal(data?.total)
                setMovimientos(data?.data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))

    }, [finalDate, cuenta, tipo, currentPage])

    const cleanDates = (dates: any) => {
        if (dates?.length > 1)
            return {
                start: format(new Date(dates[0]), 'yyyy-MM-dd'),
                end: format(new Date(dates[1]), 'yyyy-MM-dd') === '1970-01-01'
                    ? null
                    : format(new Date(dates[1]), 'yyyy-MM-dd'),
            }
    }

    const totalPages = (count: any): number => Math.ceil(count / 10)

    return (
        <div
            className="w-full flex flex-col"
        >
            <div
                className='w-full flex justify-end mb-[10px] gap-[10px]'
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
                />

                <select
                    onChange={(e: any) => setTipo(e.target.value)}
                    className='p-2 rounded-md border border-gray-300 w-[215px]'
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
                    {cuentas.map((cuenta: Cuenta, index: number) => (
                        <option key={index} value={cuenta?.id}>{truncate(cuenta.iban, { length: 10, omission: "" })}</option>
                    ))}
                </select>
            </div>

            <div>
                <Suspense key={queryParams + currentPage} fallback={<InvoicesTableSkeleton />}>
                    {loading ? <InvoicesTableSkeleton /> :
                    ((!movimientos || movimientos.length === 0) && !loading ) ?
                        <div
                            className='flex flex-col items-center p-[100px] rounded-lg w-full border border-blue-400'
                        >
                            <p>Aun no hay cuentas cargadas en el sistema</p>
                        </div>
                        : (
                            <MovimientosTable
                                movimiento={
                                    movimientos
                                }
                            />
                        )
                    }
                </Suspense>

                <div className="mt-5 flex w-full justify-center">
                    {(movimientos && movimientos?.length > 0) && <Pagination totalPages={(totalPages(total)) as number} />}
                </div>
            </div>
        </div>
    )
}