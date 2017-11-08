const path = require('path');

 module.exports = {
     entry: './src/js/main.js',
     output: {
         path: path.resolve(__dirname, 'bin'),
         filename: 'script.js',
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                 presets: ['react']
             }
         }]
     },
     resolve: {
         alias: {'react/lib/ReactDom': 'react-dom/lib/ReactDom'},
         extensions: ['.js', '.jsx']
     }
 }