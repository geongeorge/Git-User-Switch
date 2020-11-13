/** @format */

const { prompt } = require("inquirer");

const chalk = require("chalk");
const log = console.log;

async function deleteUser(store) {
  const users = store.get("users");

  if (!users || users.length === 0) {
    log("Users already empty!");
    return;
  }

  const questions = [
    {
      type: "list",
      name: "selection",
      message: "Select a git user to delete",
      choices: [
        ...users.map((el, index) => ({
          value: index,
          name: `${el.name} : ${el.email} ${
            el.signingKey ? ` ${chalk.yellow("[" + el.signingKey + "]")}` : ""
          }`,
        })),
        {
          value: -1,
          name: "Cancel",
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
    // Cancel
    log("Operation Cancelled!");
    return;
  }

  const deleteIndex = response.selection;
  const newUsers = users.filter((el, index) => index !== deleteIndex);

  store.set("users", newUsers);

  const signingKey = users[deleteIndex].signingKey
    ? "[" + users[deleteIndex].signingKey + "]"
    : "";

  log(
    `Deleted ${users[deleteIndex].name}:${
      users[deleteIndex].email
    } ${chalk.yellow(signingKey)}`
  );

  // Set user here
  // use isGlobal
}

module.exports = deleteUser;
