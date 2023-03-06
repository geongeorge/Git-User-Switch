const fs = require("fs");
const path = require("path");
/**
 * scan current dir, and return all git repo
 */

async function scanDir() {
  const dir = process.cwd();
  const gitRepoList = [];
  const dirList = fs.readdirSync(dir);

  dirList.forEach((e) => {
    const gitDir = path.join(dir, e, ".git");

    if (fs.existsSync(gitDir)) {
      gitRepoList.push(path.join(dir, e));
    }
  });
  return gitRepoList;
}
module.exports = scanDir;
