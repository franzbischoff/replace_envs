module.exports = edit_file;

function edit_file(filename) {

    const fs = require('fs')

    try {
        if (fs.existsSync(filename)) {
            return true
        }
    } catch (err) {
        console.error(err)
    }

    return false
}
