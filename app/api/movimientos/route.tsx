import { fetchMovimientosFilter } from '@/shared/middlewares/data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const concepto = searchParams.get('concepto') || "todos"

        const data = await fetchMovimientosFilter(concepto)

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.error()
    }
}