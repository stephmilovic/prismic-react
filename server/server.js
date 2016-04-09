import isDev from 'isdev';
import path from 'path';
import http from 'http';
import express from 'express';
import serveStatic from 'serve-static';
import favicon from 'serve-favicon';

import { Config, Dir } from './config';
import { logServerConfig } from './logger';
import { hotMiddleware } from './hot-middleware';

const app = express();
const server = http.createServer(app);

// use ejs template engine on express
app.set('view engine', 'ejs');

// loading the hot-middleware
if (isDev) app.use(hotMiddleware);

app
  .use('/build', serveStatic(Dir.build))
  .use('/static', serveStatic(Dir.static))
  .use(favicon(path.join(Dir.public, 'favicon.ico')));

app.get('*', (req, res) => {
  const index = path.join(Dir.public, 'index');
  res
    .status(200)
    .render(index, {
      build: isDev ? null : '/build',
    });
});

server
    .listen(
      Config.port,
      Config.host,
    (err) => logServerConfig(err));

