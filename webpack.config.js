//Módulo en el core de node para obtener el path actual
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //Elimina ficheros del dist (clean)
const cssExtractPlugin = require('mini-css-extract-plugin'); //Extrae CSS en un fichero
const OptimizeCSS = require('optimize-css-assets-webpack-plugin'); // Minify CSS
const CopyPlugin = require('copy-webpack-plugin'); //Copy files
const ImageminPlugin = require('imagemin-webpack-plugin').default;  //Optimize images
const HtmlWebpackPlugin = require('html-webpack-plugin');  //Crea instancias de diferentes ficheros en el output
const MinimizerJS = require('terser-webpack-plugin');  //Minify JS


let templates = [];
let fileExtension = 'pug';
let outputFileName = '';

function findFilesByExtension (base, ext , files, result) {
    files = files || fs.readdirSync(base);
    result = result || []; 

    files.forEach( 
      function (file) {
        var newbase = path.join(base,file);
        if ( fs.statSync(newbase).isDirectory()){
          result = findFilesByExtension(newbase,ext,fs.readdirSync(newbase),result);
        }
        else {
          if ( file.substr(-1*(ext.length+1)) == '.' + ext ) {
            result.push(newbase);
          } 
        }
      });
    return result;
}

fileList = findFilesByExtension('./src',fileExtension);

fileList.forEach(file => {
  let fileName = path.basename(file);
  if (!fileName.startsWith('_')) {
    if(fileName == 'base.pug') outputFileName = file.replace('src/', '').replace(fileName, 'index.html');
    else outputFileName = file.replace('src/', '').replace(fileExtension, '') + 'html'
    templates.push(
      new HtmlWebpackPlugin({
        template: file,
        filename: outputFileName
      })
    );
  }
});

//Siempre empieza por module.exports
module.exports = {
  //Esto le dice a webpack que no minifique el código
  //Si lo ponemos en 'production' se minificarán los ficheros.
  mode: 'development',
  //Ficheros que escucha
  entry: {
    index: "./src/js/index.js",
    vendor: "./src/js/plugins/vendor.js"
  },

  //CSS optimizer plugin
  optimization: {
    minimizer: [
      new OptimizeCSS(),
      new MinimizerJS()
    ]
  },

  plugins: [
    ...templates,
    // new HtmlWebpackPlugin({
    //   // filename: 'html/base.html',
    //   // inject: true
    // }),
    // new CopyPlugin({
    //   patterns: [
    //     // {
    //     //   from: 'fonts/**/*',
    //     //   context: path.resolve(__dirname, 'src', ''),
    //     //   noErrorOnMissing: true
    //     // },
    //     // {
    //     //   from: '**/*.php',
    //     //   context: path.resolve(__dirname, 'src', ''),
    //     //   noErrorOnMissing: true
    //     // },
    //   ],
    // }),

    // new ImageminPlugin({ test: /\.(svg|png|jpg|jpeg|gif)$/ }),

    //Importa jquery ==> Lo que hace es mapear el $ a la librería instalada con npm
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),

    new CleanWebpackPlugin(),

    // new cssExtractPlugin({
    //   //We can do this only in prod
    //   filename: '[name].css'
    // })
  ],
  output: {
    //Nombre del fichero compilado
    //[hash] crea un id único para evitar que el navegador haga cache en el fichero.
    //name será el nombre del fichero definido en el entrypoint: main o vendor
    filename: '[name]_[fullhash].js',
    //Nombre del directorio compilado
    path: path.resolve(__dirname, 'dist'),
    //publicPatch makes the same file location for everything
    // publicPath: './'
  },


  //File loaders
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: { pretty: true }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: 'img',
            //This should be an automatic public path
            publicPath: 'img',
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'fonts',
          //This should be an automatic public path
          publicPath: 'fonts',
        }
      },
      {
        //Si un fichero termina por .css, usará los siguientes loaders
        test: /\.css$/,
        //css-loader ==> Traduce el css
        //style-css ==> Inyecta el css en <style> tag
        use: [
          'style-loader', 
          // cssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        //Mismo funcionamiento pero para SASS
        test: /\.scss$/,
        //El orden importa
        use: [
          // cssExtractPlugin.loader,  //3. Extract CSS into files
          'style-loader',        //3. Inyect styles into DOM
          'css-loader',             //2. Turns CSS into commonjs
          'sass-loader',             //1. Turns SASS into CSS
          'import-glob-loader'
        ]
      }
    ]
  }

};