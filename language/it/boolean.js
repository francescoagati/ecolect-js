'use strict';

const Parser = require('../../parser');

module.exports = function(language) {
	return new Parser(language)

		.add('vero', true)
		.add('acceso', true)
		.add('si', true)

		.add('falso', false)
		.add('spento', false)
		.add('no', false)

		.onlyBest();
}
