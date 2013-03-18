[![Build Status](https://secure.travis-ci.org/martinj/tellsense.png)](http://travis-ci.org/martinj/tellsense)

# Tellsense

Tellsense is a logging service for [telldus live](http://live.telldus.com) sensors.
It features a sensor logging part and a web part for viewing charts.

![](https://www.evernote.com/shard/s1/sh/552bad7d-f5be-4820-883b-3bdb96947df8/92d87e697283be9c18ac93d29dc9617d/res/1e9e7dc0-f8be-4eac-81c1-adf6783f84d8/skitch.png)

![](https://www.evernote.com/shard/s1/sh/437358fe-42c5-4b96-bc65-e569d17a3f03/f3139d96b30dea858deebff54ec8c6b2/res/8468e23d-2fbf-4d8a-8c2d-fe34a3b1b7c7/skitch.png)

## How to get it up and running

	$ npm install
	$ cp config-example.js config.js

Modify the config.js to with your settings the start.

	$ npm start


## Cli Sensor Logger

If you want to run the logging with a separate background process you can use bin/cli-sensor-logger.js
Change the config.js option sensorLogger.autoStart to false then run the separate sensor logger.

	$ node bin/cli-sensor-logger.js


## Running on Raspberry PI

The native node mongodb drivers uses a lib called bson which doesn't work on arm.
It does compile but the app crashes with "Bur Error". So running on a raspberry pi requires just a little tweak.

After running npm install remove the compiled native bson module.

	$ rm -rf node_modules/monk/node_modules/mongoskin/node_modules/mongodb/node_modules/bson/build/Release/

## Running Tests

	$ npm test
