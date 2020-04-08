const program = require('commander');

const { version } = require('../package');

// register version flag
program.version(version);

// parse args
program.parse(process.argv);
