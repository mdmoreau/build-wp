const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const host = 'site.localhost';
const publicPath = '/wp-content/themes/site/dist/';

const onProxyRes = function onProxyRes(proxyRes, req, res) {
  const bodyChunks = [];
  proxyRes.on('data', (chunk) => {
    bodyChunks.push(chunk);
  });
  proxyRes.on('end', () => {
    const body = Buffer.concat(bodyChunks);
    res.status(proxyRes.statusCode);
    Object.keys(proxyRes.headers).forEach((key) => {
      res.append(key, proxyRes.headers[key]);
    });
    if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html')) {
      let html = body.toString();
      html = html.replace(new RegExp(host, 'g'), `${host}:8080`);
      res.send(Buffer.from(html));
    } else {
      res.send(body);
    }
    res.end();
  });
};

const config = {
  entry: {
    main: ['./src/css/main.css', './src/js/main.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    hot: true,
    open: true,
    host,
    publicPath,
    proxy: {
      '/': {
        target: `http://${host}`,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyRes,
      },
    },
    before: (app, server) => {
      // eslint-disable-next-line
      server._watch('**/*.php');
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/img',
          to: 'img',
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.unshift(new CleanWebpackPlugin());
  }
  if (!(env && env.WEBPACK_SERVE)) {
    config.target = ['web', 'es5'];
  }
  return config;
};
