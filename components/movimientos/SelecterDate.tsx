"use client"
// Esta debe mostrar el select de las fechas seleccionadas
import { Movimiento } from "@/shared/interfaces/Interfaces"
import { useEffect, useState } from "react"
import  Filter  from '@/components/filter'

export const SelecterDate = ({ movimientos: _movimientos }: { movimientos: Movimiento[] }) => {
    const [concepto, setConcepto] = useState<string>('todos')
    const [movimientos, setMovimientos] = useState<Movimiento[]>([])

    useEffect(() => {
        fetch(`/api/movimientos?concepto=${concepto}`, { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setMovimientos(data)
            })
            .catch(err => console.error(err))

    }, [concepto])

    return (
        <>
            {/* <select
                className='ml-auto p-2 rounded-md border border-gray-300 w-[300px] mb-[20px]'
                onChange={(e) => setConcepto(e.target.value)}
            >
                <option value={"todos"}>Todos</option>
                {_movimientos
                .reduce((uniqueMovimientos: any, movimiento: any) => {
                    if (!uniqueMovimientos.includes(movimiento.concepto)) {
                        uniqueMovimientos.push(movimiento.concepto);
                    }
                    return uniqueMovimientos;
                }, []).map((concepto: any, index: number) => (
                        <option key={index} value={concepto}>{concepto}</option>
                ))}
            </select> */}
            
            <Filter />


        </>
    )
}