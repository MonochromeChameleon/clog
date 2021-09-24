const { expect, test } = require('@oclif/test');
const fs = require('fs/promises');
const path = require('path');

const fixturesPath = path.join(__dirname, '../fixtures');
const expectationsPath = path.join(__dirname, '../expectations');
const tmpDir = path.join(__dirname, '../../tmp');

const file = 'CHANGELOG_REFORMAT.md';

describe('reformat', () => {
  before(() => fs.cp(fixturesPath, tmpDir, { recursive: true }));

  test
    .command(['reformat', '--no-write', `--directory=${tmpDir}`, `--file=${file}`])
    .it('does nothing when --no-write is set', async () => {
      const actual = await fs.readFile(path.join(tmpDir, file), 'UTF8');
      const expected = await fs.readFile(path.join(fixturesPath, file), 'UTF8');

      expect(actual).to.eq(expected);
    });

  test
    .command(['reformat', `--directory=${tmpDir}`, `--file=${file}`])
    .it('reformats the changelog file', async () => {
      const actual = await fs.readFile(path.join(tmpDir, file), 'UTF8');
      const expected = await fs.readFile(path.join(expectationsPath, file), 'UTF8');

      expect(actual).to.eq(expected);
    });
});
