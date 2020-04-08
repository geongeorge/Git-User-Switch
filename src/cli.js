const program = require("commander");

const { version } = require("../package");

program.name("cli")

// register version flag
program.version(version);

// define usage information
// program.usage('<command> [options]')

// parse args
program.parse(process.argv);
