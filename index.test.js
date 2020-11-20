const file = require('./edit_file');

test('read file', async () => {
    expect(file("README.md")).toBeTruthy()
});

