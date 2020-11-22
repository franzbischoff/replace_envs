const file = require('./replace_envs');

test('read file', async () => {
    expect(file("README.md", "README.md")).toBeTruthy()
});

