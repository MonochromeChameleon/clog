const { Command } = require('@oclif/command');

const defaultFlags = require('../flags/default-flags');
const { updateChangelog } = require('../utils/update-changelog');
const { singleChange } = require('../utils/collect-changes');
const Change = require('../models/change');

class SingleChangeCommandBase extends Command {
  /* istanbul ignore next */
  get changeType() {
    // Abstract method, no point testing
    throw new Error('Calling getter on base class');
  }

  async run() {
    const { flags, argv } = this.parse(this.constructor);

    const arg = argv.join(' ') || undefined;
    const change = await singleChange(this.changeType, arg);
    return updateChangelog(cl => cl.addUnreleasedChanges(new Change(this.changeType).append(change)), flags);
  }
}

SingleChangeCommandBase.flags = defaultFlags;
SingleChangeCommandBase.strict = false;

module.exports = SingleChangeCommandBase;
