// https://kontests.net/api/v1/leet_code
const chalk = require('chalk');
const ora = require('@nbl7/ora');

const getUpcomingContests = async () => {
    const spinner = ora().start('Getting the details...');
    try{
        /* ----------------------- calling API to get the data ---------------------- */
        const res = await fetch(
            'https://kontests.net/api/v1/leet_code'
        );

        const data = await res.json();

        spinner.stop();

        console.log('Here are the details of upcoming contests on leetcode: ');
        console.log();

        data.forEach(contest => {
            console.log('\t' + chalk.bold.yellow(contest.name) + (contest.in_24_hours==='Yes' ? chalk.red(' *') : ''));
            const date = new Date(contest.start_time);
            console.log(chalk.dim(`\t${date.toLocaleDateString()} - ${date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`));
            console.log(chalk.dim(`\t${contest.url}`));

            console.log();
        });
    } catch(_err) {
        spinner.stop();
        console.log(chalk.dim(`Looks like you are offline😕, please connect to internet to use leetstat.`));
        console.log();
        return;
    }
}

exports.getUpcomingContests = getUpcomingContests;