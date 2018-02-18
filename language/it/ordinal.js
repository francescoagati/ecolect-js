'use strict';

const Parser = require('../../parser');

module.exports = function(language) {
	return new Parser(language)

		.add(language.integer, v => v[0])

		.map(
			{
				'primo': 1,
				'secondo': 2,
				'terzo': 3,
				'quattro': 4,
				'cinque': 5,
				'sei': 6,
				'sette': 7,
				'otto': 8,
				'nove': 9,
				'dieci': 10
			},
			l => { return { value: l } }
		)

		.add([ 'the', Parser.result() ], v => v[0])

		.onlyBest()
		.mapResults(r => {
			const mapped = {
				value: r.value
			};
			return mapped;
		});
}
