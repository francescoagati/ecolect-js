'use strict';

const Node = require('./node');

class RegExpNode extends Node {
	constructor(regexp) {
		super();

		this.regexp = regexp;
	}

	match(encounter) {
		const token = encounter.token();
		if(! token) return null;

		const match = this.regexp.exec(token.raw);
		if(! match) return null;

		return encounter.next(1, 1, match[0]);
	}

	toString() {
		return 'RegExp[' + this.regexp + ']';
	}
}

module.exports = RegExpNode;