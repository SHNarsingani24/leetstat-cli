const chalk = require('chalk');
const ora = require('@nbl7/ora');
const Table = require('cli-table');


const {getProblemStatQuery, API_ENDPOINT} = require('../utils/api');

const getStats = async function getStats(usrname){

    const spinner = ora('Getting your stats...').start();

    /* ----------------------- Calling API to get the data ---------------------- */
    
    try{
        if(usrname===undefined) throw new Error('USERNOTFOUND');
        const res = await fetch(
            API_ENDPOINT,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(getProblemStatQuery(usrname))
            }    
        );
        
        const data = await res.json();

        spinner.stop();

        /* -------------------------- If user doesn't exist ------------------------- */
        if(data.data.matchedUser === null){
            throw new Error('USERNOTFOUND');
        }
        /* -------------------------------- Greetings ------------------------------- */
        console.log(chalk.bgWhite.black(" Hey, %s 👋"), usrname);
        console.log('Here are your leetcode stats: ');
        console.log();

        /* --------------------------- Extracting the data -------------------------- */
        const total = {};
        data.data.allQuestionsCount.forEach(type => total[type.difficulty] = type.count);

        const solved = {};
        data.data.matchedUser.submitStatsGlobal.acSubmissionNum.forEach(type => solved[type.difficulty] = type.count);

        const beats = {};
        data.data.matchedUser.problemsSolvedBeatsStats.forEach(type => beats[type.difficulty] = type.percentage);

        const problemData = {};
        for(let type in total)
            problemData[type] = (solved[type] / total[type]) *10;



        /* ----------------------------- Showing output ----------------------------- */
        let table = new Table({
            head: ['💪🏻(Level)', '📉', '👀', '👊🏻(Beats)']
        });

        // Easy Problems Data.
        table.push([
            'Easy',
            chalk.bgGreen.green('-').repeat(problemData['Easy'] / 2) + chalk.bgGreen.black((problemData['Easy'] * 10).toPrecision(3), '%'),
            `${solved['Easy']}/${total['Easy']}`,
            beats['Easy'] + '%'
        ]);

        // Medium Problems Data.
        table.push([
            'Medium',
            chalk.bgYellow.yellow('-').repeat(problemData['Medium'] / 2) + chalk.bgYellow.black((problemData['Medium'] * 10).toPrecision(3), '%'),
            `${solved['Medium']}/${total['Medium']}`,
            beats['Medium'] + '%'
        ]);

        // Hard Problems Data.
        table.push([
            'Hard',
            chalk.bgRed.red('-').repeat(problemData['Medium'] / 2) + chalk.bgRed.black((problemData['Hard'] * 10).toPrecision(3), '%'),
            `${solved['Hard']}/${total['Hard']}`,
            beats['Hard'] + '%'
        ]);

        // All Problems.
        table.push([
            chalk.bold('All'),
            chalk.bgWhite.white('-').repeat(problemData['All'] / 2) + chalk.inverse((problemData['All'] * 10).toPrecision(3), '%'),
            `${solved['All']}/${total['All']}`,
            '-'
        ])

        console.log(table.toString());
        console.log();
        
    } catch (err){
        spinner.stop();
        const error = chalk.bgHex('#F48484').bold;
        if(err.message === 'USERNOTFOUND'){
            console.log(`\tCan't find user with username ${error(' ' + usrname + ' ')} 😕`);
            console.log(chalk.dim(`  Please enter a valid username or try again after some time.`));
        } else {
            console.log(chalk.dim(`Looks like you are offline😕, please connect to internet to use leetstat.`));
        }
        console.log();
        return;
    }
} ;


exports.getStats = getStats;