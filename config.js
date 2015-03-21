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

// Eexpose the API
module.exports = {
    src: {
        js: srcBase.js + "**/*.*",
        vendor: srcBase.vendor + "**/*.*",
        images: srcBase.images + "**/*.*",
        sass: srcBase.sass + "**/*.*",
        src: srcBase.src,
        passiveFiles: "./passive_files/**"
    },

    dist: {
        js: "./" + baseDir + "/assets/js",
        vendor: "./" + baseDir + "/assets/vendor",
        images: "./" + baseDir + "/assets/images",
        sass: "./" + baseDir + "/assets",
        passiveFiles: "./" + baseDir
    },

    watch: {
        js: srcBase.js + "**",
        vendor: srcBase.vendor + "**",
        images: srcBase.images + "**",
        sass: srcBase.sass + "**",
        src: srcBase.src
    },

    githubPage: {
        remoteUrl: "https://github.com/kronik3r/kronik3r.github.io.git",
        branch: "master",
        baseDir: "./output_prod/**/*"
    },

    env: env,
    baseDir: baseDir,
};