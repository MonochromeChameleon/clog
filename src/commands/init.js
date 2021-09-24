const { Command } = require('@oclif/command');

const defaultFlags = require('../flags/default-flags');
const { initChangelog } = require('../utils/init-changelog');

class InitCommand extends Command {
  async run() {
    const { flags } = this.parse(InitCommand);

    return initChangelog(flags);
  }
}

InitCommand.description = 'Create a new changelog file';
InitCommand.flags = defaultFlags;

module.exports = InitCommand;
