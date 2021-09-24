const { flags } = require('@oclif/command');

const write = flags.boolean({
  required: false,
  default: true,
  env: 'WRITE_CHANGELOG',
  hidden: true,
  description: 'Whether or not to overwrite the changelog file',
  multiple: false,
  allowNo: true,
});

module.exports = write;
