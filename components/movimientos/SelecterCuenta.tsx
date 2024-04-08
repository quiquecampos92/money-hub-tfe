"use client"

// Esta debe mostrar el select de las cuentas bancarias del usuario
import { Cuenta, Movimiento } from "@/shared/interfaces/Interfaces"
import { useEffect, useState } from "react"
import MovimientosTable from '@/components/movimientos/table';
import { TablaMovimientos } from "../Estadisticas/TablaMovimientos"
import { InvoicesTableSkeleton } from '@/components/skeletons';
import { fetchMovimientos, fetchMovimientosPages, fetchMovimientosFromCuenta } from '@/shared/middlewares/data';
import { Suspense } from 'react';
import Pagination from '@/components/movimientos/pagination';
import { SelecterDate } from '@/components/movimientos/SelecterDate';



export const SelecterCuenta = async ({ cuentas: _cuentas }: { cuentas: Cuenta[] }, { searchParams }: { searchParams?: { query?: string; page?: string }; }) => {
    const [iban, setIban] = useState<string>('todas')
    const [cuentas, setCuentas] = useState<Cuenta[]>([])
    const [movimientos, setMovimientos] = useState<Movimiento[]>([])


    useEffect(() => {
        fetch(`/api/cuentas?iban=${iban}`, { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setMovimientos(data)
            })
            .catch(err => console.error(err))

    }, [iban])
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    // const totalPages = await fetchMovimientosPages();

    return (
        <>
            <div className="flex">
                {/* Seleccionar por fecha */}
                <SelecterDate movimientos={movimientos} />
                {/* Seleccionar por cuenta */}
                <select
                    className='ml-auto p-2 rounded-md border border-gray-300 w-[300px] mb-[20px]'
                    onChange={(e) => setIban(e.target.value)}
                >
                    <option value={"todas"}>Todas</option>
                    {_cuentas
                        .reduce((uniqueCuentas: any, cuenta: any) => {
                            if (!uniqueCuentas.includes(cuenta.iban)) {
                                uniqueCuentas.push(cuenta.iban);
                            }
                            return uniqueCuentas;
                        }, []).map((iban: any, index: number) => (
                            <option key={index} value={iban}>{iban}</option>
                        ))}
                </select>
            </div>

            {/* Aquí se muestran  los movimientos de la cuenta seleccionada */}
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                {(!movimientos || movimientos.length === 0) ?
                    <div
                        className='flex flex-col items-center p-[100px] rounded-lg w-full border border-blue-400'
                    >
                        <p>Aun no hay cuentas cargadas en el sistema</p>
                    </div>
                    : <MovimientosTable movimiento={movimientos} />
                }
            </Suspense>

            {/* <div className="mt-5 flex w-full justify-center">
                {(movimientos && movimientos.length > 0) && <Pagination totalPages={totalPages as number} />}
            </div> */}

            {/* <div className='w-full flex'>
                <MovimientosTable movimiento={movimientos} />
            </div> */}
        </>
    )
}