'use server';

import { z } from 'zod';
import { createClient } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getIdAuth } from './data';
import bcrypt from 'bcrypt';

//MOVIMIENTOS

const FormSchema = z.object({
  id: z.string(),
  cuenta_Id: z.string({
    invalid_type_error: 'Cuenta requerida.',
  }),
  cantidad: z.coerce
    .number()
    .gt(0, { message: 'Ingrese una cantidad mayor a 0' }),
  concepto: z.string({
    invalid_type_error: 'Ingrese un concepto del movimiento.',
  }),
  tipo: z.string({
    invalid_type_error: 'Ingrese un tipo de movimiento.',
  }),
  date: z.string(),
});

const FormUpdateSchema = z.object({
  id: z.string(),
  cantidad: z.coerce
    .number()
    .gt(0, { message: 'Ingrese una cantidad mayor a 0' }),
  concepto: z.string({
    invalid_type_error: 'Ingrese un concepto del movimiento.',
  }),
  tipo: z.string({
    invalid_type_error: 'Ingrese un tipo de movimiento.',
  }),
  date: z.string(),
});

const CreateMovimiento = FormSchema.omit({ id: true, date: true });
const UpdateMovimiento = FormUpdateSchema.omit({ date: true, id: true });

// This is temporary
export type State = {
  errors?: {
    cuenta_Id?: string[];
    cantidad?: string[];
    concepto?: string[];
    user_Id?: string[];
    name?: string[];
    iban?: string[];
    entidad?: string[];
    saldo?: string[];
    date?: string[];
    accountnumber?: string[];
    password?: string[];
    confirmPassword?: string[];
    email?: string[];
    tipo?: string[];
  };
  message?: string | null;
};

export async function createMovimiento(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateMovimiento.safeParse({
    cuenta_Id: formData.get('cuenta_Id'),
    cantidad: formData.get('cantidad'),
    concepto: formData.get('concepto'),
    tipo: formData.get('tipo'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Movimiento.',
    };
  }

  // Prepare data for insertion into the database
  const { cuenta_Id, cantidad, concepto, tipo } = validatedFields.data;
  // const cantidadInCents = cantidad * 100;
  const cant = `€${cantidad}`;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    await client.sql`
      INSERT INTO movimientos (cuenta_id, cantidad, concepto, tipo, date)
      VALUES (${cuenta_Id}, ${cant}, ${concepto}, ${tipo}, ${date})
    `;

    revalidatePath('/dashboard/movimientos');
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Movimiento.',
    };
  } finally {
    await client.end();
  }

  redirect('/dashboard/movimientos');
}

export async function updateMovimiento(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateMovimiento.safeParse({
    cantidad: formData.get('cantidad'),
    concepto: formData.get('concepto'),
    tipo: formData.get('tipo'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Movimiento.',
    };
  }

  const { cantidad, concepto, tipo } = validatedFields.data;
  const cant = `€${cantidad}`;

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    await client.sql`
    UPDATE movimientos
    SET cantidad = ${cant}, concepto = ${concepto}, tipo = ${tipo}
    WHERE id = ${id}
    `;

    revalidatePath('/dashboard/movimientos');
  } catch (error) {
    return { message: 'Database Error: Failed to Update Movimiento.' };
  } finally {
    await client.end();
  }

  redirect('/dashboard/movimientos');
}

export async function deleteMovimiento(id: string) {

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    await client.sql`DELETE FROM movimientos WHERE id = ${id}`;

    revalidatePath('/dashboard/movimientos');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Movimiento.' };
  } finally {
    await client.end();
  }
}

const FormSchemaCuentas = z.object({
  id: z.string(),
  user_Id: z.string(),
  name: z.string(),
  iban: z.string({
    invalid_type_error: 'Iban requerido.',
  }),
  accountnumber: z.string({
    invalid_type_error: 'Número de cuenta requerido.',
  }),
  entidad: z.string({
    invalid_type_error: 'Entidad requerida.',
  }),
  saldo: z.coerce
    .number()
    .gt(0, { message: 'Ingrese una cantidad mayor a 0' }),
});

const FormSchemaUpdateCuentas = z.object({
  id: z.string(),
  iban: z.string({
    invalid_type_error: 'Iban requerido.',
  }),
  accountnumber: z.string({
    invalid_type_error: 'Número de cuenta requerido.',
  }),
  entidad: z.string({
    invalid_type_error: 'Entidad requerida.',
  }),
  saldo: z.coerce
  .number()
  .gt(0, { message: 'Ingrese una cantidad mayor a 0' }),
});

//CUENTAS

const CreateCuenta = FormSchemaCuentas.omit({ id: true, user_Id: true, name: true });
const UpdateCuenta = FormSchemaUpdateCuentas.omit({ id: true });

export async function createCuenta(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCuenta.safeParse({
    accountnumber: formData.get('accountnumber'),
    iban: formData.get('iban'),
    entidad: formData.get('entidad'),
    saldo: formData.get('saldo'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Cuenta.',
    };
  }

  // Prepare data for insertion into the database
  const { accountnumber, iban, entidad, saldo } = validatedFields.data;
  const sal = `€${saldo}`;

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();
  // Insert data into the database
  try {
    const data = await auth();
    const id = await getIdAuth();

    await client.sql`
      INSERT INTO cuentas (user_id, name, accountnumber, iban, entidad, saldo)
      VALUES (${id}, ${data?.user?.name}, ${accountnumber}, ${iban}, ${entidad}, ${sal})
    `;

    revalidatePath('/dashboard/cuentas');
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    
    return {
      message: 'Database Error: Failed to Create Cuenta.',
    };
  } finally {
    await client.end();
  }

  redirect('/dashboard/cuentas');
}

export async function updateCuenta(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateCuenta.safeParse({
    accountnumber: formData.get('accountnumber'),
    iban: formData.get('iban'),
    entidad: formData.get('entidad'),
    saldo: formData.get('saldo'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Cuenta.',
    };
  }

  const { accountnumber, iban, entidad, saldo } = validatedFields.data;
  const sal = `€${saldo}`;

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    await client.sql`
    UPDATE cuentas
    SET accountnumber = ${accountnumber}, iban = ${iban}, entidad = ${entidad}, saldo = ${sal}
    WHERE id = ${id}
    `;

    revalidatePath('/dashboard/cuentas');
  } catch (error) {
    return { message: 'Database Error: Failed to Update Cuenta.' };
  }finally {
    await client.end();
  }

  redirect('/dashboard/cuentas');
}

export async function deleteCuenta(id: string) {
  // throw new Error('Failed to Delete Movimiento');
  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    await client.sql`DELETE FROM cuentas WHERE id = ${id}`;
    console.log('Eliminando cuenta con ID:', id);

    revalidatePath('/dashboard/cuentas');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Cuenta.' };
  }finally {
    await client.end();
  }
}

const FormSchemaUser = z.object({
  name: z.string({invalid_type_error: 'El nombre es requerido.'}),
  email: z.string({ invalid_type_error: "El email es requerido."}).email('Ingrese un email válido.'),
  password: z.string({invalid_type_error: "La contraseña es requerida."}).min(6, {message: 'La contraseña debe tener al menos 6 caracteres.'}),
  confirmPassword: z.string({invalid_type_error: "La contraseña es requerida."}).min(6, {message: 'La contraseña debe tener al menos 6 caracteres.'})
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Las contraseñas no coinciden.'
})

//USER

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = FormSchemaUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { name, email, password } = validatedFields.data;

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();
  // Insert data into the database
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await client.sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword});
    `;

    console.log("Usuario creado correctamente")

    revalidatePath('/');
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    
    return {
      message: 'Database Error: Failed to Register User.',
    };
  } finally {
    await client.end();
  }

  redirect('/');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

