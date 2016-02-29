module.exports = function (grunt) {
    "use strict";

    var pkg  = grunt.file.readJSON("package.json"),
        date = new Date();

    grunt.initConfig({
        meta: {
            banner: '/*! ' + pkg.name + ' ' + pkg.version + ' - ' + pkg.description + ' | (c) ' + date.getFullYear() + ' ' + pkg.author + ' | ' + pkg.licenses[0].type + ' License */'
        },
        cssmin: {
            target: {
                files: {
                    'public/css/style.min.css': ['public/css/style.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
            },
            target: {
                files: {
                    'public/js/app.min.js': ['public/js/app.js']
                }
            }
        },
        watch: {
            css: {
                files: ['public/css/style.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['public/js/app.js'],
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'cssmin', 'uglify', ]);
};
