import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteMovimiento } from '@/shared/middlewares/actions';
import { deleteCuenta } from '@/shared/middlewares/actions';

export function CreateMovimientos() {
  return (
<Link
  href="/dashboard/movimientos/create"
  className="inline-flex h-10 items-center rounded-lg bg-[#00A2DB] px-4 text-base font-semibold text-white overflow-hidden whitespace-nowrap transition-colors hover:bg-[#071F45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
>
  <span className="hidden md:block">Crear movimiento</span>
  {/* <PlusIcon className="h-5 md:ml-4" /> */}
</Link>
  );
}

export function UpdateMovimiento({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/movimientos/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteMovimiento({ id }: { id: string }) {
  const deleteMovimientoWithId = deleteMovimiento.bind(null, id);

  return (
    <form action={deleteMovimientoWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Eliminar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function CreateCuenta() {
  return (
<Link
  href="/dashboard/cuentas/create"
  className="inline-flex h-10 items-center rounded-lg bg-[#00A2DB] px-4 text-base font-semibold text-white overflow-hidden whitespace-nowrap transition-colors hover:bg-[#071F45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
>
  <span className="hidden md:block">Crear cuenta</span>
</Link>
  );
}

export function UpdateCuenta({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/cuentas/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCuenta({ id }: { id: string }) {
  const deleteCuentaWithId = deleteCuenta.bind(null, id);

  return (
    <form action={deleteCuentaWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Eliminar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

