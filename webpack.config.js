const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|.webpack)/,
        enforce: 'pre',
        use: [
          {
            loader: 'ts-loader',
            // options: {
            //   transpileOnly: true
            // }
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
           {
             loader: 'url-loader',
             options: {
               limit: 8192,
             }
           },
         ],
         type: 'javascript/auto'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { 
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      }
    ],
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, './src/utils'),
      assets: path.resolve(__dirname, './src/assets'),
      store: path.resolve(__dirname, './src/store'),
      hooks: path.resolve(__dirname, './src/hooks'),
      data: path.resolve(__dirname, './src/data')
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new Dotenv(),
  ],
}
