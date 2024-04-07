import { createClient } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Revenue, Movimiento, Cuenta, User, MovimientoForm, CuentaForm } from '../interfaces/Interfaces';
import { auth } from '@/auth';

export async function getIdAuth() {
  noStore();
  const dataAuth = await auth();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const data = await client.query(`SELECT id FROM users WHERE email = '${dataAuth?.user?.email}' AND name = '${dataAuth?.user?.name}';`);

    return data.rows[0].id;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  } finally {
    await client.end();
  }

}
export async function getNameAuth() {
  noStore();
  const dataAuth = await auth();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const data = await client.query(`SELECT name FROM users WHERE email = '${dataAuth?.user?.email}' AND name = '${dataAuth?.user?.name}';`);

    return data.rows[0].name;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  } finally {
    await client.end();
  }

}

export async function getEmailAuth() {
  noStore();
  const dataAuth = await auth();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const data = await client.query(`SELECT email FROM users WHERE email = '${dataAuth?.user?.email}' AND name = '${dataAuth?.user?.name}';`);

    return data.rows[0].email;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  } finally {
    await client.end();
  }

}

export async function fetchRevenue() {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {

    const data = await client.query(`SELECT * FROM revenue;`);

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}

export async function fetchIdByCuenta(iban: string) {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const data = await client.query(`
      SELECT id 
      FROM cuentas
      WHERE iban = '${iban}';
      `
    );

    // console.log('Data:', data); // Agregar console.log para verificar los datos obtenidos
    // console.log('Data rows:', data.rows); // Agregar console.log para verificar las filas obtenidas

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}


export async function fetchMovimientosFromCuenta(iban = "todas", order: "ASC" | "DESC", limit = 20) {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    let query = `
      SELECT * FROM movimientos
      `;
      
    // Si iban es "todas", omitir la condición de cuenta_id
    if (iban !== "todas") {
      const idCuentaResult = await fetchIdByCuenta(iban);
      const idCuenta = idCuentaResult[0].id; // Suponiendo que solo necesitas el primer ID
      query += `
        WHERE cuenta_id = '${idCuenta}'
        `;
    }

    // Agregar el orden y límite
    query += `
      ORDER BY date ${order}
      LIMIT ${limit}
    `;

    const data = await client.query(query);

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error("Failed to get data");
  } finally {
    await client.end();
  }
}



export async function fetchCuentasIDS() {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();


  try {
    const id = await getIdAuth();

    if (!id) throw new Error("Failed to fetch user");

    const data = await client.query(`
      SELECT
        id
      FROM cuentas
      WHERE user_id = '${id}'
      ;`
    );

    const ids = data.rows.map((cuenta: Cuenta) => `'${cuenta.id}'`).join(',');

    return !ids ? null : `(${ids})`
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}

export async function fetchUsersIDS() {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();


  try {
    const id = await getIdAuth();

    if (!id) throw new Error("Failed to fetch user");

    const data = await client.query(`
      SELECT
        id
      FROM users
      WHERE id = '${id}'
      ;`
    );

    const ids = data.rows.map((user: User) => `'${user.id}'`).join(',');

    return !ids ? null : `(${ids})`
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}


export async function fetchMovimientos(order: "ASC" | "DESC", page = 1, limit = 10) {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const ids = await fetchCuentasIDS();

    if (!ids) return [];

    let query = `
      SELECT
        movimientos.id as id,
        movimientos.cuenta_id,
        movimientos.cantidad,
        movimientos.date,
        movimientos.concepto,
        movimientos.tipo,
        cuentas.user_id,
        cuentas.name,
        cuentas.accountnumber,
        cuentas.iban,
        cuentas.entidad,
        cuentas.saldo
      FROM movimientos
      JOIN cuentas ON movimientos.cuenta_id = cuentas.id
      WHERE cuenta_id IN ${ids}
      ORDER BY movimientos.date ${order}
    `;

    if (limit && page) {
      const offset = (page - 1) * limit;
      query += `
        LIMIT ${limit}
        OFFSET ${offset}
      `
    }

    const data = await client.query(query);

    return data.rows;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}

export async function fetchMovimientosFilter(concepto = "todos") {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const ids = await fetchCuentasIDS();

    if (!ids) return [];

    let query = `
      SELECT
        movimientos.id as id,
        movimientos.cuenta_id,
        movimientos.cantidad,
        movimientos.date,
        movimientos.concepto,
        movimientos.tipo
      FROM movimientos
      JOIN cuentas ON movimientos.cuenta_id = cuentas.id
      WHERE cuenta_id IN ${ids}
    `;

    if (concepto !== "todos") {
      query += `
        AND movimientos.concepto = '${concepto}'
        LIMIT 10
      `
    } else {
      query += `
        LIMIT 10
      `
    }

    const data = await client.query(query);

    return data.rows;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}

// export async function fetchMovFilterByCuenta(iban = "todos") {
//   noStore();

//   const client = createClient({
//     connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
//   });
//   await client.connect();

//   try {
//     const ids = await fetchCuentasIDS();

//     if (!ids) return [];

//     let query = `
//       SELECT
//         movimientos.id as id,
//         movimientos.cuenta_id,
//         movimientos.cantidad,
//         movimientos.date,
//         movimientos.concepto,
//         movimientos.tipo
//       FROM movimientos
//       JOIN cuentas ON movimientos.cuenta_id = cuentas.id
//       WHERE cuenta_id IN ${ids}
//     `;

//     if (iban !== "todos") {
//       query += `
//         AND movimientos.concepto = '${iban}'
//         LIMIT 10
//       `
//     } else {
//       query += `
//         LIMIT 10
//       `
//     }

//     const data = await client.query(query);

//     return data.rows;

//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error("Failed get data")
//   } finally {
//     await client.end();
//   }
// }

// export async function fetchCuentasFilter(iban = "todos") {
//   noStore();

//   const client = createClient({
//     connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
//   });
//   await client.connect();

//   try {
//     // const ids = await fetchUsersIDS();
//     const id = await getIdAuth();

//     if (!id) return [];

//     let query = `
//     SELECT
//       cuentas.id as id,
//       cuentas.user_id,
//       cuentas.name,
//       cuentas.accountnumber,
//       cuentas.iban,
//       cuentas.entidad,
//       cuentas.saldo
//     FROM cuentas
//     JOIN users ON cuentas.user_id = users.id
//     WHERE user_id ON ${id}
//         `;

//     if (iban !== "todos") {
//       query += `
//           AND cuentas.iban = '${iban}'
//           LIMIT 10
//           `
//     } else {
//       query += `
//           LIMIT 10
//           `
//     }

//     const data = await client.query(query);
//     return data.rows;

//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error("Failed get data")
//   } finally {
//     await client.end();
//   }
// }

export async function fetchMovimientoById(id: string) {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {

    const data = await client.query(`
      SELECT *
      FROM movimientos
      WHERE id = '${id}';
      ;`
    );


    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}

export async function fetchCountCuentasUser() {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const id = await getIdAuth();

    if (!id) throw new Error("Failed to fetch user");

    const data = await client.query(`
    SELECT 
      COUNT(*) AS total_cuentas
    FROM 
      cuentas
    WHERE 
      user_id = '${id}';
    `);

    return data.rows[0].total_cuentas;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}

export async function fetchCuentasUser(order: "ASC" | "DESC") {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const id = await getIdAuth();

    if (!id) throw new Error("Failed to fetch user");

    const data = await client.query(`
      SELECT
        *
      FROM cuentas
      WHERE user_id = '${id}'
      ORDER BY cuentas.entidad ${order}
    `);

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}

export async function fetchCuentaById(id: string) {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const data = await client.query(`
      SELECT *
      FROM cuentas
      WHERE id = '${id}';
    ;`
    );

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error("Failed get data")
  } finally {
    await client.end();
  }
}

const ITEMS_PER_PAGE = 10;


export async function fetchMovimientosPages() {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const ids = await fetchCuentasIDS();

    if (!ids) return [];

    const count = await client.query(`
    SELECT COUNT(*)
    FROM movimientos
    JOIN cuentas ON movimientos.cuenta_id = cuentas.id
    WHERE cuenta_id IN ${ids}
    `
    );

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  } finally {
    await client.end();
  }
}