const ora = require('@nbl7/ora');
const chalk = require('chalk');
const asciichart = require('asciichart');
const Table = require('cli-table');

const {getContestStatQuery, API_ENDPOINT} = require('../utils/api');

function getDate(date){
    return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
}

function getTime(secs){
    let hrs = (secs - (secs % 3600));
    secs = secs - hrs;
    hrs = hrs / 3600;
    let mins = (secs - (secs % 60));
    secs = secs - mins;
    mins = mins / 60;

    return `${hrs}:${mins}:${secs}`;
}

const getContastStats = async (usrname, force=false) => {

    const spinner = ora('Getting your stats...').start();
    try{
        if(usrname===undefined) throw new Error('USERNOTFOUND');
        
        /* ----------------------- Calling API to get the data ---------------------- */
        const res = await fetch(
            API_ENDPOINT,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(getContestStatQuery(usrname))
            }    
        );

        const data = await res.json();

        spinner.stop();

        // if there is no user.
        if(!data.data.userContestRankingHistory) throw new Error('USERNOTFOUND');
        // if there is no contest data for user.
        if(!data.data.userContestRanking) throw new Error('NOCONTESTDATAFOUND');
        

        /* -------------- Extracting important things from API Response ------------- */
        const history = data.data.userContestRankingHistory.filter(contest => contest.attended);
        // console.log(history);

        const ranking = data.data.userContestRanking;
        // console.log(ranking);

        /* --------------------------- Showing basic stats -------------------------- */

        console.log(`   attended: ${chalk.bold(ranking.attendedContestsCount)}  rating: ${chalk.bold(Math.floor(ranking.rating))}   rank: ${chalk.bold(ranking.globalRanking +'/' + ranking.totalParticipants)}   badge: ${ranking.badge ? chalk.underline.inverse(ranking.badge.name) : chalk.dim('none')}`);

        console.log();
        console.log();

        /* ---------------------------- Showing the graph --------------------------- */
        let ratingGraph = [], timeGraph = [];
        history.forEach(contest => {
            ratingGraph.push(contest.rating);
            timeGraph.push(contest.finishTimeInSeconds)
        });


        if( timeGraph.length <= 50 || force ){
            const padding = '           ';  // just required for formating the graph.
            console.log(chalk.yellow(`\t\t\t\t\t---------`) + ' Time Taken ');
            console.log(chalk.blue(`\t\t\t\t\t---------`) + ' Ratting ');
            console.log();
            console.log(asciichart.plot([timeGraph, ratingGraph], 
                {
                    height: 10, 
                    colors:[asciichart.yellow, asciichart.blue], 
                    format: function (_x) {
                        return (padding).slice(-padding.length)
                    }
                }
            ));
    
            console.log();
            console.log(chalk.dim(`📈: It is really tough to make a graph in terminal, hence this graph may not be very accurate. However it can be helpful to visualize your progress.`));
        } else {
            console.log(chalk.red('your contest data is too large, graph may not look good on small screens😬'));
            if(!force) console.log(chalk.dim('If you still want to see the graph use -f flag with the command.'));
        }
        console.log();


        /* ------------------------- Showing Contest History ------------------------ */
        let table = new Table({
            head: ['🎗️', '👀', '⏱️', 'Rating', 'Rank', ' ']
        });

        history.forEach(contest => table.push([
            // getDate(new Date(contest.contest.startTime * 1000)),
            contest.contest.title.replace('Contest', '-'),
            `${contest.problemsSolved} / ${contest.totalProblems}`,
            getTime(contest.finishTimeInSeconds),
            Math.round(contest.rating),
            contest.ranking,
            (contest.trendDirection==='DOWN') ? '🔴' : '🟢'
        ]));

        console.log(table.toString());
        console.log();
        console.log(chalk.inverse(`\t\tYou are among top ${ranking.topPercentage} Participants! ${ranking.topPercentage<50 ? '😃' : ''}`))
        console.log();
        console.log(chalk.dim(`Rating: Higher is better!`));
        console.log(chalk.dim(`Rank: Lower is better!`));
        console.log(chalk.dim(`🟢: Better than previous contest!`));
        console.log(chalk.dim(`🔴: Lower than previous contest!`));

        console.log();
    } catch(err){
        spinner.stop();
        const error = chalk.bgHex('#F48484').bold;
        if(err.message === 'NOCONTESTDATAFOUND')
            console.log(chalk.bgRed('\tYou have not participated in any contest yet!😒'));
        
        else if(err.message === 'USERNOTFOUND'){
            console.log(`\tCan't find user with username ${error(' ' + usrname + ' ')} 😕`);
            console.log(chalk.dim(`  Please enter a valid username or try again after some time.`));
        } 
        
        else
            console.log(chalk.dim(`Looks like you are offline😕, please connect to internet to use leetstat.`));
        console.log();
        return;
    }
}

exports.getContastStats = getContastStats;