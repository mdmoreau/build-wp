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
    open: true,
    host,
    watchFiles: ['**/*.php'],
    proxy: {
      '/': {
        target: `http://${host}`,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyRes,
      },
    },
    devMiddleware: {
      publicPath,
      writeToDisk: (filePath) => /img\//.test(filePath),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/source',
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
  target: ['web', 'es5'],
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.unshift(new CleanWebpackPlugin());
  }
  return config;
};
