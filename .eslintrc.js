module.exports = {
	"env": {
		"node":true,
		"browser": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
		"__API_PREFIX": "readonly",
		"__BASEDIR": "readonly",
		"__DATABASEREADPREFERENCE": "readonly",
	},
	"parserOptions": {
		"ecmaVersion": 2020,
		"sourceType": "module"
	},
	"rules": {},
};
