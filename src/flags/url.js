const { flags } = require('@oclif/command');

const url = flags.string({
  required: false,
  env: 'URL',
  description: 'The project homepage',
  multiple: false,
});

module.exports = url;
