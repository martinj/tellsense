/**
 * Expose configuration
 */
module.exports = {
	port: process.env.PORT || 3000, //what port the webserver should run on
	sessionSecret: 'put a session secret here', //it can be whatever you like just put something random here.
	authenticate: { //set to false to disable authentication
		//username and password to access this web service
		username: 'admin',
		password: 'foobar'
	},
	sensorLogger: {
		autoStart: true, //when true the webapp will run the logger, set to false when using cli sensor logger.
		infoInterval: 600, //seconds, Default 10min (How often to update readings from sensors)
		sensorInterval: 600 //seconds, Default 10min (How often to update list of sensors)
	},
	telldus: {
		//get your keys from http://api.telldus.com/
		publicKey: '',
		privateKey: '',
		token: '',
		tokenSecret: ''
	},

	mongodb: {
		uri: 'mongodb://localhost/tellsense' //tip try using it with cloud mongoservice if you want to spare your raspberry pi of writes http://mongolab.com
	}
};