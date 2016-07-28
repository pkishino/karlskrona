module.exports = function(config) {
    config.set({
        // base path used to resolve all patterns
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        // list of files/patterns to load in the browser
        files: [{ pattern: 'spec.bundle.js', watched: false }],

        // files to exclude
        exclude: [],

        plugins: [
            require("karma-chai"),
            require("karma-chrome-launcher"),
            require("karma-mocha"),
            require("karma-mocha-reporter"),
            require("karma-sourcemap-loader"),
            require("karma-webpack"),
            require("karma-coverage")
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'] },

        webpack: {
            isparta: {
                embedSource: true,
                noAutoWrap: true
            },
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel!isparta' },
                    { test: /\.html$/, loader: 'raw' },
                    { test: /\.styl$/, loader: 'style!css!stylus?paths=node_modules/bootstrap-styl' },
                    { test: /\.css$/, loader: 'style!css' },
                    { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
                    { test: /\.json$/, loader: 'json' },
                    { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
                ],
            }
        },

        webpackServer: {
            noInfo: true // prevent console spamming when running in Karma!
        },

        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        // web server port
        port: 9876,

        // enable colors in the output
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // toggle whether to watch files and rerun tests upon incurring changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // if true, Karma runs tests once and exits
        singleRun: true
    });
};
