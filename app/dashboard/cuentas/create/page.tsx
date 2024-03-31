;import Form from '@/components/movimientos/create-form';
import Breadcrumbs from '@/components/movimientos/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Cuenta',
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cuentas', href: '/dashboard/cuentas' },
          {
            label: 'Crear Cuenta',
            href: '/dashboard/cuentas/create',
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
