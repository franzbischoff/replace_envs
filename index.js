const core = require('@actions/core');
const file = require('./edit_file');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('filename')
    core.setOutput('time', new Date().toTimeString());
    core.info(`Starting Process`)

    core.debug((new Date()).toTimeString()) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    if(file('README.md'))
      core.info('Found File' + ms)
    else
      core.info('File not found')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
