const releaseHeaderRegex = /## \[(.*)]\s?-?\s?([\d-]*)/;
const linkLineRegex = /^\[(.*)]:\s*(.+:\/\/.*)/;

const isReleaseHeader = line => releaseHeaderRegex.test(line);
const parseReleaseHeader = line => releaseHeaderRegex.exec(line).slice(1).reduce((out, h, ix) => ({ ...out, [ix ? 'date' : 'version']: h }), {});

const isLinkLine = line => linkLineRegex.test(line);
const parseLinkLine = line => linkLineRegex.exec(line).slice(1).reduce((out, p, ix) => ({ ...out, [ix ? 'url' : 'version']: p }), {});

module.exports = { isReleaseHeader, parseReleaseHeader, isLinkLine, parseLinkLine };
