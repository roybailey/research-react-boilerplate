const uuid = require('uuid');
const faker = require('faker');

const todos = [
  {
    id: uuid(),
    title: 'Do something useful',
    goal: 'get off my butt and do something productive',
    status: 'IN_PROGRESS',
  },
  {
    id: uuid(),
    title: `Phone ${faker.name.findName()}`,
    goal: 'Sell them something for loads of money',
    status: 'NOT_STARTED',
  },
  {
    id: uuid(),
    title: faker.lorem.words(),
    goal: faker.lorem.sentence(),
    status: 'NOT_STARTED',
  },
  {
    id: uuid(),
    title: faker.lorem.words(),
    goal: faker.lorem.sentence(),
    status: 'DONE',
  },
];

module.exports = todos;
