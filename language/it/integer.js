'use strict';

const Parser = require('../../parser');
const utils = require('../numbers');

function isDigits(o) {
	return ! o.literal;
}

function isDigitsCompatible(o) {
	return o.suffix || ! o.literal;
}

function isLiteral(o) {
	return o.literal;
}

module.exports = function(language) {
	return new Parser(language)
		.name('integer')

		.add(/^[0-9]+$/, v => {
			const raw = v[0];
			return { value: parseInt(raw), raw: raw };
		})

		.map(
			{
				'zero': 0,
				'niente': 0,
				'nessuno': 0,
				'uno': 1,
				'singolo': 1,
				'due': 2,
				'tree': 3,
				'quattro': 4,
				'cinque': 5,
				'sei': 6,
				'setee': 7,
				'otto': 8,
				'nove': 9,
				'dieci': 10,
				'undici': 11,
				'dodici': 12,
				'tredici': 13,
				'quattordici': 14,
				'quindici': 15,
				'sedici': 16,
				'diciasette': 17,
				'diciotto': 18,
				'diciannove': 19
			},
			l => { return { value: l, raw: l, literal: true } }
		)

		.map(
			{
				'dozzina': 12,
				'dozzine': 12,
				'centinaia': 100,
				'migliaia': 1000,
				'milioni': 1000000,
				'bilioni': 1000000000,

				'cento': 100,
				'mille': 1000,
				'milione': 1000000,
				'bilione': 1000000000,


				'K': 1000,
				'M': 1000000
			},
			l => { return { value: l, raw: l, suffix: true, literal: true }}
		)

		// Digits + digits or digits + suffix, combines 1 000 and 1 thousand but not one 000
		.add([ Parser.result(isDigits), Parser.result(isDigitsCompatible) ], v => utils.combine(v[0], v[1]))

		// Literal + literal - to avoid combining things as `one 000`
		.add([ Parser.result(isLiteral), Parser.result(isLiteral) ], v => utils.combine(v[0], v[1]))

		// Thousands separator
		.add([ Parser.result(isDigits), ',', Parser.result(isDigits) ], v => utils.combine(v[0], v[1]))

		.mapResults(utils.map)
		.onlyBest();
}
