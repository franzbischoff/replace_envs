const fs = require('fs');
const replace_envs = require('../src/replace_envs');

process.env.GITHUB_ACTION = 'Action';
process.env.GITHUB_WORKFLOW = 'Workflow';

test('Replace template', async () => {
  expect(replace_envs('tests/INPUT.md', 'tests/OUTPUT.md')).toBeTruthy();
});

test('Confirm template', async () => {
  const data = fs.readFileSync('tests/OUTPUT.md', 'utf8');
  expect(data.search('Action')).toBe(33);
  expect(data.search('Workflow')).toBe(20);
});
