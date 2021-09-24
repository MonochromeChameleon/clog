
function splitLineToLength(line, length = 100, prefix = '- ') {
  return `${prefix}${line}`.split(/\s/).reduce((sofar, word) => {
    const currentLine = sofar.pop();
    const newLine = [currentLine, word].filter(it => it).join(' ');
    if (newLine.length > length) {
      return [...sofar, currentLine, `${prefix.replace(/./, ' ')}${word}`];
    }
    return [...sofar, newLine];
  }, []);
}

class Change {
  constructor(type) {
    this.type = type.toLowerCase();
    this.change = '';
  }

  append(fragment) {
    this.change = [this.change, fragment.replace(/^-?\s*/, '')].filter(it => it).join(' ');
    return this;
  }

  toString() {
    return splitLineToLength(this.change).join('\n');
  }
}

module.exports = Change;
