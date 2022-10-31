const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Adding Webpack plugin to generate HTML and inject our bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      new WebpackPwaManifest({
				name: 'JATE',
				short_name: 'JATE',
				description: 'Just Another Text Editor',
				display: 'standalone',
        theme_color: '#554eb5',
				background_color: '#554eb5',
        publicPath: '/',
				start_url: '/',
				fingerprints: false,
				inject: true
			}),
      // Service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      })
    ],
    

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          }
        },
      ],
    },
  };
};
