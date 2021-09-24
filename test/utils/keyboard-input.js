const keys = {
  up: '\u001B\u005B\u0041',
  down: '\u001B\u005B\u0042',
  enter: '\u000D',
  space: '\u0020',
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function provideInputs(io, ...inputs) {
  for (let input of inputs) {
    await delay(100); // eslint-disable-line no-await-in-loop
    io.send(input);
  }
}

module.exports = { provideInputs, keys };
