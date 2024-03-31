const { faker } = require('@faker-js/faker');

function generateAccounts(users) {
    const entities = ['BBVA', 'Santander', 'Sabadel', 'Caixabank'];
    const cuentas = [];

    for (let i = 0; i < users.length; i++) {
        for (let j = 1; j <= 3; j++) {
          const cuenta = {
            id: faker.string.uuid(),
            user_id: users[i].id,
            name: users[i].name,
            accountNumber: faker.finance.accountNumber(7),
            iban: faker.finance.iban({ formatted: true, countryCode: 'ES' }),
            entidad: faker.helpers.arrayElement(entities),
            saldo: faker.finance.amount({ min: 0, max: 3000, dec: 2, symbol: '€' })
          };
          cuentas.push(cuenta);
        }
    }

    return cuentas;
}

module.exports = { generateAccounts };