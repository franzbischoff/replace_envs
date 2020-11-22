const core = require('@actions/core');
const file = require('./replace_envs');

// most @actions toolkit packages have async methods
async function main() {
    try {
        const from_file = core.getInput('from_file');
        const to_file = core.getInput('to_file');

        if (!from_file) {
            core.warning('`from_file` was not set, defaults to `README.md`');
        }

        if (!to_file) {
            core.warning('`from_file` was not set, defaults to `README.md`');
        }

        core.info('Starting Process');

        // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

        if (file(from_file, to_file)) {
            core.info('All ok.');
        } else {
            core.info('Something went wrong, check the logs.');
        }
    } catch (err) {
        // setFailed logs the message and sets a failing exit code
        core.setFailed(`Action failed with error ${err}`);
    }
}

// ENV VARS available on `act` library (for testing purposes)

// OK
// * CI: Always set to true.
// * GITHUB_WORKFLOW: The name of the workflow.
// * GITHUB_RUN_ID: A unique number for each run within a repository. This number does not change if you re-run the
//                  workflow run.
// * GITHUB_RUN_NUMBER: A unique number for each run of a particular workflow in a repository. This number begins at 1
//                      for the workflow's first run, and increments with each new run. This number does not change if
//                      you re-run the workflow run.
// * GITHUB_ACTION: The unique identifier (id) of the action.
// * GITHUB_ACTIONS: Always set to true when GitHub Actions is running the workflow. You can use this variable to
//                   differentiate when tests are being run locally or by GitHub Actions.
// * GITHUB_ACTOR: The name of the person or app that initiated the workflow. For example, octocat.
// * GITHUB_REPOSITORY: The owner and repository name. For example, octocat/Hello-World.
// * GITHUB_EVENT_NAME: The name of the webhook event that triggered the workflow.
// * GITHUB_EVENT_PATH: The path of the file with the complete webhook event payload.
//                      For example, /github/workflow/event.json.
// * GITHUB_WORKSPACE: The GitHub workspace directory path. The workspace directory is a copy of your repository if your
//                   workflow uses the actions/checkout action. If you don't use the actions/checkout action, the
//                   directory will be empty. For example, /home/runner/work/my-repo-name/my-repo-name.
// * GITHUB_SHA: The commit SHA that triggered the workflow.
// * GITHUB_REF: The branch or tag ref that triggered the workflow. For example, refs/heads/feature-branch-1. If neither
//               a branch or tag is available for the event type, the variable will not exist.

// NOT SEEN YET
// * GITHUB_HEAD_REF: Only set for forked repositories. The branch of the head repository.
// * GITHUB_BASE_REF: Only set for forked repositories. The branch of the base repository.
// * GITHUB_SERVER_URL: Returns the URL of the GitHub server. For example: https://github.com.
// * GITHUB_API_URL: Returns the API URL. For example: https://api.github.com.
// * GITHUB_GRAPHQL_URL

// OTHER ENV VARS SEEN
// * GITHUB_TOKEN
// * HOME
// * INPUT_TO_FILE
// * INPUT_FROM_FILE
// * YARN_VERSION
// * NODE_VERSION
// * RUNNER_TEMP
// * PATH
// * HOSTNAME
// * TERM
// * RUNNER_TOOL_CACHE
// * RUNNER_OS


main().then();

