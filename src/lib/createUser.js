/** @format */

const { prompt } = require("inquirer");

const checkIsUserExist = (users, newUser) =>
  users &&
  Array.isArray(users) &&
  newUser &&
  users.some(
    ({ name, email, signingKey }) =>
      name === newUser.name &&
      email === newUser.email &&
      signingKey === newUser.signingKey
  );

const trimAnswer = (answer) => {
  if(typeof answer !== 'string') {
    throw new Error('Answer must be a string')
  }

  return answer.trim()
}

const validateAnswer = (errorMessage) => (answer) => {
  if(!trimAnswer(answer)) {
    return errorMessage
  }

  return !!answer
}

async function createUser(store) {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Enter your git user name",
      transformer: trimAnswer,
      validate: validateAnswer("Please specify the name of the git user"),
    },
    {
      type: "input",
      name: "email",
      message: "Enter your git user email",
      transformer: trimAnswer,
      validate: validateAnswer("Please specify the email of the git user"),
    },
    {
      type: "input",
      name: "signingKey",
      message: "(Optional) Enter your GPG signing key",
      transformer: trimAnswer,
    },
  ];

  const res = await prompt(questions);

  const users = store.get("users");

  const newUser = {
    name: trimAnswer(res.name),
    email: trimAnswer(res.email),
    signingKey: trimAnswer(res.signingKey) || null,
  };

  if (checkIsUserExist(users, newUser)) {
    console.log(`${res.name}:${res.email} already exists!`);
    return;
  }

  store.set("users", [newUser, ...users]);
}

module.exports = createUser;
