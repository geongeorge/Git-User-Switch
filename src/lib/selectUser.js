const { prompt } = require('inquirer');
const execa = require('execa');


async function selectUser(users,isGlobal=false) {
  const questions = [
    {
      type: 'list',
      name: 'selection',
      message: 'Select a git user',
      choices: [
        ...users.map((el,index) => ({value: index, name: `${el.name} : ${el.email}`})),
        {
          value: -1,
          name:'Add new user'
        }
      ]
    }
  ]
  const response = await prompt(questions);


  if(response.selection === undefined) {
    // No selection 
    return
  }

  if(response.selection === -1) {
    // Create user
    return -1
  }

  const user = users[response.selection]
  // Set user here
  // use isGlobal
  const globalFlag = isGlobal? '--global': ''

  const userName = escapeString(user.name)
  const userEmail = escapeString(user.email)

  console.log(`Setting ${user.name} as user.name`)
  await execa.command(`git config ${globalFlag} user.name ${userName}`).stdout.pipe(process.stdout);
  console.log(`Setting ${user.email} as user.email`)
  await execa.command(`git config ${globalFlag} user.email ${userEmail}`).stdout.pipe(process.stdout);
  console.log("Done!")
  
}
function escapeString(str) {
  return str.replace(/ /g,"\\ ")
}
module.exports = selectUser