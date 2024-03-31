const { faker } = require('@faker-js/faker');


const gasto = ['Gasolina', 'Comida', 'Inversiones', 'Seguros', 'Impuestos', 'Tarjeta', 'Educacion', 'Salud', 'Ropa', 'Hogar', 'Transporte', 'Viajes', 'Regalos', 'Mascotas', 'Tecnologia', 'Deportes', 'Otros'];
const ingreso = ['Inversiones', 'Salario', 'Prestamo', 'Ventas', 'Premios', 'Subvenciones', 'Dividendos', 'Ayudas', 'Reembolsos', 'Otros'];

function generateTipo (concepto) {
  if(ingreso.includes(concepto)) return 'ingreso';

  return 'gasto';
}

function generateMovimiento(accounts) {
    const movimientos = [];

    for (let i = 0; i < accounts.length; i++) {
        const total = faker.number.int({ min: 5, max: 15 })

        for (let j = 1; j <= total; j++) {
          const concepto = faker.helpers.arrayElement([...ingreso, ...gasto]);

          const movimiento = {
            id: faker.string.uuid(),
            cuenta_id: accounts[i].id,
            cantidad: faker.finance.amount({ min: 30, max: 300, dec: 2, symbol: '€' }),
            date: faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-12-31T00:00:00.000Z' }),
            concepto: concepto,
            tipo: generateTipo(concepto),
          };
          movimientos.push(movimiento);
        }
    }

    return movimientos;
}

module.exports = { generateMovimiento };