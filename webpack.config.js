const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';
const IS_DEVELOPMENT = NODE_ENV === 'development';

const paths = {
  SRC: path.join(__dirname, './src'),
  DOCS_SRC: path.join(__dirname, './docs-src'),
  DOCS_JS: path.join(__dirname, './docs-src/js'),
  DOCS_SCSS: path.join(__dirname, './docs-src/scss'),
  DOCS_ASSETS: path.join(__dirname, './docs-src/assets'),
  DOCS_DIST: path.join(__dirname, './docs'),
};

// Default docs app entry file
const entry = [
  path.join(paths.DOCS_JS, 'index.js'),
];

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      IS_PRODUCTION: JSON.stringify(IS_PRODUCTION),
      IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(paths.DOCS_SRC, 'index.html'),
    path: paths.DOCS_DIST,
    filename: 'index.html',
  }),
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  {
    test: /\.html$/,
    use: [
      'html-loader?interpolate',
    ],
  },
  // SVG
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'html-loader',
      },
    ],
  },
  // Images and videos
  {
    test: /\.(png|gif|jpg|svg|mp4|webm|ogg|ogv)$/,
    include: paths.ASSETS,
    use: 'file-loader?name=assets/[name].[ext]',
  },
  // Fonts
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    include: paths.FONTS,
    use: 'file-loader?name=fonts/[name].[ext]',
  },
];

//
// Development
//

if (IS_DEVELOPMENT) {
  // Development plugins
  plugins.push(
    // Enables HMR
    new webpack.HotModuleReplacementPlugin()
  );

  // In development we add 'react-hot-loader' for .js/.jsx files
  // Check rules in config.js
  rules[0].use.unshift('react-hot-loader/webpack');
  entry.unshift('react-hot-loader/patch');

  // Development rules
  rules.push(
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }
  );
}

//
// Production
//

if (IS_PRODUCTION) {
  // Production rules
  rules.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      }),
    }
  );

  // Shared production plugins
  plugins.push(
    // Extract CSS to file
    new ExtractTextPlugin('style.css'),
    // Compress docs javascript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    })
  );
}

module.exports = {
  devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
  context: paths.DOCS_SRC,
  entry,
  output: {
    path: paths.DOCS_DIST,
    filename: 'docs.js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      paths.DOCS_ASSETS,
      paths.DOCS_JS,
      paths.DOCS_SCSS,
      paths.DOCS_SRC,
      paths.SRC,
    ],
  },
  plugins,
  devServer: {
    contentBase: IS_PRODUCTION ? paths.DOCS_DIST : paths.DOCS_SRC,
    historyApiFallback: true,
    compress: IS_PRODUCTION,
    inline: !IS_PRODUCTION,
    hot: !IS_PRODUCTION,
    host: '0.0.0.0',
    overlay: true,
    disableHostCheck: true, // to enable testing from local network
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
    },
  },
};
