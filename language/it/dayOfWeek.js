'use strict';

const Parser = require('../../parser');

const cloneDeep = require('lodash.clonedeep');

module.exports = function(language) {
	return new Parser(language)
		.name('dayOfWeek')

		// Day of week
		.map(
			{
				'lun': 1,
				'lunedi': 1,

				'mar': 2,
				'martedu': 2,

				'mer': 3,
				'mercoledi': 3,

				'gio': 4,
				'giovedi': 4,

				'ven': 5,
				'venerdi': 5,

				'sab': 6,
				'sabato': 6,

				'dom': 7,
				'domenica': 7
			},
			l => { return { value: l } }
		)

		.add([ 'on', Parser.result() ], v => v[0])

		.mapResults(cloneDeep)
		.onlyBest();
}
