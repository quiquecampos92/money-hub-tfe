import Breadcrumbs from '@/components/movimientos/breadcrumbs';
import FormMovimientos from '@/components/movimientos/create-form-movimientos';
import { fetchCuentasUser } from '@/shared/middlewares/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Movimiento',
};

export default async function Page() {
  const cuentas = await fetchCuentasUser("ASC");

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Movimientos', href: '/dashboard/movimientos' },
          {
            label: 'Create Movimiento',
            href: '/dashboard/movimientos/create',
            active: true,
          },
        ]}
      />
      <FormMovimientos cuentas={cuentas} />
    </main>
  );
}
