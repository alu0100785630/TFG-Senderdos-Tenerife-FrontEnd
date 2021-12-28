//Módulo en el core de node para obtener el path actual
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const glob = require('glob');

// const CopyPlugin = require('copy-webpack-plugin'); //Copy files
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
const cssExtractPlugin = require('mini-css-extract-plugin'); 
const ImageminPlugin = require('imagemin-webpack-plugin').default;  
const HtmlWebpackPlugin = require('html-webpack-plugin');  
const MinimizerJS = require('terser-webpack-plugin');  
const MinimizerCSS = require('css-minimizer-webpack-plugin'); 
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src')
}

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
          filename: outputFileName,
          minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true
          }
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
  mode: 'production',
  devtool: 'inline-source-map',
  entry: {
    vendor: "./src/js/plugins/vendor.js",
    index: "./src/js/index.js"
  },

  //Will give a warning for assets bigger than 1MB
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },

  //CSS & JS optimizer plugin
  optimization: {
    minimizer: [
      new MinimizerCSS(),
      new MinimizerJS()
    ]
  },

  plugins: [
    ...templates,

    new ImageminPlugin({ test: /\.(svg|png|jpg|jpeg|gif)$/ }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),

    new CleanWebpackPlugin(),

    new cssExtractPlugin({
      //We can do this only in prod
      filename: 'css/main_[fullhash].css'
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
  ],
  output: {
    filename: 'js/[name]_[fullhash].js',
    path: path.resolve(__dirname, 'prod'),
  },

  //File loaders
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
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
          cssExtractPlugin.loader,      
          'css-loader',           
          'sass-loader',           
          'import-glob-loader'
        ]
      }
    ]
  }

};