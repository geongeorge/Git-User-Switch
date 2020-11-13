/** @format */

const { prompt } = require("inquirer");
const execa = require("execa");
const chalk = require("chalk");
const log = console.log;

async function selectUser(users, isGlobal = false) {
  const questions = [
    {
      type: "list",
      name: "selection",
      message: "Select a git user",
      choices: [
        ...users.map((el, index) => ({
          value: index,
          name: `${el.name} : ${el.email} ${
            el.signingKey ? ` ${chalk.yellow("[" + el.signingKey + "]")}` : ""
          }`,
        })),
        {
          value: -1,
          name: "Add new user",
        },
      ],
    },
  ];
  const response = await prompt(questions);

  if (response.selection === undefined) {
    // No selection
    return;
  }

  if (response.selection === -1) {
    // Create user
    return -1;
  }

  const user = users[response.selection];
  // Set user here
  // use isGlobal
  const globalFlag = isGlobal ? "--global" : "";

  const userName = escapeString(user.name);
  const userEmail = escapeString(user.email);

  log(`Setting ${chalk.green.bold(user.name)} as user.name`);
  await execa
    .command(`git config ${globalFlag} user.name ${userName}`)
    .stdout.pipe(process.stdout);
  log(`Setting ${chalk.green.bold(user.email)} as user.email`);
  await execa
    .command(`git config ${globalFlag} user.email ${userEmail}`)
    .stdout.pipe(process.stdout);

  if (user.signingKey) {
    log(`Setting ${chalk.yellow.bold(user.signingKey)} as user.signingKey`);
    const escapedKey = escapeString(user.signingKey);
    await execa
      .command(`git config ${globalFlag} user.signingKey ${escapedKey}`)
      .stdout.pipe(process.stdout);
  } else {
    log("Clearing user.signingKey");
    const clearSigningKeyCommands = ["config", "user.signingKey", ""];
    if (globalFlag) {
      clearSigningKeyCommands.splice(1, 0, globalFlag);
    }
    await execa("git", clearSigningKeyCommands).stdout.pipe(process.stdout);
  }

  log(chalk.cyan.bold("Done!"));
}
function escapeString(str) {
  return str.replace(/ /g, "\\ ");
}
module.exports = selectUser;
