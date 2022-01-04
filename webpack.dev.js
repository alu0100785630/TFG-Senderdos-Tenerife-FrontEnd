//Módulo en el core de node para obtener el path actual
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //Elimina ficheros del dist (clean)
const ImageminPlugin = require('imagemin-webpack-plugin').default;  //Optimize images
const HtmlWebpackPlugin = require('html-webpack-plugin');  //Crea instancias de diferentes ficheros en el output


let templates = [];
let fileExtensionPug = 'pug';
let fileExtensionHtml = 'html';
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

function setTemplatesToRender(fileList, outputFileName, templates, fileExtension){
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
}
fileListPug = findFilesByExtension('./src',fileExtensionPug);
fileListHtml = findFilesByExtension('./src',fileExtensionHtml);
setTemplatesToRender(fileListPug, outputFileName, templates, fileExtensionPug);
setTemplatesToRender(fileListHtml, outputFileName, templates, fileExtensionHtml);


module.exports = {
  mode: 'development',
  entry: {
    index: "./src/js/index.js"
  },


  output: {
    filename: '[name]_[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  watchOptions: {
    ignored: 'node_modules/**'
  },

  plugins: [
    ...templates,
    
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

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    

    //We inlcude vendor.js because we don't expect to do much changes there. It'd be deleted otherwise.
    new CleanWebpackPlugin({ 
      cleanAfterEveryBuildPatterns: ['!img/*', '!fonts/*'],
      cleanStaleWebpackAssets: true,
      verbose: true 
    }),

  ],

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
        test: /\.html$/,
        use: ['html-loader']
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
            publicPath: '../img',
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'fonts',
          publicPath: '../fonts',
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'import-glob-loader'
        ]
      }
    ]
  }

};