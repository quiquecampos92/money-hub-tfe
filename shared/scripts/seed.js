const { createClient } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const { generateUsers } = require('../data/usersSeeds');
const { generateAccounts } = require('../data/cuentasSeeds');
const { generateMovimiento } = require('../data/movimientosSeeds');

const users = generateUsers();
const accounts = generateAccounts(users);
const movimientos = generateMovimiento(accounts);

const migrationUsers = async (client, users) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

        const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
      );
    `;

        console.log("Table created successfully");

        const insertUsers = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);

            return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword});
        `;
        }));

        console.log("Users inserted successfully");

        return { createTable, users: insertUsers };
    } catch (error) {
        console.error('Server error:', error);
    }
}

const migrationCuentas = async (client, accounts) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS cuentas (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            accountNumber VARCHAR(255) NOT NULL,
            iban VARCHAR(255) NOT NULL,
            entidad VARCHAR(255) NOT NULL,
            saldo TEXT NOT NULL DEFAULT '€0'
        );
    `;

        console.log("Table created successfully");

        const insertedCuentas = await Promise.all(
            accounts.map(
              (account) => client.sql`
              INSERT INTO cuentas (id, user_id, name, accountNumber, iban, entidad, saldo)
              VALUES (${account.id}, ${account.user_id}, ${account.name}, ${account.accountNumber}, ${account.iban}, ${account.entidad}, ${account.saldo})
              ON CONFLICT (id) DO NOTHING;
            `,
            ),
        );

        console.log("Accounts inserted successfully");

        return { createTable, cuentas: insertedCuentas };
    } catch (error) {
        console.error('Server error:', error);
    }
}

const migrationMovimientos = async (client, movimientos) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS movimientos (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        cuenta_id UUID NOT NULL REFERENCES cuentas(id) ON DELETE CASCADE,
        cantidad TEXT NOT NULL,
        date DATE NOT NULL,
        concepto VARCHAR(255) NOT NULL,
        tipo VARCHAR(255) NOT NULL
      );`;

        console.log("Table created successfully");

        const insertedMovimientos = await Promise.all(
            movimientos.map(
              (movimiento) => client.sql`
              INSERT INTO movimientos (id, cuenta_id, cantidad, date, concepto, tipo)
              VALUES (${movimiento.id}, ${movimiento.cuenta_id}, ${movimiento.cantidad}, ${movimiento.date}, ${movimiento.concepto}, ${movimiento.tipo})
              ON CONFLICT (id) DO NOTHING;
            `,
            ),
          );

        console.log("Movimientos inserted successfully");

        return { createTable, movimientos: insertedMovimientos };
    } catch (error) {
        console.error('Server error:', error);
    }
}

const main = async () => {
    const client = createClient({
        connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
    });
    await client.connect();

    await migrationUsers(client, users);
    await migrationCuentas(client, accounts);
    await migrationMovimientos(client, movimientos);

    await client.end();
}

main().then(() => {
    console.log("Migration completed");
}).catch((error) => {
    console.error("Error running migration:", error);
})