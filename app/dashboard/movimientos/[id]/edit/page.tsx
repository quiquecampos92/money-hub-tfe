import Form from '@/components/movimientos/edit-form';
import Breadcrumbs from '@/components/movimientos/breadcrumbs';
import { fetchMovimientoById } from '@/shared/middlewares/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Movimiento',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const movimiento = await fetchMovimientoById(id)

  if (!movimiento) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Movimientos', href: '/dashboard/movimientos' },
          {
            label: 'Edit movimientos',
            href: `/dashboard/movimientos/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form movimiento={movimiento} />
    </main>
  );
}
