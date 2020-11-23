const file = require('../src/replace_envs');

test('read file', async () => {
  expect(file('README.md', 'README.md')).toBeTruthy();
});
