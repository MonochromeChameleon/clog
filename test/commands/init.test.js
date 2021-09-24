const { expect, test } = require('@oclif/test');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const InitCommand = require('../../src/commands/init');

const expectationsPath = path.join(__dirname, '../expectations');
const tmpDir = path.join(__dirname, '../../tmp');

const file = 'CHANGELOG_INIT.md';

describe('init', () => {
  afterEach(() => fs.unlink(path.join(tmpDir, file)).catch(() => {}));

  describe('If a changelog file already exists', () => {
    const file = `CHANGELOG_${randomUUID()}.md`;

    before(() => fs.writeFile(path.join(tmpDir, file), 'Not a changelog'));

    it('does nothing', async () => {
      const cmd = new InitCommand([`--directory=${tmpDir}`, `--file=${file}`]);
      await cmd.run();

      const actual = await fs.readFile(path.join(tmpDir, file), 'UTF8');
      expect(actual).to.eq('Not a changelog');
    });
  });

  describe('If --no-write is set', () => {
    const file = `CHANGELOG_${randomUUID()}.md`;

    test
      .command(['init', `--directory=${tmpDir}`, `--file=${file}`, '--no-write'])
      .it('does nothing', async () => {
        let err;

        await fs.stat(path.join(tmpDir, file), 'UTF8').catch(error => {
          err = error;
        });

        expect(err.code).to.eq('ENOENT');
      });
  });

  describe('When the URL is not provided', () => {
    const file = `CHANGELOG_${randomUUID()}.md`;

    test
      .command(['init', `--directory=${tmpDir}`, `--file=${file}`])
      .it('creates a new changelog file without links', async () => {
        const actual = await fs.readFile(path.join(tmpDir, file), 'UTF8');
        const expected = await fs.readFile(path.join(expectationsPath, 'CHANGELOG_INIT.md'), 'UTF8');

        expect(actual).to.eq(expected.slice(0, 29));
      });
  });

  describe('When the URL is provided', () => {
    const file = `CHANGELOG_${randomUUID()}.md`;

    test
      .command(['init', `--directory=${tmpDir}`, `--file=${file}`, '--url=https://github.com/MonochromeChameleon/clog'])
      .it('creates a new changelog file without links', async () => {
        const actual = await fs.readFile(path.join(tmpDir, file), 'UTF8');
        const expected = await fs.readFile(path.join(expectationsPath, 'CHANGELOG_INIT.md'), 'UTF8');

        expect(actual).to.eq(expected);
      });
  });
});
