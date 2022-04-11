/** @format */
const execa = require("execa");

function getCommand({ global = false, value = "name" }) {
  const globalFlag = global ? "--global" : "";
  return `git config ${globalFlag} user.${value}`;
}

async function fetchUser() {
  const localValues = { name: "", email: "" };
  const globalValues = { ...localValues };

  const { stdout: localName } = await execa.command(
    getCommand({ global: false, value: "name" })
  );
  const { stdout: localEmail } = await execa.command(
    getCommand({ global: false, value: "email" })
  );

  localValues.name = localName;
  localValues.email = localEmail;

  const { stdout: globalName } = await execa.command(
    getCommand({ global: true, value: "name" })
  );
  const { stdout: globalEmail } = await execa.command(
    getCommand({ global: true, value: "email" })
  );

  globalValues.name = globalName;
  globalValues.email = globalEmail;

  return {
    local: localValues,
    global: globalValues,
  };
}

module.exports = fetchUser;
