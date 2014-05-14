module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * GoodFest v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2010-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',

    clean: {
      dist: ['dist']
    },

    copy: {
      html: {
        expand: true,
        cwd: 'static/',
        src: '**.html',
        dest: 'dist/'
      }
    },

    concat: {
      options: {
        stripBanners: false
      },
      dist: {
        src: [
          'static/js/jquery-2.1.1.js',
          'static/js/jquery.swfobject.1-1-1.js',
          'static/js/site.js',
          'static/js/nav.js',
          'static/js/video.js'
        ],
        dest: 'dist/js/site.js'
      }
    },

    uglify: {
      options: {
        report: 'min',
        preserveComments: 'some'
      },
      site: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= concat.dist.dest %>',
        dest: 'dist/js/site.min.js'
      },
      html5shiv: {
        src: 'static/js/html5shiv.js',
        dest: 'dist/js/html5shiv.min.js'
      }
    },

    less: {
      dist: {
        options: {
          strictMath: true,
          strictUnits: true,
          sourceMap: true,
          cleancss: true,
        },
        files: {'dist/css/goodfest.min.css': 'static/less/goodfest.less'}
      }
    },

    autoprefixer: {
      dist: {
        src: 'dist/css/goodfest.min.css'
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      css: {
        files: {
          src: ['dist/css/goodfest.min.css']
        }
      },
      js: {
        files: {
          src: ['dist/js/site.js']
        }
      }
    },

    imagemin: {
      imgs: {
        files: [{
          expand: true,
          cwd: 'static/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/img/'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      src: {
        files: 'static/js/**.js',
        tasks: 'dist-js'
      },
      imgs: {
        files: 'static/img/**',
        tasks: 'imagemin'
      },
      less: {
        files: 'static/less/**',
        tasks: 'dist-css'
      },
      html: {
        files: 'static/**.html',
        tasks: 'copy'
      }
    }
  });

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.registerTask('dist-js', ['concat', 'uglify', 'usebanner:js']);
  grunt.registerTask('dist-css', ['less', 'autoprefixer', 'usebanner:css']);
  grunt.registerTask('default', ['clean', 'copy', 'imagemin', 'dist-css', 'dist-js']);
}
