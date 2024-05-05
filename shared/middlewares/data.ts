import { createClient } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Revenue, Movimiento, Cuenta, User, MovimientoForm, CuentaForm } from '../interfaces/Interfaces';
import { auth } from '@/auth';
import { date } from 'zod';

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


export async function fetchMovimientosFromCuenta(iban = "todas", order: "ASC" | "DESC", limit = 100) {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    let query = `
      SELECT movimientos.*, cuentas.accountnumber, cuentas.iban, cuentas.entidad
      FROM movimientos
    `;

    if (iban !== "todas") {
      const idCuentaResult = await fetchIdByCuenta(iban);
      const idCuenta = idCuentaResult[0].id; // Suponiendo que solo necesitas el primer ID

      query += `
        JOIN cuentas ON movimientos.cuenta_id = cuentas.id
        WHERE cuentas.iban = '${iban}'
      `;
    } else {
      query += `
        JOIN cuentas ON movimientos.cuenta_id = cuentas.id
      `;
    }

    query += `
      ORDER BY movimientos.date ${order}
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

export async function fetchMovimientosByDateFromCuenta(month = "", year = "", iban = "todas", order: "ASC" | "DESC", limit = 100) {
  noStore();
 
  const client = createClient({
     connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();
 
  try {
     let query = `
       SELECT movimientos.*, cuentas.iban, cuentas.entidad
       FROM movimientos
     `;
 
     // Inicializa una variable para almacenar las condiciones WHERE
     let whereConditions = [];
 
     // Si iban no es "todas", agrega la condición para filtrar por IBAN
     if (iban !== "todas") {
       const idCuentaResult = await fetchIdByCuenta(iban);
       const idCuenta = idCuentaResult[0].id; // Suponiendo que solo necesitas el primer ID
       whereConditions.push(`cuentas.iban = '${iban}'`);
     }
 
     // Si month y year tienen valor, agrega las condiciones para filtrar por mes y año
     if (month && year) {
       whereConditions.push(`EXTRACT(MONTH FROM movimientos.date) = ${month}`);
       whereConditions.push(`EXTRACT(YEAR FROM movimientos.date) = ${year}`);
     }
 
     // Si hay condiciones WHERE, agrega la cláusula WHERE a la consulta
     if (whereConditions.length > 0) {
       query += `
         JOIN cuentas ON movimientos.cuenta_id = cuentas.id
         WHERE ${whereConditions.join(' AND ')}
       `;
     } else {
       query += `
         JOIN cuentas ON movimientos.cuenta_id = cuentas.id
       `;
     }
 
     query += `
       ORDER BY movimientos.date ${order}
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

const ITEMS_PER_PAGE = 10;

export async function fetchMovimientos({
  order, 
  page = 1, 
  limit = 10, 
  tipo = "todos",
  cuentas = "todas",
  fechas,
  concepto = "todos",
} : {
  order: "ASC" | "DESC",
  page?: number,
  limit?: number,
  tipo?: "todos" | "ingreso" | "gasto"
  cuentas?: "todas" | string,
  fechas?: { start: string | undefined, end: string | undefined },
  concepto?: string
}) {
  noStore();

  const client = createClient({
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  });
  await client.connect();

  try {
    const ids = await fetchCuentasIDS();

    if (!ids) return [];
    
    const queryTipo = tipo === "todos" ? '(\'ingreso\', \'gasto\')' : `('${tipo}')`;
    const queryCuenta = cuentas === "todas" ? ids : `('${cuentas}')`;

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
      WHERE cuenta_id IN ${queryCuenta}
      AND movimientos.tipo IN ${queryTipo}
    `;

    if(fechas?.start && fechas?.end && concepto === "todos") {
      query += `
        AND movimientos.date BETWEEN '${fechas?.start}' AND '${fechas?.end}'
        ORDER BY movimientos.date ${order}
      `
    } else if (fechas?.start && fechas?.end && concepto !== "todos") {
      query += `
        AND movimientos.date BETWEEN '${fechas?.start}' AND '${fechas?.end}'
        AND movimientos.concepto = '${concepto}'
        ORDER BY movimientos.date ${order}
      `
    } else if ((!fechas?.start || !fechas?.end) && concepto !== "todos") {
      query += `
        AND movimientos.concepto = '${concepto}'
        ORDER BY movimientos.date ${order}
      `
    }
    else if (!fechas?.start || !fechas?.end && concepto === "todos") {
      query += `
        ORDER BY movimientos.date ${order}
      `
    }

    if (limit && page) {  
      const offset = (page - 1) * limit;
      query += `
        LIMIT ${limit}
        OFFSET ${offset}
      `
    }
    
    const data = await client.query(query);

    const queryArray = query.split('FROM')
    queryArray[0] = 'SELECT COUNT(*) FROM'
    const queryCount = queryArray.join('')
      ?.replace('JOIN cuentas ON movimientos.cuenta_id = cuentas.id', '')
      ?.replace('ORDER BY movimientos.date ASC', '')
      ?.replace('ORDER BY movimientos.date DESC', '')
      ?.replace('LIMIT 10', '')
      ?.replace('OFFSET 10', '')
      ?.replace('OFFSET 20', '')
      ?.replace('OFFSET 30', '')
      ?.replace('OFFSET 40', '')
      ?.replace('OFFSET 50', '')
      ?.replace('OFFSET 60', '')
      ?.replace('OFFSET 70', '')
      ?.replace('OFFSET 80', '')

    const count = await client.query(queryCount)

    return {
      data: data.rows,
      total: count.rows[0].count
    };
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