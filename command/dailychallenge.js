
const chalk = require('chalk');
const ora = require('@nbl7/ora');
const open = require('open');

const {getDailyQuestionQuery, API_ENDPOINT} = require('../utils/api');

const getDailyChallenge = async (opn=false) => {

    const spinner = ora().start("Getting the details...");
    try{

        /* ----------------------------- Calling the API ---------------------------- */
        const res = await fetch(
            API_ENDPOINT,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(getDailyQuestionQuery())
            }
        );
    
        const data = await res.json();

        spinner.stop();

        const q = data.data.activeDailyCodingChallengeQuestion.question;
        console.log("Details of daily challenge: ");
        console.log();

        let diff;
        if(q.difficulty==='Easy') diff = chalk.green('Easy');
        else if(q.difficulty==='Medium') diff = chalk.yellow('Medium');
        else diff = chalk.red('Hard');

        console.log(`  ${q.frontendQuestionId}. ${q.title} (${diff})`, chalk.dim(`- ${new Date().toLocaleDateString()}`));
        console.log(chalk.dim(`  https://leetcode.com${data.data.activeDailyCodingChallengeQuestion.link}`));
        console.log();

        let tags = "";
        q.topicTags.length && q.topicTags.forEach( tag => {
            tags = tags + chalk.bgGreen.black(" " + tag.name + " ") + " ";
        });
        
        if(tags.length)
        console.log(`  ` + tags);
        console.log();

        if(opn) open(`https://leetcode.com${data.data.activeDailyCodingChallengeQuestion.link}`)

    } catch (err) {
        spinner.stop();
        console.log(chalk.dim(`Looks like you are offline😕, please connect to internet to use leetstat.`));
        console.log();
        return;
    }
};

module.exports.getDailyChallenge = getDailyChallenge;