const fs = require('fs/promises');
const path = require('path');

const Changelog = require('../models/changelog');

async function updateChangelog(update, { directory, file, write, url }) {
  const changelogFilePath = path.join(directory, file);
  const changelog = new Changelog(url);

  return fs.readFile(changelogFilePath, 'UTF8')
    .catch(() => '')
    .then(file => changelog.parse(file))
    .then(update)
    .then(async cl => {
      if (write) {
        await fs.writeFile(changelogFilePath, cl.toString());
      }
      return cl;
    });
}

module.exports = { updateChangelog };
