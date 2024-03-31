import LatestMovimientos from "../dashboard/latest-movimientos"
import { Movimiento } from "@/shared/interfaces/Interfaces"

export const TablaMovimientos = async ({ movimientos }: { movimientos: Movimiento[] }) => {

    return (
        <LatestMovimientos movimientos={movimientos} />
    )
}