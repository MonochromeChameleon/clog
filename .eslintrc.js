const testFile = {
  rules: {
    'no-unused-expressions': 0, // Chai's expect syntax is troublesome with this
  },
  globals: {
    before: false,
    after: false,
    beforeEach: false,
    afterEach: false,
    describe: false,
    it: false,
    expect: false,
  },
};

module.exports = {
  extends: 'oclif',
  rules: {
    semi: [2, 'always'],
    'object-curly-spacing': [2, 'always'],
    indent: ['error', 2, { 'MemberExpression': 1 }]
  },
  parserOptions: {
    ecmaVersion: 2019
  },
  overrides: [
    { files: ['test/**/*'], ...testFile },
  ],
}
