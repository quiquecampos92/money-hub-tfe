import { fetchMovimientosFromCuenta, fetchMovimientosByDateFromCuenta } from '@/shared/middlewares/data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const iban = searchParams.get('iban') || "todas"
        const selectedMonth = searchParams.get('month') || undefined
        const selectedYear = searchParams.get('year') || undefined
        // console.log(iban)
        // const data = await fetchMovFilterByCuenta(iban);
        const data = await fetchMovimientosByDateFromCuenta(selectedMonth, selectedYear, iban, "DESC", undefined);

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.error()
    }
}