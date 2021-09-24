const Base = require('../lib/single-change-command-base');
const { REMOVED } = require('../models/constants');

class RemoveCommand extends Base {
  get changeType() {
    return REMOVED;
  }
}

RemoveCommand.description = 'Note unreleased removals in your changelog file';
RemoveCommand.flags = Base.flags;
RemoveCommand.strict = Base.strict;

module.exports = RemoveCommand;
