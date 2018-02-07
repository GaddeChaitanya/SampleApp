
module.exports = function(grunt) { // Wrapper function
  
  const mozjpeg = require('imagemin-mozjpeg');
      // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          mangle: false //Use this to not to rename the function names or variables in the minified file.
        },
        build: {
          src: 'src/**/*.js',
          dest: 'build/app.min.js'
        }
      },
      /* minify css file*/
      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'build/css/style.css': ['src/**/*.css']
          }
        },
        my_target: {
          files:[{
              expand:true,
              cwd:'src/',
              src:['sass/*.css'],
              dest:'buid/css/',
              ext:'.min.css'
          }]
        }
      },
    //removing Un used css
      uncss: {
        dist: {
          files: {
              'build/css/tidy.css': ['src/**/*.html']
          }
        }
      },

      //Minifying images
      imagemin: {
        static: {
            options: {
                optimizationLevel: 3,
                svgoPlugins: [{removeViewBox: false}],
                use: [mozjpeg()] // Example plugin usage 
            },
            files: {
                'build/images/2.jpg': 'src/**/*.jpg',
                'build/images/3.gif': 'src/**/*.gif'
            }
        },
        dynamic: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'build/dynamicImages/'
            }]
        }
      },

      //Minify html
      htmlmin: {                                     // Task
        dist: {                                      // Target
          options: {                                 // Target options
            removeComments: true,
            collapseWhitespace: true
          },
          files: {                                   // Dictionary of files
            'build/index.html': 'src/*.html',     // 'destination': 'source'
            'build/about.html': 'src/**/about.html',
            'build/customView.html': 'src/**/customView.html',
            'build/home.html': 'src/**/home.html'
          }
        },
        dev: {                                       // Another target
            files: [{
              expand: true,
              cwd: 'app',
              src: ['src/**/*.html', '*.html'],
              dest: 'dist'
          }]
        }
      }
  
    });    
     // A very basic default task.
    grunt.registerTask('default', 'Log some stuff.', function() {
      grunt.log.write('Logging some stuff...').ok();
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
   
        
    // Default task(s).
    grunt.registerTask('default', ['uglify','cssmin','uncss', 'imagemin','htmlmin']);
    
    };