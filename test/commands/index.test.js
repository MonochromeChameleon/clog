const { expect } = require('@oclif/test');
const fs = require('fs/promises');
const path = require('path');
const { stdin } = require('mock-stdin');

const IndexCommand = require('../../src/commands');

const { provideInputs, keys } = require('../utils/keyboard-input');

const expectationsPath = path.join(__dirname, '../expectations');
const tmpDir = path.join(__dirname, '../../tmp');

const file = 'CHANGELOG_INDEX.md';

describe('clog changelog cli utility', () => {
  let io;

  before(async () => {
    await fs.rmdir(tmpDir, { recursive: true, force: true });
    await fs.mkdir(tmpDir, { recursive: true });
    io = stdin();
  });

  after(() => {
    io.restore();
  });

  it('Does everything', async () => {
    const index = new IndexCommand([`--directory=${tmpDir}`, `--file=${file}`]);
    const expectation = index.run();
    // Add an addition
    await provideInputs(io, keys.enter, 'Hi There', keys.enter);
    // Add a change
    await provideInputs(io, keys.down, keys.enter, 'How are you?', keys.enter);
    // Add a removal
    await provideInputs(io, keys.down, keys.down, keys.enter, 'Does this work?', keys.enter);
    // Add a hundred lols
    await provideInputs(io, keys.enter, Array.from({ length: 100 }).map(() => 'lol').join(' '), keys.enter);
    // Exit
    await provideInputs(io, keys.enter, keys.enter);
    await expectation;

    const actual = await fs.readFile(path.join(tmpDir, file), 'UTF8');
    const expected = await fs.readFile(path.join(expectationsPath, file), 'UTF8');

    expect(actual).to.eq(expected);
  });
});
