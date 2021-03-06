'use strict';

module.exports = function(grunt)
{
	//load plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
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
			public_index: [
				'public/index.tpl.html'
			],
			public_lib_js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-route/angular-route.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-cookies/angular-cookies.js'
			],
			public_css: [
				'public/css/**/*.css'
			],

			api_dir: 'api',
			api_js: [
				'api/**/*.js'
			],

			server_dir: 'server',

			routes_dir: 'routes',
			routes_js: [
				'routes/**/*.js'
			],

			tests_dir: 'tests',
			tests_api: 'tests/api',
			tests_public: 'tests/public',

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
							'!<%= config.public_dir %>/app/**/*',
							'!<%= config.public_dir %>/css/**/*',
							'!<%= config.public_dir %>/lib/**/*',
							'!<%= config.public_dir %>/*.html',
							'!<%= config.public_dir %>/bower.json'
						],
						dest: '<%= config.build_dir %>'
					}	
				]
			},

			api: {
				files: [
					{
						expand: true,
						src: [
							'<%= config.api_dir %>/**/*',
							'<%= config.routes_dir %>/**/*',
							'server/**/*.js'
						],
						dest: '<%= config.build_dir %>'
					}
				]
			}
		},

		jshint: {
			public_src: [
				'<%= config.public_js %>'
			],

			public_tests: [
				'<%= config.tests_public %>/**/*.spec.js'
			],

			api_src: [
				'<%= config.api_js %>'
			],

			api_tests: [
				'<%= config.tests_api %>/**/*.spec.js'
			],

			routes: [
				'<%= config.routes_js %>'
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
					//angular
					'module': true,
					'angular': true,
					'inject': true,

					//Jasmine
					'describe': true,
					'it': true,
					'before': true,
					'beforeEach': true,
					'after': true,
					'afterEach': true,
					'expect': true
				}
			}
		},

		karma: {
			options: {
				files: [
					'public/lib/angular/angular.js',
					'public/lib/angular-mocks/angular-mocks.js',
					'public/app/**/*.js',
					'tests/public/**/*.spec.js'
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

		nodeunit: {
			all: [
				'<%= config.tests_api %>/**/*.spec.js'
			]
		},

		nodemon: {
			dev: {
				script: 'server/server.js',
				options: {
					ext: 'js',
					watch: [
						'<%= config.server_dir %>',
						'<%= config.api_dir %>',
						'<%= config.routes_dir %>'
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

			public_index: {
				files: ['<%= config.public_index %>'],
				tasks: [
					'index:dev'
				],
				options: {
					spawn: false
				}
			},

			public_tests: {
				files: [
					'<%= karma.options.files %>'
				],
				tasks: [
					'karma:unit:run'
				]
			},

			api_src: {
				files: ['<%= config.api_js %>'],
				tasks: [
					'nodeunit:all'
				],
				options: {
					spawn: false
				}
			},

			api_tests: {
				files: [
					'<%= nodeunit.all %>'
				],
				tasks: [
					'nodeunit:all'
				]
			},

			routes: {
				files: [
					'<%= config.routes_js %>'
				],
				tasks: [
					'jshint:routes'
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
					'<%= config.build_dir %>/<%= config.public_dir %>/lib/**/*.js',
					'<%= config.build_dir %>/<%= config.public_dir %>/app/**/*.js',
					'<%= config.build_dir %>/<%= config.public_dir %>/css/**/*.css'
				]
			}		
		},
	
		concat: {
			build_js: {
				src: [
					'<%= config.public_js %>'
				],
				dest: '<%= config.build_dir %>/public/app/app.min.js'
			},

			build_lib: {
				src: [
					'<%= config.public_lib_js %>'
				],
				dest: '<%= config.build_dir %>/public/lib/lib.min.js'
			},

			build_css: {
				src: [
					'<%= config.public_css %>'
				],
				dest: '<%= config.build_dir %>/public/css/app.css'
			}
		},

		uglify: {
			build_js: {
				files: {
					'<%= config.build_dir %>/public/app/app.min.js': [
						'<%= config.build_dir %>/public/app/app.min.js'
					]
				}
			},

			build_lib: {
				files: {
					'<%= config.build_dir %>/public/lib/lib.min.js': [
						'<%= config.build_dir %>/public/lib/lib.min.js'
					]
				}
			}
		}
	});

	//register tasks
	grunt.registerTask('default', [
		'jshint',
		'index:dev',
		'nodeunit',
		'karma:continuous',
		'karma:unit',
		'concurrent:monitor'
	]);

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'nodeunit',
		'karma:continuous',
		'copy',
		'concat',
		'uglify',
		'index:build'
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

		var replacePattern = /(build\/)*(public\/)*/i;
		var jsFiles = filterAndReplace(
			this.filesSrc, 
			{pattern: /\.js$/i},
			{pattern: replacePattern, value: ''}
		);

		var cssFiles =  filterAndReplace(
			this.filesSrc,
			{pattern: /\.css$/i},
			{pattern: replacePattern, value: ''}
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