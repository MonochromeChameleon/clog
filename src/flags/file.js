const { flags } = require('@oclif/command');

const file = flags.string({
  required: false,
  default: 'CHANGELOG.md',
  env: 'CHANGELOG_FILE_NAME',
  description: 'The name of the changelog file',
  multiple: false,
});

module.exports = file;
