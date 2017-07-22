var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var SpritesmithPlugin = require('webpack-spritesmith')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main.js')
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  devtool: 'inline-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  watch: true,
  plugins: [
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: 'vendor'/* chunkName= */,
        filename: 'vendor.bundle.js'/* filename= */
      }
    ),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './build']
      }
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'assets/preload'),
        glob: '**/*.png'
      },
      target: {
        image: path.resolve(__dirname, 'dist/preload.png'),
        css: [[path.resolve(__dirname, 'dist/preload.json'), {
          format: 'json_texture'
        }]]
      },
      spritesmithOptions: {
        padding: 2
      }
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'assets/images'),
        glob: '**/*.png'
      },
      target: {
        image: path.resolve(__dirname, 'dist/atlas.png'),
        css: [[path.resolve(__dirname, 'dist/atlas.json'), {
          format: 'json_texture'
        }]]
      },
      spritesmithOptions: {
        padding: 2
      }
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.png$/, use: ['file-loader?name=i/[hash].[ext]'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}
