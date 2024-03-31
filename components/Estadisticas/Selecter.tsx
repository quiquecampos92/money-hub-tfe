"use client"

import { Movimiento } from "@/shared/interfaces/Interfaces"
import { TablaMovimientos } from "./TablaMovimientos"
import { useEffect, useState } from "react"
import { Grafico } from "../grafico"

export const Selecter = ({ movimientos: _movimientos }: { movimientos: Movimiento[] }) => {
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
            <select
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
            </select>

            <div
                className='w-full flex'
            >

                <TablaMovimientos movimientos={movimientos} />

                <Grafico
                    movimientos={movimientos}
                />
            </div>
        </>
    )
}