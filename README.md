# Cube Dashboard

Generic dashboard for [cube](http://square.github.com/cube/).

## Features

* Powered by config file
* Can have multiple dashboards
* iPhone/iPad optimized for saving on home screen
* auto fit to screen

## Future

* auto update charts on resize
* better looking dropdowns
* auto height?

##Installation

	npm install -g cube-dashboard

##Usage

change the sample-config.json and then run:

	cube-dashboard config.json

you can also run `cube-dashboard --help` for all the options

To run on Heroku, minify your config.json file and set your configuration in
the `DASHBOARD_CONFIG` environment variable:

    npm install json-minify
    heroku config:set DASHBOARD_CONFIG="$(cat config.json | ./node_modules/json-minify/index.js)"
