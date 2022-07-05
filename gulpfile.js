// СТРУКТУРА ПРОЕКТА:
// Исходники : "./app/" :
/*
  - "./app/pug/" - папка pug файлов блоков и страниц
  - "./app/scss/" - папка scss файлов
  - "./app/fonts/" - папка fonts файлов проекта
  - "./app/images/" - папка неоптимизированных изображений
  - "./app/scripts/" - папка скриптов
*/
// Продакшен: "./dist/"
/*	
  - "./dist/" - корень сайта с html и папками
  - "./dist/fonts/" - папка шрифтов файлов проекта
  - "./dist/styles/" - папка с минифицированными стилями
  - "./dist/scripts/" - папка минифицированных скриптов
  - "./dist/images/" - папка оптимизированных изображений
*/

import pkg from 'gulp'
const { gulp, src, dest, parallel, series, watch: gulpWatch } = pkg

import browserSync from 'browser-sync'
import bssi from 'browsersync-ssi'
import pug from 'gulp-pug'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import named from 'vinyl-named'
import TerserPlugin from 'terser-webpack-plugin'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import sassglob from 'gulp-sass-glob'
const sass = gulpSass(dartSass)
import postCss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin'
import changed from 'gulp-changed'
import concat from 'gulp-concat'
import del from 'del'

const pathCurrent = process.cwd();
const pathModx = `C:/OpenServer/domains/gorkiy-live.local/`;
const pathModxTemplate = `${pathModx}assets/template/`;


// Для разработки, НЕ связанной с Modx
function browsersync() {
  browserSync.init({
    server: {
      baseDir: './dist/',
      middleware: bssi({ baseDir: './dist/', ext: '.html' })
    },
    // ghostMode: { clicks: false },
    notify: false,
    online: true,
    // tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
    ghostMode: false,
  })
}
// Для разработки, связанной с Modx
// function browsersync() {
//   browserSync.init({
//     // server: {
//     //   baseDir: './dist/',
//     //   middleware: bssi({
//     //     baseDir: './dist/',
//     //     ext: '.html'
//     //   })
//     // },
//     proxy: "gorkiy-live.local",
//     open: "external",
//     // ghostMode: { clicks: false },
//     notify: false,
//     online: true,
//     // tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
//     ghostMode: false,
//   })
// }

function buildPug() {
  return src(['app/pug/*.pug', "!app/pug/layout.pug", "!app/pug/variables.pug"])
    // .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('./dist/'))
    .pipe(dest(pathModxTemplate))
    .pipe(browserSync.stream())
}

function styles() {
  return src(['app/scss/**/main.scss'])
    .pipe(sassglob())
    .pipe(sass({
      'include css': true,
      outputStyle: 'expanded'
    }))
    .pipe(postCss([
      autoprefixer({
        grid: 'autoplace',
        overrideBrowserslist: ['last 3 versions'],
        cascade: false
      }),
    ]))
    .pipe(dest('./dist/styles/'))
    .pipe(dest(`${pathModxTemplate}styles/`))
    .pipe(postCss([
      cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
    ]))
    .pipe(concat('main.min.css'))
    .pipe(dest('./dist/styles/'))
    .pipe(dest(`${pathModxTemplate}styles/`))
    .pipe(browserSync.stream())
}

function scripts() {
  return src(['app/scripts/*.js'])
    .pipe(named())
    .pipe(webpackStream({
      mode: 'production',
      performance: { hints: false },
      // plugins: [
      //   new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }), // jQuery (npm i jquery)
      // ],
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['babel-plugin-root-import']
              }
            }
          }
        ]
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: { format: { comments: false } },
            extractComments: false
          })
        ],

      },
      output: {
        filename: '[name].min.js',
      },
    }, webpack)).on('error', (err) => {
      this.emit('end')
    })
    // .pipe(concat('main.min.js'))
    .pipe(dest('./dist/scripts/'))
    .pipe(dest(`${pathModxTemplate}scripts/`))
    .pipe(browserSync.stream())
}

function images() {
  return src(['app/images/**/*'])
    .pipe(changed('./dist/images/'))
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      mozjpeg({
        progressive: true,
        quality: 80
      }),
      optipng(),
      svgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: true
          },
          {
            name: 'cleanupIDs',
            active: false
          }
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(dest('./dist/images/'))
    .pipe(dest(`${pathModxTemplate}images/`))
    .pipe(browserSync.stream())
}

function fonts() {
  return src(['app/fonts/**/*'])
    .pipe(dest('./dist/fonts/'))
    .pipe(dest(`${pathModxTemplate}fonts/`))
    .pipe(browserSync.stream())
}
function favicon() {
  return src(['app/favicon/**/*'])
    .pipe(dest('./dist/favicon/'))
    .pipe(dest(`${pathModxTemplate}favicon/`))
    .pipe(browserSync.stream())
}

async function cleandist() {
  del('./dist/**/*', { force: true })
}

function startwatch() {
  gulpWatch(['./app/pug/**/*.pug'], { usePolling: true }, buildPug)
  gulpWatch(['./app/scss/**/*.scss'], { usePolling: true }, styles)
  gulpWatch(['./app/scripts/**/*.js'], { usePolling: true }, scripts)
  gulpWatch(['./app/images/**/*'], { usePolling: true }, images)
  gulpWatch(['./app/fonts/**/*'], { usePolling: true }, fonts)
  gulpWatch(['./app/favicon/**/*'], { usePolling: true }, favicon)
  gulpWatch(['./dist/**/*.*'], { usePolling: true }).on('change', browserSync.reload)
}

const build = series(cleandist, parallel(images, scripts, buildPug, styles, fonts, favicon))
const watch = series(cleandist, parallel(images, scripts, buildPug, styles, fonts, favicon), parallel(browsersync, startwatch))


export { build, watch }
export default watch;