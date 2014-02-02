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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config: {
			public_dir: 'public',
			public_js: [
				'public/app/**/*.js'
			],
			api_dir: 'api',
			api_js: [
				'api/**/*.js'
			],

			routes_dir: 'routes',
			routes_js: [
				'routes/**/*.js'
			],

			build_dir: 'build'
		},

		clean: [
			'<%= config.build_dir %>'
		],

		copy: {
			public: {
				files: [
					{
						expand: true,
						src: [
							'<%= config.public_dir %>/**/*'
						],
						dest: '<%= config.build_dir %>'
					}	
				]
			},

			api: {
				files: [
					{
						expand: true,
						src: ['<%= config.api_dir %>/**/*', '<%= config.routes_dir %>/**/*', 'server.js'],
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
		},

		index: {
			dev: {
				dir: '<%= config.build_dir %>',
				src: [
					'<%= config.public_js %>'
				]
			}		
		},
	

		concat: {
			build_public: {
				src: ['<%= config.public_dir %>/app/**/*.js'],
				dest: '<%= config.build_dir %>/public/app/app.min.js'
			}
		},

		uglify: {
			build: {
				files: {
					'<%= config.build_dir %>/api/api.min.js': [

					]
				}
			}
		}
	});

	//register tasks
	grunt.registerTask('default', [
		'clean',
		'jshint',
		'index:dev',
		'concurrent:monitor'
	]);

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'copy'
	]);

	//custom tasks
	grunt.registerMultiTask('index', 'create the index.html file', function()
	{
		var jsFiles = this.filesSrc.map(function(file)
		{
			return file.replace('public/', '');
		});

		grunt.file.copy('public/index.tpl.html', 'public/index.html', {
			process: function(contents, path)
			{
				return grunt.template.process(contents, {
					data: {
						scripts: jsFiles
					}
				});
			}
		});
	});
};