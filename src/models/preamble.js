class Preamble {
  constructor() {
    this.lines = [];
  }

  addLine(line) {
    if (this.lines.length > 0) {
      this.lines.push(line);
    } else if (line && line !== '# Changelog') {
      this.lines.push(line);
    }
    return this;
  }

  toString() {
    // Drop trailing newlines
    const lines = this.lines.slice(0, this.lines.lastIndexOf(this.lines.filter(it => it).reverse()[0]) + 1);
    return `# Changelog\n\n${lines.join('\n')}`;
  }
}

module.exports = Preamble;
