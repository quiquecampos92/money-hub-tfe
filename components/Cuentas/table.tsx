import { Cuenta, Movimiento } from '@/shared/interfaces/Interfaces';
import { DeleteCuenta, DeleteMovimiento, UpdateCuenta, UpdateMovimiento } from '../movimientos/buttons';

export default async function CuentasTable({
  cuentas,
  movimientos,
}: {
  cuentas: Cuenta[];
  movimientos: Movimiento[];
}) {
  const getCuentaSaldo = (cuentaId: string, saldoActual: number) => {
    const movimientosCuenta = movimientos.filter((m) => m.cuenta_id === cuentaId);
    
    const total = movimientosCuenta.reduce((total, movimiento) => {
        const cantidad = Number(movimiento.cantidad.replace("€", ""));
        
        if (movimiento.tipo === "gasto") {
            return total - cantidad;
        } else if (movimiento.tipo === "ingreso") {
            return total + cantidad;
        } else {
            return total;
        }
    }, 0);

    return (saldoActual - total).toFixed(2);
};

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cuentas.map((c: Cuenta) => (
          <div key={c.id} className="iban-container bg-white rounded-md p-4 shadow-md mb-4 hover:scale-[1.02] ease-in-out duration-300">
            <label className="block text-sm font-medium text-gray-500" htmlFor="name">
              Propietario
            </label>
            <p className="text-lg font-semibold mb-2">{c.name}</p>

            {/* <label className="block text-sm font-medium text-gray-500" htmlFor="iban">
              Nº de cuenta
            </label>
            <p className="text-lg font-semibold mb-2">{c.accountnumber}</p> */}

            <label className="block text-sm font-medium text-gray-500" htmlFor="iban">
              IBAN
            </label>
            <p className="text-lg font-semibold mb-2">{c.iban}</p>

            <label className="block text-sm font-medium text-gray-500" htmlFor="entidad">
              Entidad
            </label>
            <p className="text-lg font-semibold mb-2">{c.entidad}</p>

            <label className="block text-sm font-medium text-gray-500" htmlFor="saldo">
              Saldo
            </label>
            <p className="text-lg font-semibold mb-2">€ {getCuentaSaldo(c.id, Number(c?.saldo.replace("€", "")))}</p>
            <div className="flex items-center justify-end gap-[10px]">
              <UpdateCuenta id={c.id} />
              <DeleteCuenta id={c.id} />
            </div>
          </div>
        ))}
      </div>
  );
}
