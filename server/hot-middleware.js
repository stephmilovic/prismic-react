import config from '~/webpack.config.babel';
import webpack from 'webpack';
import wdm from 'webpack-dev-middleware';
import whm from 'webpack-hot-middleware';

const compiler = webpack(config);

const middleware = [
  whm(compiler),
  wdm(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    quiet: false,
    stats: {
      colors: true,
    },
  }),
];

export { middleware as hotMiddleware };
