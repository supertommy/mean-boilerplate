'use strict';

module.exports = function(grunt)
{
	//load plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');
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
			public_lib_js: [
				'public/lib/angular/angular.js',
				'public/lib/angular/angular-route.js'
			],
			public_css: [
				'public/css/**/*.css'
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
							'<%= config.public_dir %>/**/*',
							'!<%= config.public_dir %>/*.html'
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

		karma: {
			options: {
				files: [
					'public/lib/angular/angular.js',
					'public/lib/angular/angular-route.js',
					'public/lib/angular-mocks/angular-mocks.js',
					'public/app/**/*.js',
					'tests/**/*.spec.js'
				],
				reporters: 'dots',
				frameworks: ['jasmine'],
				plugins: [
					'karma-chrome-launcher',
					'karma-jasmine'
				],
				autoWatch: false,
				port: 9018,
				runnerPort: 9100,
				colors: true,
				browsers: [
					'Chrome'
				]
			},

			unit: {
				runnerPort: 9101,
				port: 9877,
				background: true
			},

			continuous: {
				singleRun: true
			}
		},

		nodemon: {
			dev: {
				script: 'server/server.js',
				options: {
					ext: 'js',
					watch: [
						'server',
						'api'
					]
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
				tasks: [
					'jshint:public_src',
					'karma:unit:run'
				],
				options: {
					spawn: false
				}
			},

			api_src: {
				files: ['<%= config.api_js %>'],
				tasks: [
					'jshint:api_src',
					'karma:unit:run'
				],
				options: {
					spawn: false
				}
			},

			tests: {
				files: [
					'<%= karma.options.files %>'
				],
				tasks: [
					'karma:unit:run'
				]
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
				dir: '<%= config.public_dir %>',
				src: [
					'<%= config.public_lib_js %>',
					'<%= config.public_js %>',
					'<%= config.public_css %>'
				]
			},

			build: {
				dir: '<%= config.build_dir %>/<%= config.public_dir %>',
				src: [
					'<%= config.public_lib_js %>',
					'<%= config.public_js %>',
					'<%= config.public_css %>'
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
		'karma:continuous',
		'karma:unit',
		'concurrent:monitor'
	]);

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'index:build',
		'karma:continuous',
		'copy'
	]);

	//custom tasks
	grunt.registerMultiTask('index', 'create the index.html file', function()
	{
		var filterAndReplace = function(files, filter, replace)
		{
			return files.filter(function(file)
			{
				return file.match(filter.pattern) !== null;
			}).map(function(file)
			{
				return file.replace(replace.pattern, replace.value);
			});
		};

		var jsFiles = filterAndReplace(
			this.filesSrc, 
			{pattern: /\.js$/i},
			{pattern: 'public/', value: ''}
		);

		var cssFiles =  filterAndReplace(
			this.filesSrc,
			{pattern: /\.css$/i},
			{pattern: 'public/', value: ''}
		);

		grunt.file.copy('public/index.tpl.html', this.data.dir + '/index.html', {
			process: function(contents, path)
			{
				return grunt.template.process(contents, {
					data: {
						scripts: jsFiles,
						styles: cssFiles
					}
				});
			}
		});
	});
};