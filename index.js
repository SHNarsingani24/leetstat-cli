#!/usr/bin/env node

/**
 * leetstat-cli
 * CLI to checkout your leetcode stats...
 *
 * @author Sagar Narsingani <https://www.linkedin.com/in/sagarnarsingani/>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const {getStats} = require("./command/stats");
const { getContastStats } = require('./command/contests');
const { getUpcomingContests } = require('./command/upcoming');
const { getDailyChallenge } = require('./command/dailychallenge');
const {showExamples} = require('./utils/examples');

const input = cli.input;
const flags = cli.flags;
const { clear, debug, usrname, contest, next, daily, open, force } = flags;

(async () => {
	init({ clear });
	if(input.includes(`help`)){
		showExamples();
		cli.showHelp();
	}

	else if (contest) 
		getContastStats(contest, force);
	
	else if(usrname) 
		getStats(usrname)
	
	else if(next) 
		getUpcomingContests();

	else if(daily)
		getDailyChallenge(open);

	debug && log(flags);
})();
