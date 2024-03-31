'use client';

import {
  BanknotesIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../button';
import { useFormState } from 'react-dom';
import { updateCuenta } from '@/shared/middlewares/actions';
import { Cuenta } from '@/shared/interfaces/Interfaces';

export default function EditCuentaForm({
  cuenta,
}: {
  cuenta: Cuenta;
}) {
  const initialState = { message: null, errors: {} };
  const updateCuentaWithId = updateCuenta.bind(null, cuenta.id);
  const [state, dispatch] = useFormState(updateCuentaWithId, initialState);

  return (
    <form action={dispatch}>
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
    <div className="mb-4">
        <label htmlFor="accountnumber" className="mb-2 block text-sm font-medium">
          Numero de cuenta
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="accountnumber"
              name="accountnumber"
              type="text"
              defaultValue={cuenta.accountnumber}
              placeholder="Escribe el numero de cuenta"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="accountnumber-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <div id="accountnumber-error" aria-live="polite" aria-atomic="true">
          {state.errors?.accountnumber &&
            state.errors.accountnumber.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Iban Cuenta */}
      <div className="mb-4">
        <label htmlFor="iban" className="mb-2 block text-sm font-medium">
          Iban
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="iban"
              name="iban"
              type="text"
              defaultValue={cuenta.iban}
              placeholder="Escribe el iban"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="iban-error"
            />
            <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <div id="iban-error" aria-live="polite" aria-atomic="true">
          {state.errors?.iban &&
            state.errors.iban.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Entidad cuenta */}
      <div className="mb-4">
        <label htmlFor="entidad" className="mb-2 block text-sm font-medium">
          Escribe una entidad
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="entidad"
              name="entidad"
              type="text"
              defaultValue={cuenta.entidad}
              placeholder="Escribe una entidad"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="entidad-error"
            />
            <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <div id="entidad-error" aria-live="polite" aria-atomic="true">
          {state.errors?.entidad &&
            state.errors.entidad.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Saldo cuenta */}
      <div className="mb-4">
        <label htmlFor="saldo" className="mb-2 block text-sm font-medium">
          Saldo inicial
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="saldo"
              name="saldo"
              type="number"
              defaultValue={Number(cuenta.saldo.replace("€", ""))}
              placeholder="Escoje una saldo"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="saldo-error"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <div id="saldo-error" aria-live="polite" aria-atomic="true">
          {state.errors?.saldo &&
            state.errors.saldo.map((error: string) => (
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
          href="/dashboard/cuentas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar movimiento</Button>
      </div>
    </form>
  );
}
