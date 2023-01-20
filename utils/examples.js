const chalk = require('chalk');

const showExamples = () => {

    console.log(`  ${chalk.inverse(' ' + 'Examples' + ' ')}`);
    console.log();
    console.log(`  ${chalk.green('leetstat')} ${chalk.dim('--usrname')} <username> \tfor basic user stats`);
    console.log(`  ${chalk.green('leetstat')} ${chalk.dim('--contest')} <username> \tfor basic contest stats`);
    console.log(`  ${chalk.green('leetstat')} ${chalk.dim('--next')}    \t\t\tdetails of upcoming leetcode contests`);
    console.log(`  ${chalk.green('leetstat')} ${chalk.dim('--daily')}      \t\tdetails of leetcode daily challenge`);
    console.log(`  ${chalk.green('leetstat')} ${chalk.dim('--daily --open')}      \t\topens leetcode daily challenge`);
};

exports.showExamples = showExamples;