"use client"
"use strict";
// Esta debe mostrar el select de las cuentas bancarias del usuario
import { Cuenta, Movimiento } from "@/shared/interfaces/Interfaces"
import { useEffect, useState } from "react"
import MovimientosTable from '@/components/movimientos/table';
import { TablaMovimientos } from "../Estadisticas/TablaMovimientos"
import { InvoicesTableSkeleton } from '@/components/skeletons';
// import { fetchMovimientos, fetchMovimientosPages, fetchMovimientosFromCuenta } from '@/shared/middlewares/data';
import { Suspense } from 'react';
// import Pagination from '@/components/movimientos/pagination';
// import { SelecterDate } from '@/components/movimientos/SelecterDate';
// import DateSelector from "./DateSelector";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export const SumaTotal = async ({ cuentas: _cuentas }: { cuentas: Cuenta[] }, { searchParams }: { searchParams?: { query?: string; page?: string }; }) => {
    const [iban, setIban] = useState<string>('todas')
    // const [cuentas, setCuentas] = useState<Cuenta[]>([])
    const [movimientos, setMovimientos] = useState<Movimiento[]>([])
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // Función para manejar el cambio de fecha
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    // Función para restablecer el filtro de fecha
    const resetDateFilter = () => {
        setSelectedDate(null);
    };

    // Obtener el mes y el año de la fecha seleccionada
    const selectedMonth = selectedDate?.getMonth()! + 1; // Sumamos 1 porque los meses van de 0 a 11. La exclamación nos dice que no es un valor null ni undefined
    const selectedYear = selectedDate?.getFullYear();

    useEffect(() => {
        // Construye la URL de la solicitud basándose en si se ha seleccionado una fecha o no
        let url = `/api/cuentas?iban=${iban}`;
        if (selectedDate) {
            const selectedMonth = selectedDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
            const selectedYear = selectedDate.getFullYear();
            url += `&month=${selectedMonth}&year=${selectedYear}`;
        }

        fetch(url, { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setMovimientos(data);
            })
            .catch(err => console.error(err));
    }, [iban, selectedDate]);
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    // const totalPages = await fetchMovimientosPages();


    return (
        <>
            <div className="flex justify-end">
                <div className="text-right mr-4 mt-8">
                    <button onClick={resetDateFilter} className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
                        Todo el historial
                    </button>
                </div>
                <div className="text-right mr-4">
                    <h3 className="mb-2">Filtrar por mes:</h3>
                    {/* Seleccionar por fecha */}
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="MMMM yyyy" // Formato de visualización (mes completo y año)
                        showMonthYearPicker // Mostrar selector de mes y año en vez del día
                        placeholderText={selectedDate ? selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : "Seleccionar mes y año"}
                        />
                    <p style={{ display: 'none' }}>Month: {selectedMonth}</p>
                    <p style={{ display: 'none' }}>Year: {selectedYear}</p>
                </div>
                <div className="text-right">
                    <h3 className="mb-2">Filtrar por nº cuenta:</h3>
                    {/* Seleccionar por cuenta */}
                    <select
                        className='p-2 rounded-md border border-gray-300 w-auto mb-4'
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