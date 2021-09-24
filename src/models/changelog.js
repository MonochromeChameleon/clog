const prettier = require('prettier');

const Preamble = require('./preamble');
const Releases = require('./releases');

const { isReleaseHeader, isLinkLine } = require('../utils/parsing-utils');

class Changelog {
  constructor(url) {
    this.preamble = new Preamble();
    this.releases = new Releases(url);
  }

  parse(changelog) {
    return changelog.split(/\n/)
      .reduce((cl, line) => cl.addLine(line), this);
  }

  release(semver, date = new Date()) {
    this.releases.release(semver, date);
    return this;
  }

  addUnreleasedChanges(...changes) {
    this.releases.addUnreleasedChanges(...changes);
    return this;
  }

  addLine(line) {
    if (this.releases.isEmpty && !isReleaseHeader(line) && !isLinkLine(line)) {
      this.preamble.addLine(line);
    } else {
      this.releases.addLine(line);
    }

    return this;
  }

  toString() {
    return prettier.format([this.preamble, this.releases, this.links].join('\n\n'), { parser: 'markdown' });
  }
}

module.exports = Changelog;
