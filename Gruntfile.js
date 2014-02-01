'use strict';

module.exports = function(grunt)
{
	//load plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config: {
			public_dir: 'public',
			public_js: [
				'public/app/**/*.js',
				'public/js/**/*.js'
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
						src: ['<%= config.public_dir %>/*'],
						dest: '<%= config.build_dir %>'
					}	
				]
			}
		},

		jshint: {
			src: [
				'<%= config.public_js %>'
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
				unused: true,
				globalstrict: true,
				maxcomplexity: 5,
				sub: true,
				boss: true,
				eqnull: true,
				browser: true,
				devel: true,
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
		}

	});

	//register tasks
	grunt.registerTask('default', [
		'clean',
		'jshint',
		'copy',
		'nodemon'
	]);
};