/** @format */

const { prompt } = require("inquirer");

async function createUser(store) {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Enter your git user name",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your git user email",
    },
    {
      type: "input",
      name: "signingKey",
      message: "(Optional) Enter your GPG signing key",
    },
  ];

  const res = await prompt(questions);

  const users = store.get("users");

  const newUser = {
    name: res.name,
    email: res.email,
    signingKey: res.signingKey || null,
  };

  if (users.includes(newUser)) {
    console.log(`${res.name}:${res.email} already exists!`);
    return;
  }

  store.set("users", [newUser, ...users]);
}

module.exports = createUser;
