
# LeetStat - CLI

A Command Line Interface (CLI) for the leetcode userd to access all the leetcode statistics in the terminal.

## 💡Features

- 💪🏻: LeetCode contest performance in Terminal. 
- 💻: Open LeetCode daily chellege directly from Terminal.
- 😃: Get details of upcoming LeetCode Contests.
- 📉: Check personal stats in the Terminal
- 😎: Be more cool by using your teminal more.


## ⬇️Installation

Install leetstat-cli with npm

```bash
  npm install -g leetstat-cli
  leetstat help
```
    
## ⚙️Usage and Examples
**Options**
```bash
  -c, --clear    Clear the console  
  -d, --debug    Print debug info
  -v, --version  Print CLI version
  -u, --usrname  Print Normal Problem Stats of user
  -p, --contest  Print Information regarding Contest
  -f, --force    Do task forcefully
  -n, --next     Print the details of upcoming contests.
  -D, --daily    Print details of Daily Challenge Question
  -o, --open     Open links in your default browser
```

**Examples**
```bash
  leetstat --usrname <username>         for basic user stats
  leetstat --contest <username>         for basic contest stats
  leetstat --next                       details of upcoming leetcode contests
  leetstat --daily                      details of leetcode daily challenge
  leetstat --daily --open               opens leetcode daily challenge
```

**📝:** You can also do operations shown in Examples with flag shorthands (e.g., instead of --usrname one can use -u). 

## 🧑🏻‍💻Tech Stack

- Node 
- JavaScript


## 🙏Acknowledgements

 - [create-node-cli](https://github.com/ahmadawais/create-node-cli)
 - [chalk](https://github.com/chalk/chalk)
 - [cli-table](https://github.com/Automattic/cli-table)
 - [asciichart](https://github.com/kroitor/asciichart)
 - [@nbl7/ora](https://github.com/nbl7/ora)


## License

[MIT](https://choosealicense.com/licenses/mit/) © [Sagar Naringani](https://www.linkedin.com/in/sagarnarsingani/)

