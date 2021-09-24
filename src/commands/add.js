const Base = require('../lib/single-change-command-base');
const { ADDED } = require('../models/constants');

class AddCommand extends Base {
  get changeType() {
    return ADDED;
  }
}

AddCommand.description = 'Note unreleased additions in your changelog file';
AddCommand.flags = Base.flags;
AddCommand.strict = Base.strict;

module.exports = AddCommand;
