import { fetchMovFilterByCuenta } from '@/shared/middlewares/data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const iban = searchParams.get('iban') || "todas"
        console.log(iban)
        const data = await fetchMovFilterByCuenta(iban)

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.error()
    }
}