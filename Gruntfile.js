/**
 * Created by pl on 8/28/15.
 */

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['client/src/js/**/*.js']
        },
        concat:{
            options:{
                separator: ';'
            },
            dist: {
                src: ['client/src/js/*.js'],
                dest: 'client/src/compiled/compiled.js'
            }
        },
        uglify: {
            options: {
                banner: '/*Created by Peter/FU*/'
            },
            dist:{
                files:{
                    'client/static/dist/API.js' : ['<%= concat.dist.dest %>']
                }
            }
        },
        less: {
            development: {
                options: {
                    banner: '/*Created by Peter/FU*/'
                },
                files:[{
                    expand: true,
                    cwd: 'client/src/less',
                    src: ['*.less'],
                    dest: 'client/src/compiled',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            target:{
                files: [{
                    expand:true,
                    cwd: 'client/src/compiled',
                    src: ['*css', '!*.min.css'],
                    dest: 'client/static/dist',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            files: ['client/src/js/**/*.js', 'client/src/less/**/*.less'],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less', 'cssmin', 'watch']);
};