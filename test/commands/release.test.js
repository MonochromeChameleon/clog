const { expect, test } = require('@oclif/test');
const fs = require('fs/promises');
const path = require('path');

const fixturesPath = path.join(__dirname, '../fixtures');
const expectationsPath = path.join(__dirname, '../expectations');
const tmpDir = path.join(__dirname, '../../tmp');

const { datestamp } = require('../../src/utils/datestamp');

const file = 'CHANGELOG_RELEASE.md';

describe('release', () => {
  beforeEach(() => fs.cp(fixturesPath, tmpDir, { recursive: true }));

  ['major', 'minor', 'patch'].forEach((semver, ix) => {
    describe(semver, () => {
      test
        .command(['release', semver, `--directory=${tmpDir}`, `--file=${file}`])
        .it('creates a new release entry, populated with previously-unreleased changes', async () => {
          const actual = await fs.readFile(path.join(tmpDir, file), 'UTF8');
          const expected = await fs.readFile(path.join(expectationsPath, file), 'UTF8');

          const version = [0, 0, 0];
          version[ix] = 1;

          expect(actual).to.eq(expected.replaceAll('**VERSION**', version.join('.')).replace('**DATE**', datestamp()));
        });
    });
  });
});
