/** @format */

const execa = require("execa");

async function initUser(store) {
  const confList = (await execa.command("git config --list")).stdout.match(
    /user\.(name|email|signingKey).+/g
  );
  const users = [];

  // Count name,email,signKey to match multi user
  let [nameC, emailC, signKeyC] = [0, 0, 0];

  if (confList) {
    confList.forEach((e) => {
      users[Math.max(nameC, emailC, signKeyC)] = {};
      const sliceIdx = e.indexOf("=") + 1;
      switch (e) {
        case e.includes("name") ? e : null:
          users[nameC++].name = e.slice(sliceIdx);
          break;
        case e.includes("email") ? e : null:
          users[emailC++].email = e.slice(sliceIdx);
          break;
        case e.includes("signingKey") ? e : null:
          users[signKeyC++].signingKey = e.slice(sliceIdx);
          break;
      }
    });

    users.pop();
  }

  store.set("users", users);
}

module.exports = initUser;
