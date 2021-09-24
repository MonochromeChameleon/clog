const Change = require('./change');
const Version = require('./version');
const { changeTypes, UNRELEASED } = require('./constants');
const { datestamp } = require('../utils/datestamp');

class Release {
  constructor(version = UNRELEASED, date) {
    this.version = new Version(version);
    this.date = date;
    this.changes = [];
    this.changeType = undefined;
  }

  get hasChanges() {
    return this.changes.length > 0;
  }

  get isUnreleased() {
    return this.version.isUnreleased;
  }

  release(version, date) {
    this.version = version;
    this.date = datestamp(date);

    return this;
  }

  get datestamp() {
    if (this.date) {
      return ` - ${this.date}`;
    }
    return '';
  }

  changesFor(changeType) {
    return `### ${changeType.charAt(0).toUpperCase()}${changeType.slice(1)}\n\n${this.changes.filter(c => c.type === changeType).join('\n')}`;
  }

  addLine(line) {
    if (changeTypes.some(ct => line.trim() === `### ${ct}`)) {
      this.changeType = line.slice(4).toLowerCase();
    } else if (line.startsWith('-')) {
      this.changes.push(new Change(this.changeType).append(line));
    } else {
      const change = this.changes.pop();
      this.changes.push(change.append(line));
    }
    return this;
  }

  toLink(url, latestVersion) {
    if (!url) {
      return '';
    }
    if (this.version.isUnreleased && latestVersion) {
      return `[${UNRELEASED.toLowerCase()}]: ${url}/compare/v${latestVersion}...HEAD`;
    }
    if (this.version.isUnreleased) {
      return `[${UNRELEASED.toLowerCase()}]: ${url}`;
    }
    return `[${this.version}]: ${url}/releases/tag/v${this.version}`;
  }

  toString() {
    const changeTypes = [...new Set(this.changes.map(c => c.type))].sort();
    const changes = changeTypes.map(ct => this.changesFor(ct));
    return [`## [${this.version}]${this.datestamp}`, ...changes].join('\n\n');
  }
}

module.exports = Release;
