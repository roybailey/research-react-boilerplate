/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const uuid = require('uuid');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
const faker = require('faker');
const todos = [
  {
    id: uuid(),
    title: 'Do something useful',
    goal: 'get off my butt and do something productive',
    status: 'NOT_STARTED',
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
];
const todoRouter = express.Router();
todoRouter.get('/', (req, res) => {
  res.json(todos);
});
app.use('/api/todo', todoRouter);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
