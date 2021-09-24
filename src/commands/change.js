const Base = require('../lib/single-change-command-base');
const { CHANGED } = require('../models/constants');

class ChangeCommand extends Base {
  get changeType() {
    return CHANGED;
  }
}

ChangeCommand.description = 'Note unreleased changes in your changelog file';
ChangeCommand.flags = Base.flags;
ChangeCommand.strict = Base.strict;

module.exports = ChangeCommand;
