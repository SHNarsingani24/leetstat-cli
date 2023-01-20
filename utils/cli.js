const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	usrname:{
		type: 'string',
		alias: 'u',
		desc: `Print Normal Problem Stats of user`
	},
	contest: {
		type: 'string',
		alias: 'p',
		desc: `Print Information regarding Contest`
	},
	force: {
		type: 'boolean',
		alias: 'f',
		desc: `Do task forcefully`,
		default: false
	},
	next: {
		type: 'boolean',
		alias: 'n',
		desc: `Print the details of upcoming contests.`,
		default: false
	},
	daily: {
		type: 'boolean',
		alias: 'D',
		desc: `Print details of Daily Challenge Question`,
		default: false
	},
	open: {
		type: 'boolean',
		alias: 'o',
		desc: 'Opens links in your default browser',
		default: false
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `leetstat`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
