const { UNRELEASED } = require('./constants');

class Version {
  constructor(major, minor = 0, patch = 0) {
    if (major === UNRELEASED || major === UNRELEASED.toLowerCase()) {
      this.major = UNRELEASED;
    } else {
      const [mj, mn = minor, pt = patch] = `${major}`.split('.').map(Number);
      this.major = mj;
      this.minor = mn;
      this.patch = pt;
    }
  }

  get isUnreleased() {
    return this.major === UNRELEASED;
  }

  compareTo(other) {
    const unreleased = [this, other].find(it => it.isUnreleased);
    if (unreleased) {
      // Nasty way to avoid a untestable branch
      return (2 * [this, other].indexOf(unreleased)) - 1;
    }

    return (other.major - this.major) || (other.minor - this.minor) || (other.patch - this.patch);
  }

  bump(bumpType) {
    const bump = bumpType.toLowerCase();
    if (bump === 'major') {
      return new Version(this.major + 1, 0, 0);
    }
    if (bump === 'minor') {
      return new Version(this.major, this.minor + 1, 0);
    }
    return new Version(this.major, this.minor, this.patch + 1);
  }

  toString() {
    if (this.isUnreleased) {
      return UNRELEASED;
    }
    return [this.major, this.minor, this.patch].join('.');
  }
}

module.exports = Version;
