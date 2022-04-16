/** @format */
const execa = require("execa");

function getCommand({ global = false, value = "name" }) {
  const globalFlag = global ? "--global" : "";
  return `git config ${globalFlag} user.${value}`;
}

async function fetchUser(isGlobal = false) {
  const userValues = { name: "", email: "" };

  if (isGlobal) {
    const { stdout: globalName } = await execa.command(
      getCommand({ global: true, value: "name" })
    );
    const { stdout: globalEmail } = await execa.command(
      getCommand({ global: true, value: "email" })
    );
    userValues.name = globalName;
    userValues.email = globalEmail;
  } else {
    const { stdout: localName } = await execa.command(
      getCommand({ global: false, value: "name" })
    );
    const { stdout: localEmail } = await execa.command(
      getCommand({ global: false, value: "email" })
    );
    userValues.name = localName;
    userValues.email = localEmail;
  }

  return userValues;
}

module.exports = fetchUser;
