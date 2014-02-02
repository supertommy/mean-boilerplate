'use strict';

module.exports = function(grunt)
{
	//load plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config: {
			public_dir: 'public',
			public_js: [
				'public/app/**/*.js',
				'public/js/**/*.js'
			],
			api_dir : 'api',
			api_js: [
				'api/**/*.js'
			],

			build_dir: 'build',
			compile_dir: 'bin',
		},

		clean: [
			'<%= config.build_dir %>',
			'<%= config.compile_dir %>'
		],

		copy: {
			angular: {
				files: [
					{
						expand: true,
						src: ['<%= config.public_dir %>/**/*'],
						dest: '<%= config.build_dir %>'
					}	
				]
			},

			api: {
				files: [
					{
						expand: true,
						src: ['<%= config.api_dir %>/**/*', 'routes/**/*', 'server.js'],
						dest: '<%= config.build_dir %>'
					}
				]
			}
		},

		jshint: {
			public_src: [
				'<%= config.public_js %>'
			],

			api_src: [
				'<%= config.api_js %>'
			],

			gruntfile: [
				'Gruntfile.js'
			],

			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				undef: true,
				globalstrict: true,
				maxcomplexity: 5,
				sub: true,
				boss: true,
				eqnull: true,
				browser: true,
				devel: true,
				node: true,
				globals: {
					'module': true,
					'angular': true
				}
			}
		},

		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					ext: 'js'
				}
			}
		},

		watch: {
			options: {
				livereload: false
			},

			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile'],
				options: {
					livereload: false
				}
			},

			public_src: {
				files: ['<%= config.public_js %>'],
				tasks: ['jshint:public_src'],
				options: {
					spawn: false
				}
			},

			api_src: {
				files: ['<%= config.api_js %>'],
				tasks: ['jshint:api_src'],
				options: {
					spawn: false
				}
			}
		},

		concurrent: {
			monitor: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	//register tasks
	grunt.registerTask('default', [
		'clean',
		'jshint',
		'concurrent:monitor'
	]);

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'copy'
	]);
};