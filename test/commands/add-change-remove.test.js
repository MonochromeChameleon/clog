/* eslint-disable max-nested-callbacks */

const { expect } = require('@oclif/test');
const fs = require('fs/promises');
const path = require('path');
const { stdin } = require('mock-stdin');
const { randomUUID } = require('crypto');

const expectationsPath = path.join(__dirname, '../expectations');
const tmpDir = path.join(__dirname, '../../tmp');

const AddCommand = require('../../src/commands/add');
const ChangeCommand = require('../../src/commands/change');
const RemoveCommand = require('../../src/commands/remove');
const InitCommand = require('../../src/commands/init');

const { provideInputs, keys } = require('../utils/keyboard-input');

const commands = {
  add: AddCommand,
  change: ChangeCommand,
  remove: RemoveCommand,
};

Object.keys(commands).forEach(cmd => {
  const Command = commands[cmd];

  describe(Command.name, () => {
    let io;
    before(() => {
      io = stdin();
    });

    after(() => {
      io.restore();
    });

    [
      'When the URL can be extracted from the CHANGELOG file',
      'When the URL is provided as a flag',
      'When the URL is not available',
    ].forEach((desc, urlix) => {
      let urlFlag = urlix === 1 ? ['--url=https://github.com/MonochromeChameleon/clog'] : [];

      describe(desc, () => {
        ['Interactive command line', 'With command line arguments'].forEach((clidesc, cliix) => {
          describe(clidesc, () => {
            const file = `CHANGELOG_${randomUUID()}.md`;

            it('Does nothing when --no-write is set', async () => {
              if (urlix === 0) {
                await new InitCommand([`--directory=${tmpDir}`, `--file=${file}`, '--url=https://github.com/MonochromeChameleon/clog']).run();
              }
              const content = randomUUID();
              const contentArg = cliix ? [content] : [];
              const runner = new Command([`--directory=${tmpDir}`, `--file=${file}`, '--no-write', ...urlFlag, ...contentArg]);
              const expectation = runner.run();
              if (!cliix) {
                await provideInputs(io, content, keys.enter);
              }
              await expectation;

              if (urlix === 0) {
                const actual = await fs.readFile(path.join(tmpDir, file), 'UTF8');
                expect(actual).not.to.contain(content);
              } else {
                let err;

                await fs.stat(path.join(tmpDir, file)).catch(error => {
                  err = error;
                });

                expect(err.code).to.eq('ENOENT');
              }
            });

            it('Takes user input and adds it to the changelog file', async () => {
              if (urlix === 0) {
                await new InitCommand([`--directory=${tmpDir}`, `--file=${file}`, '--url=https://github.com/MonochromeChameleon/clog']).run();
              }

              const content = randomUUID();
              const contentArg = cliix ? [content] : [];
              const runner = new Command([`--directory=${tmpDir}`, `--file=${file}`, ...urlFlag, ...contentArg]);
              const expectation = runner.run();
              if (!cliix) {
                await provideInputs(io, content, keys.enter);
              }
              await expectation;

              const actual = await fs.readFile(path.join(tmpDir, file), 'UTF8');
              const expected = await fs.readFile(path.join(expectationsPath, 'CHANGELOG_BLANK.md'), 'UTF8');
              const sliceIx = urlix === 2 ? 64 : 125;

              expect(actual).to.eq(expected.slice(0, sliceIx).replace('**ChangeType**', runner.changeType).replace('**Content**', content));
            });
          });
        });
      });
    });
  });
});
