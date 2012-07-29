#!/usr/bin/env node

var opt = require('optimist')
  .usage('Start dashboard server\n$0 [config.json]\n\nconfig.json can be passed in as local or remote file.\n\nConfig file can also be set by environment variable CUBE_REMOTE_FILE.')
  .options('h', {
    desc: 'Show help info',
    alias: 'help',
    type: 'boolean'
  })
  .options('p', {
    desc: 'Port to run server',
    alias: 'port',
    default: 8000
  })
  .options('H', {
    desc: 'Cube host (overrides config)',
    alias: 'host'
  });

var argv = opt.argv;

if (argv.help) {
  opt.showHelp();
}

var static = require('node-static');
var path = require('path');
var fs = require('fs');

var publicPath = path.join(__dirname, '../public');
var file = new(static.Server)(publicPath);

var configFile = argv._[0];
if(typeof(configFile) == 'undefined'){
  if(typeof(process.env.CUBE_REMOTE_FILE) != 'undefined'){
    configFile=process.env.CUBE_REMOTE_FILE
  }else{
    opt.showHelp();    
    process.exit();
  }
}

var startServer = function(err, configStr) {
  if (err) throw err;
  var config = JSON.parse(configStr);
  if (argv.host) {
    config.host = argv.host;
    configStr = JSON.stringify(config);
  }
  require('http').createServer(function (request, response) {
    if (request.url == '/config.json') {
      response.setHeader('Content-Type', 'application/json');
      response.end(configStr);
    } else if (config.icon && request.url == '/ui/images/icon.png') {
      fs.createReadStream(config.icon).pipe(response);
    } else {
      request.addListener('end', function () {
        file.serve(request, response);
      });
    }
  }).listen(argv.port);
  console.log('Server started on port ' + argv.port);
};

fs.readFile(configFile, 'utf8', startServer);
