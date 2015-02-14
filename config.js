// Parsing the args
var minimist = require('minimist');
var options = minimist(
    process.argv.slice(2),
    {
        string: 'env',
        default: { env: 'dev' }
    }
);

// Seeting up the base dir depending on the environment
var env     = options.env;
var baseDir = 'output_' + env;

var srcBase = {
    js: "./assets/js/",
    vendor: "./assets/vendor/",
    images: "./assets/images/",
    sass: "./assets/sass/",
    src: "./source/**"
};

module.exports = {
    src: {
        js: srcBase.js + "**/*.*",
        vendor: srcBase.vendor + "**/*.*",
        images: srcBase.images + "**/*.*",
        sass: srcBase.sass + "**/*.*",
        src: srcBase.src
    },

    dist: {
        js: "./" + baseDir + "/assets/js",
        vendor: "./" + baseDir + "/assets/vendor",
        images: "./" + baseDir + "/assets/images",
        sass: "./" + baseDir + "/assets"
    },

    watch: {
        js: srcBase.js + "**",
        vendor: srcBase.vendor + "**",
        images: srcBase.images + "**",
        sass: srcBase.sass + "**",
        src: srcBase.src
    },

    env: env,
    baseDir: baseDir,
};