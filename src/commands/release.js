const { Command } = require('@oclif/command');

const { updateChangelog } = require('../utils/update-changelog');
const defaultFlags = require('../flags/default-flags');

class ReleaseCommand extends Command {
  run() {
    const { flags, args: { semver } } = this.parse(ReleaseCommand);
    return updateChangelog(cl => cl.release(semver), flags);
  }
}

ReleaseCommand.description = 'Update the changelog file to include all unreleased changes in a new release';
ReleaseCommand.flags = defaultFlags;
ReleaseCommand.args = [{
  name: 'semver',
  required: true,
  description: 'the semver level to increment the release by',
  options: ['major', 'minor', 'patch'],
}];

module.exports = ReleaseCommand;
