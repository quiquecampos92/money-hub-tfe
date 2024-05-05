import { fetchMovimientos } from '@/shared/middlewares/data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const fechasInf: string | undefined = searchParams.get('fechasInf') || undefined
        const fechasSup: string | undefined = searchParams.get('fechasSup') || undefined
        const tipo: string = searchParams.get('tipo') || "todos"
        const cuenta: string | "todas" = searchParams.get('cuenta') || "todas"
        const concepto = searchParams.get('concepto') || "todos"
        const page: string | undefined = searchParams.get('page') || undefined
        const limit: string | undefined = searchParams.get('limit') || undefined

        const { data, total }: any = await fetchMovimientos({ 
            order: "DESC",
            concepto: concepto, 
            cuentas: cuenta,
            fechas: {
                start: fechasInf,
                end: fechasSup
            },
            tipo: tipo as "todos" | "ingreso" | "gasto",
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined
        })

        return NextResponse.json({ data, total })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.error()
    }
}
