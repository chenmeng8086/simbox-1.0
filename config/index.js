'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: '.',
    // 去掉"/"
    assetsPublicPath: '',
    proxyTable: [{
      context: '/mock',
      // 代理的后台地址
      // target: 'http://10.10.83.30:9090/',
      target: 'http://10.11.65.24:9090',
      // target: 'http://10.11.84.42:8080/',
      pathRewrite: {'/mock': ''},
      changeOrigin: true,
      // gai
      secure: false,
      headers: {
        Referer: 'http://10.11.65.24:9090'
      },
      onProxyReq(proxyReq,req,res){
        // proxyReq.setHeader('Cookie','JSESSIONID=6E2DAA2F12EA3AC1AFFF43A6B5639940')
        proxyReq.setHeader('Cookie','JSESSIONID=PnWrEIeL8Pxmn5_p0BAcwUmbFdtIL44ohV7eLgX_')
      }
    }],

    // Various Dev Server settings
    // host: '0.0.0.0', // can be overwritten by process.env.HOST
    // host:'localhost',
    // host:'10.11.84.41',
    host: 'localhost',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true, //can be opened the browser, if the value is setted true
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '.',
    // 去掉"/"
    assetsPublicPath: '',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
