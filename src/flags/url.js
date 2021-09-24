const { flags } = require('@oclif/command');

const url = flags.string({
  required: false,
  env: 'URL',
  hidden: true,
  description: 'The project homepage',
  multiple: false,
});

module.exports = url;
