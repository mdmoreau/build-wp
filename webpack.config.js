const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const host = 'site.localhost';

const svgo = {
  multipass: true,
  plugins: [
    {
      cleanupIDs: {
        minify: false,
      },
    },
    { removeViewBox: false },
    { removeDimensions: true },
  ],
};

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
    filename: 'js/[name].js',
  },
  devServer: {
    hot: true,
    open: true,
    host,
    proxy: {
      '/': {
        target: `http://${host}`,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyRes,
      },
    },
    before: (app, server) => {
      server._watch('**/*.php'); // eslint-disable-line
    },
    writeToDisk: (filePath) => /^(?!.*(hot)).*/.test(filePath),
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
          {
            loader: 'svgo-loader',
            options: svgo,
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
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
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-import',
                  'postcss-mixins',
                  ['postcss-preset-env', {
                    features: {
                      'custom-media-queries': true,
                      'custom-selectors': true,
                      'nesting-rules': true,
                    },
                  }],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
              }],
              ['@babel/preset-react'],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/img',
          to: 'img',
          noErrorOnMissing: true,
        },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/,
      svgo,
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
    config.plugins.push(new OptimizeCssAssetsPlugin({ cssProcessorPluginOptions: { preset: ['default', { mergeRules: false }] } }));
  }
  return config;
};
