/** @format */

const program = require("commander");
const Conf = require("conf");

const { version } = require("../package");

const selectUser = require("./lib/selectUser");
const createUser = require("./lib/createUser");
const deleteUser = require("./lib/deleteUser");
const chalk = require("chalk");
const log = console.log;

const store = new Conf();

// Initialize cli
program
  .version(version)
  .description("Switch git users quickly. Switches locally by default")
  .option("-g, --global", "Switch global git user")
  .option("-d, --delete", "Delete a git user from the listing")
  .option("-r, --reset", "Deletes all data and resets");

// Initialize users in store
if (store.get("users") === undefined) {
  store.set("users", []);
}

// parse cli args
program.parse(process.argv);

if (program.reset) {
  // delete all data and return
  resetStore();
  log(chalk.bold("Data reset successfully!"));
  return;
}

if (program.delete) {
  // delete user
  deleteUser(store);
  return;
}

let isGlobal = false;
if (program.global) {
  isGlobal = true;
}

// Call main method
main();

async function main() {
  let users = store.get("users");
  // Init users
  if (!users.length) {
    await initUser(store);
    users = store.get("users");
  }
  const res = await selectUser(users, isGlobal);
  if (res === -1) {
    await createUser(store);
    return;
  }
}

// Deletes the store file
function resetStore() {
  store.set("users", []);
}
