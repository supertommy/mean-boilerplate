MEAN Boilerplate
================

MEAN Boilerplate is a template/starter project for apps that want to use the MEAN stack: MongoDB, [Express](http://expressjs.com/), [AngularJS](http://angularjs.org/), and Node.js. This project uses Grunt to automate the build and development process. Including continuous automatic linting with JSHint and unit tests with Nodeunit for the backend and Karma with Jasmine for the front-end. The AngularJS front-end uses Bower to manage third party packages.

The intent of this project is to make it simple and easy to start a MEAN project. Just clone, install packages, and go.

## Quick Start
Firstly, you need [Node.js](http://nodejs.org) and [MongoDB](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) installed.

If you don't have [Grunt](http://gruntjs.com/getting-started) then you will need to install it:

```$ npm install -g grunt-cli```

If you don't have [Bower](http://bower.io/) then you will also need to install it:

```$ npm install -g bower```

Now inside a Terminal, go to the project directory and install the packages with ```npm```:

```$ npm install```

This will install all the dependencies enumerated into the ```package.json``` file.

Once that's done, go into the ```public``` directory and run Bower:

```$ bower install```

This will install all the front-end packages in the ```lib``` folder.

## Usage
First start MongoDB in a separate Terminal:

```$ mongod```

Then go to the project root and run Grunt:

```$ grunt```

or

```$ grunt default```

This will run the ```default``` Grunt task. The ```default``` task will run JSHint, Nodeunit, Karma, and build the index file for the front-end based on the ```index.tpl.html``` file. It will then continously watch for file changes and run JSHint and the unit tests after each change.

Any changes to the back-end code will also result in an automatic restart of the server.

All you need to do is make changes, save, watch the console output, and then try out your changes. No need to rebuild or restart the server manually!

## Project Structure

```
mean-boilerplate/
  |- api/             (back-end controllers)
  |- build/           (where builds are placed)
  |- node_modules/    (packages installed by npm)
  |- public/          (the AngularJS front-end)
    |- app            (the main AngularJS app files)
    |- assets         (assets like images)
    |- css            (CSS files)
    |- lib            (third party libraries installed by Bower)
    |- partials       (AngularJS partials/views)
  |- routes/          (routing files)
  |- server/          (Express application)
  |- tests/           (unit tests)
    |- api            (back-end tests)
    |- public         (front-end tests)
```

The directory structure inside these directories can generally be anything you want. The front-end expects all folders except the ```partials``` folder. Views and partials can be placed in the ```app``` folder if you prefer. The general structure is taken directly from the [angular-seed](https://github.com/angular/angular-seed) project.

The ```api``` folder comes with ```TestController.js``` that simply demonstrates a controller to handle actions. The ```routes``` folder has two files for back-end and front-end routing. The front-end routing file (```public.js```) only passes routes to the front-end. Explicit front-end routing is handled by AngularJS in the normal way.

The ```server.js``` files sets the ```/public``` directory to serve static files so that root (```/```) goes to the front-end. It then sets the back-end routes in ```routes/api.js``` to ```/api/*```. Followed lastly by setting up any additional or unhandled routes to the front-end.

## Making a Build
There is another Grunt task called ```build```. This task will do a clean of any existing builds, runs JSHint, Nodeunit, Karma, copies files to the builds folder, concats application JavaScript, concats application CSS, minifies the application JavaScript, and creates the appropriate index.html file for the front-end.

This is all placed in the ```build``` folder and can be deployed. You can always test this build manually by going to project root and running:

```$ node build/server/server.js```

You can then go to ```http://localhost:3000``` to see your front-end or ```http://localhost:3000/api``` to hit your back-end.

## Tools Used
This project relies heavily on existing tools and projects by the open source community. Obviously there is use of Node.js, MongoDB, Express, AngularJS, Grunt, and Bower. 

On top of that is [Nodeunit](https://github.com/caolan/nodeunit) for back-end tests, [Karma](http://karma-runner.github.io/0.10/index.html) with [Jasmine](http://pivotal.github.io/jasmine/) for front-end tests via the Grunt tasks [grunt-contrib-nodeunit](https://github.com/gruntjs/grunt-contrib-nodeunit) and [grunt-karma](https://github.com/karma-runner/grunt-karma) respectively.

Watching for file changes is made possible by [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch). File concatenation is made possible by [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat). Various other mundane tasks by [grunt-contrib-copy](https://npmjs.org/package/grunt-contrib-copy), [grunt-contrib-clean](https://npmjs.org/package/grunt-contrib-clean), and [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify).

JavaScript linting is made possible by [JSHint](http://www.jshint.com/) via the Grunt task [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint).

[Mongoose](http://mongoosejs.com/) is used to interact with MongoDB.
