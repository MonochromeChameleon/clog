const { Command } = require('@oclif/command');

const defaultFlags = require('../flags/default-flags');
const { updateChangelog } = require('../utils/update-changelog');
const { collectChanges } = require('../utils/collect-changes');

class IndexCommand extends Command {
  async run() {
    const { flags } = this.parse(IndexCommand);

    const changes = await collectChanges();
    return updateChangelog(cl => cl.addUnreleasedChanges(...changes), flags);
  }
}

IndexCommand.description = 'Note unreleased changes in your changelog file';
IndexCommand.flags = defaultFlags;

module.exports = IndexCommand;
