'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import sync from 'run-sequence';
import rename from 'gulp-rename';
import template from 'gulp-template';
import fs from 'fs';
import yargs from 'yargs';
import lodash from 'lodash';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import del from 'del';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';
import rsync from 'gulp-rsync';
import replace from 'gulp-replace-task';
import gulpProtractorAngular from 'gulp-angular-protractor';


let root = 'client';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
    return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
    return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
let paths = {
    js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
    styl: resolveToApp('**/*.styl'), // stylesheets
    html: [
        resolveToApp('**/*.html'),
        path.join(root, 'index.html')
    ],
    entry: [
        'babel-polyfill',
        path.join(__dirname, root, 'app/app.js')
    ],
    output: root,
    blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
    dest: path.join(__dirname, 'dist')
};

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], (cb) => {
    const config = require('./webpack.dist.config');
    config.entry.app = paths.entry;

    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            colors: colorsSupported,
            chunks: false,
            errorDetails: true
        }));

        cb();
    });
});

gulp.task('serve', () => {
    const config = require('./webpack.dev.config');
    config.entry.app = [
        // this modules required to make HRM working
        // it responsible for all this webpack magic
        'webpack-hot-middleware/client?reload=true',
        // application entry point
    ].concat(paths.entry);

    var compiler = webpack(config);

    serve({
        port: process.env.PORT || 3000,
        open: false,
        server: { baseDir: root },
        middleware: [
            historyApiFallback(),
            webpackDevMiddelware(compiler, {
                stats: {
                    colors: colorsSupported,
                    chunks: false,
                    modules: false
                },
                publicPath: config.output.publicPath
            }),
            webpachHotMiddelware(compiler)
        ]
    });
});

gulp.task('watch', ['serve']);

gulp.task('component', () => {
    const cap = (val) => {
        return val.charAt(0).toUpperCase() + val.slice(1);
    };
    const name = yargs.argv.name;
    const parentPath = yargs.argv.parent || '';
    const destPath = path.join(resolveToComponents(), parentPath, name);

    return gulp.src(paths.blankTemplates)
        .pipe(template({
            name: name,
            upCaseName: cap(name)
        }))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('temp', name);
        }))
        .pipe(gulp.dest(destPath));
});

gulp.task('clean', (cb) => {
    del([paths.dest]).then(function(paths) {
        gutil.log("[clean]", paths);
        cb();
    })
});

gulp.task('default', ['watch']);

// Setting up the test task 
gulp.task('protractor', ['serve'], (cb) => {
    gulp
        .src(['example_spec.js'])
        .pipe(gulpProtractorAngular({
            'configFile': 'protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', cb);
});


gulp.task('e2e', ['protractor'], () => {
    process.exit();
});

gulp.task('divekarlskrona', ['webpack'], () => {
    gulp.src(['dist/index.html'])
        .pipe(replace({
            patterns: [{
                match: /\<base href=\"\/\"\>/g,
                replacement: '<base href="/divekarlskrona/">'
            }]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('deployH', ['divekarlskrona'], () => {
    gulp.src('dist/**')
        .pipe(rsync({
            root: 'dist/',
            hostname: 'hackserver.patrickziegler.se',
            destination: '~/Sites/divekarlskrona',
            archive: true,
            silent: false,
            compress: true
        }));
});
gulp.task('deployR', ['divekarlskrona'], () => {
    gulp.src('dist/**')
        .pipe(rsync({
            root: 'dist/',
            hostname: 'patrickziegler.se',
            port: 6969,
            destination: '~/Sites/divekarlskrona',
            archive: true,
            silent: false,
            compress: true
        }));
});
