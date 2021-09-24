const Release = require('./release');
const Version = require('./version');
const { UNRELEASED } = require('./constants');
const { isReleaseHeader, parseReleaseHeader, isLinkLine, parseLinkLine } = require('../utils/parsing-utils');

class Releases {
  constructor(url) {
    this.releases = {
      [UNRELEASED]: new Release(),
    };

    this.releaseId = undefined;
    this.url = url;
  }

  get isEmpty() {
    return !this.releaseId;
  }

  addLine(line) {
    if (!line) {
      return;
    }
    if (isReleaseHeader(line)) {
      const { version, date } = parseReleaseHeader(line);
      this.addRelease(version, date);
    } else if (isLinkLine(line)) {
      const { version, url } = parseLinkLine(line);
      this.addRelease(version);
      this.url = this.url || url.split(/\/releases|\/compare/)[0];
    } else {
      this.releases[this.releaseId].addLine(line);
    }
  }

  addRelease(version, date) {
    const release = new Release(version, date);
    this.releases[release.version] = this.releases[release.version] || release;
    this.releaseId = release.version.toString();
  }

  get sortedReleases() {
    return Object.values(this.releases).sort((a, b) => a.version.compareTo(b.version));
  }

  get latestVersion() {
    const [, lastRelease = {}] = this.sortedReleases;
    return lastRelease.version;
  }

  addUnreleasedChanges(...changes) {
    this.releases[UNRELEASED].changes.push(...changes);
    return this;
  }

  release(semver, date) {
    const newVersion = (this.latestVersion || new Version(0, 0, 0)).bump(semver);

    this.releases[newVersion] = this.releases[UNRELEASED].release(newVersion, date);
    this.releases[UNRELEASED] = new Release();

    return this.releases[newVersion];
  }

  get releaseNotes() {
    return this.sortedReleases.filter(it => it.hasChanges || it.isUnreleased).join('\n\n');
  }

  get links() {
    const latestVersion = this.latestVersion;
    return this.sortedReleases.map(it => it.toLink(this.url, latestVersion)).join('\n');
  }

  toString() {
    return [this.releaseNotes, this.links].join('\n\n');
  }
}

module.exports = Releases;
