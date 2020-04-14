const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cssLoader = "css-loader";

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('tailwindcss')(),
      require('autoprefixer')()
    ]
  }
};

module.exports = function (env) {
  const production = env === 'production' || process.env.NODE_ENV === 'production';
  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-maps' : 'inline-source-map',
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'entry-bundle.[hash].js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
      hot: false,
      http2: false,
      inline: true,
      historyApiFallback: true,
      open: false,
      port: 3000,
      lazy: false
    },
    module: {
      rules: [
        { test: /\.scss$/i, use: ["style-loader", cssLoader, postcssLoader, { loader: "sass-loader", options: { sassOptions: { includePaths: ["node_modules"] } } }] },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        { test: /\.html$/i, use: '@aurelia/webpack-loader', exclude: /node_modules/ },
        { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 4096, mimetype: 'application/font-woff2' } },
        { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 4096, mimetype: 'application/font-woff' } },
        { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.ejs' }),
      new CopyWebpackPlugin([
        { from: 'static', to: path.resolve(__dirname, 'dist/static'), ignore: ['.*'] },
        { from: 'src/favicon.ico', to: path.resolve(__dirname, 'dist/favicon.ico') }
      ])
    ]
  }
}
