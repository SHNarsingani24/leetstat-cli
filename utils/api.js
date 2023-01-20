
// Leetcode API to get all required data.
const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';

const PROBLEM_STATS_QUERY = (usrname) =>{
    return {
        query: `
        query userProblemsSolved($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
                problemsSolvedBeatsStats {
                  difficulty
                  percentage
                }
                submitStatsGlobal {
                    acSubmissionNum {
                      difficulty
                      count
                    }
                }
          }
        }
        `,
        variables: {
            username: usrname
        }
    }
}
;


const CONTEST_PERFORMANCE_QUERY = (usrname) => {
    return { 
        query: `
            query userContestRankingInfo($username: String!) {
                userContestRanking(username: $username) {
                    attendedContestsCount
                    rating
                    globalRanking
                    totalParticipants
                    topPercentage
                    badge {
                        name
                    }
                }
            
                userContestRankingHistory(username: $username) {
                    attended
                    trendDirection
                    problemsSolved
                    totalProblems
                    finishTimeInSeconds
                    rating
                    ranking
                    contest {
                        title
                        startTime
                    }
                }
            }`,
        variables: {username: usrname}
    }
};


const DAILY_CODING_CHALLENGE_QUERY= () => {
    return {
        query: `
        query questionOfToday {
            activeDailyCodingChallengeQuestion {
                date
                userStatus
                link
                question {
                    acRate
                    difficulty
                    freqBar
                    frontendQuestionId: questionFrontendId
                    isFavor
                    paidOnly: isPaidOnly
                    status
                    title
                    titleSlug
                    hasVideoSolution
                    hasSolution
                    topicTags {
                        name
                        id
                        slug
                    }
                }
            }
        }`,
        variables: {}
    };
};
    

module.exports.API_ENDPOINT = LEETCODE_API_ENDPOINT;
module.exports.getProblemStatQuery = PROBLEM_STATS_QUERY;
module.exports.getContestStatQuery = CONTEST_PERFORMANCE_QUERY;
module.exports.getDailyQuestionQuery = DAILY_CODING_CHALLENGE_QUERY;