module.exports = function (grunt) {
    pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
        cssmin: {
            with_banner: {
                options: {
                    banner: '/* \n' +
                        '--------------------------------------\n' +
                        'Behance Portfolio Page                \n' +
                        '--------------------------------------\n' +
                        '+ https://github.com/pinceladasdaweb/Behance-Portfolio-Page \n' +
                        '+ version 1.0.0 \n' +
                        '+ Copyright 2014 Pedro Rogerio \n' +
                        '+ Licensed under the MIT license \n' +
                        '\n' +
                        '+ Documentation: https://github.com/pinceladasdaweb/Behance-Portfolio-Page \n' +
                        '*/'
                },
                files: {
                    'assets/css/style.min.css': ['assets/css/style.css']
                }
            }
        },
        uglify: {
            options: {
                preserveComments: 'all'
            },
            src: {
                files: {
                    'assets/js/app.min.js': ['assets/js/app.js']
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'cssmin', 'uglify' ]);
};
