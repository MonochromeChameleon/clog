const { Command } = require('@oclif/command');

const { updateChangelog } = require('../utils/update-changelog');
const defaultFlags = require('../flags/default-flags');

class ReformatCommand extends Command {
  run() {
    const { flags } = this.parse(ReformatCommand);
    return updateChangelog(it => it, flags);
  }
}

ReformatCommand.description = 'Reformat the changelog';
ReformatCommand.flags = defaultFlags;

module.exports = ReformatCommand;
