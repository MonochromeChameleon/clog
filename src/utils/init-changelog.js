const fs = require('fs/promises');
const path = require('path');

const Changelog = require('../models/changelog');

async function initChangelog({ directory, file, write, url }) {
  const changelogFilePath = path.join(directory, file);
  const changelog = new Changelog(url);

  return fs.readFile(changelogFilePath, 'UTF8')
    .catch(async () => {
      if (write) {
        await fs.writeFile(changelogFilePath, changelog.toString());
      }
    });
}

module.exports = { initChangelog };
