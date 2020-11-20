module.exports = edit_file;

const core = require('@actions/core');
const fs = require('fs');
// const replace = require("find-and-replace-anything");

function edit_file(from_file, to_file) {

    try {
        if (fs.existsSync(from_file)) {
            let data = fs.readFileSync(from_file, 'utf8');
            let result = data.replace(/Just/g, 'Only');
            fs.writeFileSync(to_file, result);
            core.info(`File ${to_file} saved.`);
        }
    } catch (err) {
        console.error(err)
    }

    return true;
}
