// application.js => bootstrap the application

var         env = process.env.NODE_ENV || 'development'
  , packageJson = require("../package.json")
  , path        = require('path')
  , express     = require('express');

console.log("Loading App in " + env + " mode.")

// set global app environment
global.App = {
    app: express()
  , port: process.env.PORT || 3000
  , version: packageJson.version
  , root: path.join(__dirname, '..')
  , appPath: function(path) {
    return this.root + '/' + path;
  }
  , require: function(path) {
    return require(this.appPath(path));
  }
  , env: env
  , start: function() {
      if (!this.started) {
        this.started = true;
        this.app.listen(this.port);
        console.log("Running App Version " + App.version + " on port " + App.port + " in " + App.env + " mode");
      }
    }
  , model: function(path) {
    return this.require('app/models/' + path);
    }
  , route: function(path) {
      return this.require('app/routes/' + path);
    }
}

// Middleware (App.app is our instance of express)
App.app.set('view engine', 'jade');
App.app.set('views', App.appPath('app/views'));
App.app.set('view options', { pretty: env === 'development' });
App.app.use(express.favicon());
App.app.use(express.logger('dev'));
App.app.use(express.json());
App.app.use(express.errorHandler());
App.app.use(express.urlencoded());
App.app.use(express.bodyParser());
App.app.use(express.methodOverride());
App.app.use(express.cookieParser('passphrase'));
App.app.use(express.session({secret: "itsasecrettoeverybody"}));
App.app.use(App.app.router);
App.app.use(express.static(App.appPath('app/public')));

App.require('config/routes')(App.app);
App.require('config/database')(process.env.DATABASE_URL || 'mongodb://localhost/jadestack')