'use client';

import Link from 'next/link';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { createMovimiento } from '@/shared/middlewares/actions';
import { useFormState } from 'react-dom';
import { Cuenta } from '@/shared/interfaces/Interfaces';

export default function FormMovimientos({ cuentas }: { cuentas: Cuenta[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMovimiento, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Cuenta Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Elige cuenta
          </label>
          <div className="relative">
            <select
              id="cuenta"
              name="cuenta_Id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="cuenta-error"
            >
              <option value="" disabled>
                Select a cuenta
              </option>
              {cuentas.map((cuenta) => (
                <option key={cuenta.id} value={cuenta.id}>
                  {cuenta?.accountnumber} - {cuenta?.entidad}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="cuenta-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cuenta_Id &&
              state.errors.cuenta_Id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Cantidad movimiento */}
        <div className="mb-4">
          <label htmlFor="cantidad" className="mb-2 block text-sm font-medium">
            Elije una cantidad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cantidad"
                name="cantidad"
                type="string"
                placeholder="Escoje una cantidad"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cantidad-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="cantidad-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cantidad &&
              state.errors.cantidad.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tipo" className="mb-2 block text-sm font-medium">
            Tipo
          </label>
          <div >
            <select
              id="tipo"
              name="tipo"
              defaultValue="default"
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
            >
              <option disabled>Seleccione el tipo</option>
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
          </div>
          <div id="tipo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tipo &&
              state.errors.tipo.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Concepto movimiento */}
        <div className="mb-4">
          <label htmlFor="concepto" className="mb-2 block text-sm font-medium">
            Concepto
          </label>
          <div >
            <input
              id="concepto"
              name="concepto"
              type="text"
              // defaultChecked={movimiento.concepto === 'concepto'}
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="concepto-error" aria-live="polite" aria-atomic="true">
            {state.errors?.concepto &&
              state.errors.concepto.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/movmimientos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear movimiento</Button>
      </div>
    </form>
  );
}
