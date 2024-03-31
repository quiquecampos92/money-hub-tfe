
import Breadcrumbs from '@/components/movimientos/breadcrumbs';
import EditCuentaForm from '@/components/movimientos/edit-form-cuenta';
import { fetchCuentaById } from '@/shared/middlewares/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Movimiento',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const cuenta = await fetchCuentaById(id)

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cuentas', href: '/dashboard/cuentas' },
          {
            label: 'Edit cuentas',
            href: `/dashboard/cuentas/${id}/edit`,
            active: true,
          },
        ]}
      />

      <EditCuentaForm cuenta={cuenta} /> 
    </main>
  );
}
