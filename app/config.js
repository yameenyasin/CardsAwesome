// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.

require.config({
    paths: {
        "vendor": "../vendor",
        "almond": "../vendor/bower/almond/almond",
        "angular": "../vendor/bower/angular/angular",
        "angular-route": "../vendor/bower/angular-route/angular-route",
        "jquery": "../vendor/bower/jquery/dist/jquery",
        "bootstrap": "../vendor/bower/bootstrap/dist/js/bootstrap"
    },

    shim: {
        // This is required to ensure AngularJS works as expected within the AMD
        // environment.
        "angular": {
            exports: "angular"
        },
        "angular-route": {
            deps: ["angular"]
        },
        "jquery": {
            exports: '$'
        },
        // Twitter Bootstrap depends on jQuery.
        "bootstrap": {
            deps: ['jquery']
        }

    }
});