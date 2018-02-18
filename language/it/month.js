'use strict';

const Parser = require('../../parser');
const utils = require('../dates');
const addMonths = require('date-fns/add_months');

function currentTime(encounter) {
	if(encounter.options.now) {
		return encounter.options.now;
	} else {
		return encounter.options.now = new Date();
	}
}

function adjustedMonth(date, diff) {
	date = addMonths(date, diff);
	return {
		year: date.getFullYear(),
		month: date.getMonth()
	};
}

module.exports = function(language) {
	const integer = language.integer;

	return new Parser(language)
		.name('month')

		.skipPunctuation()

		// Named months
		.map(
			{
				'gen': 0,
				'gennaio': 0,

				'feb': 1,
				'febbraio': 1,

				'mar': 2,
				'marzo': 2,

				'apr': 3,
				'aprile': 3,

				'mag': 4,
				'maggio': 4,

				'giu': 5,
				'giugno': 5,

				'lug': 6,
				'luglio': 6,

				'ago': 7,
				'agosto': 7,

				'set': 8,
				'settembre': 8,

				'ott': 9,
				'ottobre': 9,

				'nov': 10,
				'novembre': 10,

				'dic': 11,
				'dicembre': 11
			},
			l => { return { month: l } }
		)

		// Dynamic months
		.add('questo mese', (v, e) => adjustedMonth(currentTime(e), 0))
		.add('ultimo mese', (v, e) => adjustedMonth(currentTime(e), -1))
		.add('prossimo', (v, e) => adjustedMonth(currentTime(e), +1))
		.add([ 'nel', integer, 'mese' ], v => { return { relativeMonths: v[0].value }})

		.add([ 'nel', Parser.result() ], v => v[0])

		.mapResults(utils.mapMonth)
		.onlyBest();
}
