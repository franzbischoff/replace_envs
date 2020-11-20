const core = require('@actions/core');
const file = require('./edit_file');
const fs = require('fs');

// most @actions toolkit packages have async methods
async function main() {
    try {
        core.debug('Inside try block');

        const from_file = core.getInput('from_file');
        const to_file = core.getInput('to_file');

        if (!from_file) {
            core.warning('`from_file` was not set, defaults to `README.md`');
        }

        if (core.isDebug()) {
            core.debug('DEBUG TEST');
        } else {
            core.debug('Not Debug test');
        }
        core.info('Starting Process');

        // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

        if (file(from_file, to_file)) {
            core.info('All ok');
        } else {
            core.info('Some error');
        }

        core.info('Trying to print the file now');
        let data = fs.readFileSync('README.md', 'utf8');
        core.info('File content:');
        core.info(data)

    } catch (err) {
        // setFailed logs the message and sets a failing exit code
        core.setFailed(`Action failed with error ${err}`);
    }
}

main().then();

