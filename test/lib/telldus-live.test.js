var assert = require('chai').assert,
	nock = require('nock'),
	Telldus = require('../../lib/telldus-live');

describe('Telldus', function () {
	beforeEach(function () {
		this.telldus = new Telldus({
			publicKey: '',
			privateKey: '',
			token: '',
			tokenSecret: ''
		});
	});

	describe('#get()', function () {
		it('should return json object', function (done) {
			var endPoint = '/foo',
				resp = { foo: 'bar' };

			nock(this.telldus.baseUrl)
				.get('/json/foo')
				.reply(200, JSON.stringify(resp));

			this.telldus.get(endPoint, function (err, data) {
				assert.deepEqual(resp, data);
				done();
			});
		});
	});
});
