const uuid = require('uuid');
const faker = require('faker');

const todos = [
  {
    id: uuid(),
    category: 'work',
    title: 'Do something useful',
    goal: 'get off my butt and do something productive',
    status: 'IN_PROGRESS',
  },
  {
    id: uuid(),
    category: 'work',
    title: `Phone ${faker.name.findName()}`,
    goal: 'Sell them something for loads of money',
    status: 'NOT_STARTED',
  },
  {
    id: uuid(),
    category: 'work',
    title: faker.lorem.words(),
    goal: faker.lorem.sentence(),
    status: 'NOT_STARTED',
  },
  {
    id: uuid(),
    category: 'work',
    title: faker.lorem.words(),
    goal: faker.lorem.sentence(),
    status: 'FINISHED',
  },
  {
    id: uuid(),
    category: 'home',
    title: 'Do something housework',
    goal: 'get off the couch',
    status: 'IN_PROGRESS',
  },
  {
    id: uuid(),
    category: 'home',
    title: `Buy too much stuff`,
    goal: 'Fill the house then buy a bigger house',
    status: 'FINISHED',
  },
  {
    id: uuid(),
    category: 'home',
    title: faker.lorem.words(),
    goal: faker.lorem.sentence(),
    status: 'NOT_STARTED',
  },
  {
    id: uuid(),
    category: 'home',
    title: faker.lorem.words(),
    goal: faker.lorem.sentence(),
    status: 'IN_PROGRESS',
  },
];

module.exports = todos;
