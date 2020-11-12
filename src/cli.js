/** @format */

const program = require("commander");
const store = require("data-store")({ path: process.cwd() + "/data.json" });

const { version } = require("../package");

const selectUser = require("./lib/selectUser");
const createUser = require("./lib/createUser");
const deleteUser = require("./lib/deleteUser");

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
const users = store.get("users");

// parse cli args
program.parse(process.argv);

if (program.reset) {
  // delete all data and return
  resetStore();
  console.log("Data reset successfully!");
  return;
}

if (program.delete) {
  // delete all data and return
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
  const res = await selectUser(users, isGlobal);
  if (res === -1) {
    await createUser(store);
    return;
  }
}

// Deletes the store file
function resetStore() {
  store.unlink();
}
