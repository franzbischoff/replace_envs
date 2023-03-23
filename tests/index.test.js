const fs = require('fs');
const replace_envs = require('../src/replace_envs');

test('Replace template', () => {
  process.env.GITHUB_ACTION = 'Action';
  process.env.GITHUB_WORKFLOW = 'Workflow';
  replace_envs('tests/INPUT.md', 'tests/OUTPUT.md');
  const data = fs.readFileSync('tests/OUTPUT.md', 'utf8');
  expect(data.search('Action')).toBe(33);
  expect(data.search('Workflow')).toBe(20);
});

test('fails on undefined env vars', () => {
  process.env.GITHUB_ACTION = 'Action';
  delete process.env.GITHUB_WORKFLOW;
  expect(() => {
    replace_envs('tests/INPUT.md', 'tests/OUTPUT.md');
  }).toThrow('environment variable GITHUB_WORKFLOW not found');
});
