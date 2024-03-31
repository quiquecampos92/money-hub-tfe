import { Cuenta, Movimiento } from '@/shared/interfaces/Interfaces';
import { CurrencyEuroIcon } from '@heroicons/react/24/outline';

export default async function SaldoTotal({
  cuentas,
  movimientos,
}: {
  cuentas: Cuenta[];
  movimientos: Movimiento[];
}) {
  const getTotalSaldo = (movimientos: Movimiento[], cuentas: Cuenta[]) => {
    let totalCuentas = 0;
    let totalMovimientos = 0;

    cuentas?.forEach((cuenta) => {
        totalCuentas += Number(cuenta.saldo.replace("€", "") || 0);
    });

    movimientos?.forEach((movimiento) => {
        if (movimiento.tipo === "gasto") {
            totalMovimientos -= Number(movimiento.cantidad.replace("€", "") || 0);
        } else if (movimiento.tipo === "ingreso") {
            totalMovimientos += Number(movimiento.cantidad.replace("€", "") || 0);
        }
    });

    return totalCuentas - totalMovimientos;
};

  return (
    <div className="w-full">
      <div className="iban-container bg-white rounded-md p-4 shadow-md mb-4">
        <label className="block text-sm font-medium text-gray-500" htmlFor="saldo">
          Saldo Total
          <CurrencyEuroIcon className="inline-block w-6 h-6 mr-1 text-blue-600" />
        </label>
        <p className={`text-lg font-semibold mb-2 ${getTotalSaldo(movimientos, cuentas) < 0 ? "text-[#bf1b1b]" : getTotalSaldo(movimientos, cuentas) > 0 ? "text-[#53e310]" : "text-black"}`}>
          € {getTotalSaldo(movimientos, cuentas).toFixed(2)}
        </p>
      </div>
    </div>
  );

}
