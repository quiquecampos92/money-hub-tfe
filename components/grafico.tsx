"use client";

import { Movimiento } from "@/shared/interfaces/Interfaces";
import { formatDateToLocal, getValue } from "@/shared/utils/functions";
import { format } from "date-fns";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export const Grafico = ({ movimientos }: { movimientos: Movimiento[] }) => {

    const data = movimientos?.reduce((acc: any, m: Movimiento) => {
        const month = format(new Date(m.date), 'MMM');
        const existingMonth: any = acc.find((item: any) => item?.name === month);

        if (existingMonth) {
            existingMonth.uv += getValue(m.cantidad, m.tipo);
        } else {
            acc.push({
                name: month,
                uv: getValue(m.cantidad, m.tipo)
            });
        }

        return acc;
    }, []);


    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i: any) => i.uv));
        const dataMin = Math.min(...data.map((i: any) => i.uv));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
        <div
            className="w-full h-[500px] bg-white rounded-md shadow-md p-4"
        >
            <ResponsiveContainer
                width={"100%"}
                height={"100%"}
            >
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 0,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="green" stopOpacity={1} />
                            <stop offset={off} stopColor="red" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="#000"
                        fill="url(#splitColor)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}