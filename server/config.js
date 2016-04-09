import dotenv from 'dotenv';
import getenv from 'getenv';
import path from 'path';

// load env file
dotenv.config();

const Config = getenv.multi({
  env: 'NODE_ENV',
  host: 'SERVER_HOST',
  port: 'SERVER_PORT',
});

const Dir = {
  src: path.resolve(__dirname),
  app: path.resolve(__dirname, '..', 'app'),
  public: path.resolve(__dirname, '..', 'www'),
  build: path.resolve(__dirname, '..', 'www', 'build'),
  static: path.resolve(__dirname, '..', 'www', 'static'),
};

export { Config, Dir };
