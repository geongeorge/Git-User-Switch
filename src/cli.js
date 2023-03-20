/** @format */

const path = require("path");
const program = require("commander");
const Conf = require("conf");

const { version } = require("../package");

const initUser = require("./lib/initUser");
const selectUser = require("./lib/selectUser");
const createUser = require("./lib/createUser");
const deleteUser = require("./lib/deleteUser");
const fetchUser = require("./lib/fetchUser");
const scanDir = require("./lib/scanDir");

const chalk = require("chalk");
const log = console.log;

const store = new Conf();

// Initialize cli
program
  .version(version)
  .description("Switch git users quickly. Switches locally by default")
  .option("-g, --global", "Switch global git user")
  .option("-d, --delete", "Delete a git user from the listing")
  .option("-r, --reset", "Deletes all data and resets")
  .option("-i, --info", "Show current git user")
  .option("-s, --switch", "Switch current git user")
  .option("-c, --create", "Create a new git user")
  .option("-S, --scan", "Scan all git repo in current directory, and show the git user of each repo");

// Initialize users in store
if (store.get("users") === undefined) {
  store.set("users", []);
}

// parse cli args
program.parse(process.argv);

let isGlobal = false;
if (program.global) {
  isGlobal = true;
}

const programHandler = async () => {
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

  if (program.info) {
    // show current git user
    const currentUser = await fetchUser();
    log(
      chalk.green(
        `Current git user(${program.global ? "global" : "local"}) is ${currentUser.name}: ${currentUser.email}\n`,
      ),
    );
  }
  if (program.create) {
    await createUser(store);
    return;
  }
  if (program.switch) {
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
  if (program.scan) {
    const gitRepoList = await scanDir();
    if (!gitRepoList.length) {
      log(chalk.red("No git repo found!"));
      return;
    }
    for (let i = 0; i < gitRepoList.length; i++) {
      const gitDir = gitRepoList[i];
      // goto dir
      process.chdir(gitDir);
      const e = path.basename(gitDir);
      const gitUser = await fetchUser();
      log(`Repo: ${chalk.blue(e)}, User: ${chalk.green(gitUser.name)} Email: ${chalk.green(gitUser.email)}`);
      // back to root dir
      process.chdir("../");
    }
    log(chalk.bold("Dir scan successfully!"));
  }
};
programHandler();

main();

async function main() {
  try {
    const currentUserValues = await fetchUser(isGlobal);

    log(
      chalk.green(
        `Current git user(${isGlobal ? "global" : "local"}) is ${currentUserValues.name}:${currentUserValues.email}\n`,
      ),
    );
  } catch (error) {
    log(chalk.red(`You didn't have set git config ${isGlobal ? "--global" : ""}, create git config user as below`));
    await createUser(store);
  }

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
