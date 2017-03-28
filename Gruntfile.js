module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({

        versionNumber: "1.0",

        // Wipe out previous builds.
        clean: ["dist/"],

        // Run your source code through JSHint's defaults.
        jshint: ["app/**/*.js"],



        // This task uses James Burke's excellent r.js AMD builder to take all
        // modules and concatenate them into a single file.
        requirejs: {
            release: {
                options: {
                    mainConfigFile: ["app/config.js", "app/widgetconfig.js"],
                    generateSourceMaps: true,
                    include: ["main"],
                    insertRequire: ["main"],
                    out: "dist/source.min.js",
                    optimize: "uglify2",
                    //optimize: "none",

                    // Since we bootstrap with nested `require` calls this option allows
                    // R.js to find them.
                    findNestedDependencies: true,

                    // Include a minimal AMD implementation shim.
                    name: "almond",

                    // Setting the base url to the distribution directory allows the
                    // Uglify minification process to correctly map paths for Source
                    // Maps.
                    baseUrl: "dist/app",

                    // Wrap everything in an IIFE.
                    wrap: true,

                    // Do not preserve any license comments when working with source
                    // maps.  These options are incompatible.
                    preserveLicenseComments: false
                }
            }
        },

        // This task simplifies working with CSS inside Angular Boilerplate
        // projects.  Instead of manually specifying your stylesheets inside the
        // HTML, you can use `@imports` and this task will concatenate only those
        // paths.
        styles: {
            // Out the concatenated contents of the following styles into the below
            // development file path.
            "dist/app/styles/styles.css": {
                // Point this to where your `index.css` file is location.
                src: "app/styles/index.css",

                // The relative path to use for the @imports.
                paths: ["app/styles"]

                // Rewrite image paths during release to be relative to the `img`
                // directory.
                // forceRelative: "/app/img/"
            }
        },

        // Minfiy the distribution CSS.
        cssmin: {
            release: {
                files: {
                    "dist/app/styles/styles.min.css": ["dist/app/styles/styles.css"]
                }
            }
        },


        serve: {
            options: {
                port: 9000
            }
        },


        processhtml: {
            release: {
                files: {
                    "dist/index.html": ["index.html"]
                }
            }
        },

        // Move vendor and app logic during a build.
        copy: {
            release: {
                files: [
                    {
                        src: ["app/**"],
                        dest: "dist/"
                    },
                    {
                        src: "vendor/**",
                        dest: "dist/"
                    }
                ]
            },

            buildHack: {
                files: [{
                        src: 'app/readme.md',
                        dest: 'dist/',
                        flatten: true,
                        expand: true
                },
                    {
                        src: "vendor/bower/bootstrap/fonts/*",
                        dest: "dist/app/fonts",
                        expand: true,
                        flatten: true,
                        cwd: '.',
                        filter: 'isFile'
                    }]
            }
        },

        compress: {
            release: {
                options: {
                    archive: "dist/source.min.js.gz"
                },

                files: ["dist/source.min.js"]
            }
        },

        cacheBust: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 16,
                rename: true,
                baseDir: 'dist/'
            },
            files: {
                src: ['dist/index.html'],
                dest: 'dist/'

            }
        }

    });

    // Grunt contribution tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Grunt bbb tasks.
    grunt.loadNpmTasks("grunt-bbb-styles");

    // Third-party tasks.
    grunt.loadNpmTasks("grunt-processhtml");
    grunt.loadNpmTasks("grunt-cache-bust");
    grunt.loadNpmTasks('grunt-serve');


    // When running the default Grunt command, just lint the code.
    grunt.registerTask("default", [
        "clean",
        "jshint",
        "processhtml",
        "copy:release",
        "requirejs",
        "styles",
        "cssmin",
        "cacheBust",
        "copy:buildHack"
    ]);
};