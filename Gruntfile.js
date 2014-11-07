module.exports = function(grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            controllers: {
                src: ['app/src/js/init.js', 'app/src/js/components/**/ctrl.js'],
                dest: 'app/dist/js/controllers.js'
            },
            directives: {
                src: ['app/src/js/shared/directives/*.js'],
                dest: 'app/dist/js/directives.js'
            },
            services: {
                src: ['app/src/js/components/**/service.js'],
                dest: 'app/dist/js/services.js'
            },
            filters: {
                src: ['app/src/js/shared/filters.js'],
                dest: 'app/dist/js/filters.js'
            }
        },

        clean: {
            dist_js: {
                    src: [
                            'app/dist/*'
                    ]
            }
        },  

        jshint: {
            options: {
                    strict: true,
                    expr: true,
                    onecase: true,
                    maxcomplexity: 8,
                    curly: false,     //change
                    eqeqeq: false, //change
                    forin: true,
                    //   immed: true,
                    // indent : 4,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    noempty: false, //change
                    nonew: false,
                    //      quotmark : true, //'single', //change
                    regexp: true,
                    undef: true,
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    window: true,
                    define: true
                }
            },
            uses_defaults: ['Gruntfile.js', 'app/src/js/**/*.js']
        },  

        compass: {
            src: {
                options: {
                    sassDir: 'app/src/css/sass/',
                    cssDir: 'app/src/css/'
                }
            }
        },

        copy: {
            src: {
                files: [
                    {expand: true, cwd: 'app/src/', src: ['**', '!css/sass/**', '!js/components/**', '!js/shared/**'], dest: 'app/dist/'}
                ]
            }
        },

        uglify: {
            options: {
                mangle: false
            },

            dist: {
               files: [{
                  expand: true,
                  cwd: 'app/dist/js',
                  src: '**/*.js',
                  dest: 'app/dist/js'
              }]
            }
        },

        watch: {
            dev: {
                files: ['<%= jshint.uses_defaults %>', 'app/src/css/sass/*.scss'],
                tasks: ['compass', 'clean:dist_js', 'copy', 'concat', 'concat_css']
            },
            prod: {
                files: ['<%= jshint.uses_defaults %>', 'app/src/css/sass/*.scss'],
                tasks: ['compass', 'clean:dist_js', 'copy', 'concat', 'cssmin', 'uglify']
            }
        },

        concat_css: {
            all: {
                src: ["app/dist/css/app.css"],
                dest: "app/dist/css/app.min.css"
            }
        },

        cssmin: {
            combine: {
                files: {
                    'app/dist/css/app.min.css': ['app/dist/css/bootstrap-3.min.css', 'app/dist/css/app.css', 'app/dist/css/animations.css', 'app/dist/css/jquery-ui.custom.min.css', 'app/dist/css/font-awesome.css']
                }
            },
            minify: {
                src: ['app/dist/css/app.min.css'],
                dest: 'app/dist/css/app.min.css'
            }
        }

    });

    grunt.registerTask('shared', ['clean:dist_js', 'compass', 'copy', 'concat']);
    grunt.registerTask('jenkins-dev', ['shared', 'concat_css']);
    grunt.registerTask('jenkins-prod', ['shared', 'uglify', 'cssmin']);
    grunt.registerTask('dev', ['shared', 'concat_css', 'watch:dev']);
    grunt.registerTask('default', ['shared', 'uglify', 'cssmin', 'watch:prod']);

};