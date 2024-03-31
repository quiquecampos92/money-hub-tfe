const { faker } = require('@faker-js/faker');

function generateUsers() {
  const users = [];

  for (let i = 0; i < 10; i++) {
        const user = {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: "000000",
        };
        users.push(user);
  }

  return users;
}

module.exports = { generateUsers };