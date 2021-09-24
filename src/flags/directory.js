const { flags } = require('@oclif/command');

const directory = flags.string({
  required: false,
  default: process.cwd(),
  hidden: true,
  env: 'CHANGELOG_FILE_NAME',
  description: 'The directory in which to look for the changelog file',
  multiple: false,
});

module.exports = directory;
