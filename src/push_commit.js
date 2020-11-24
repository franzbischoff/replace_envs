const exec = require('@actions/exec');
const core = require('@actions/core');

async function push_commit() {
  // noinspection LongLine
  const remote_repo = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`;

  try {
    await exec.exec(`git config --global user.name "github-actions[bot]"`);
    await exec.exec(`git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"`);
    await exec.exec(`git add -A`);
    await exec.exec(`git commit -m "Update README"`);
    await exec.exec(`git push ${remote_repo}`);

    // git push "${remote_repo}" HEAD:${INPUT_BRANCH} --follow-tags $_FORCE_OPTION $_TAGS;
  } catch (err) {
    core.info(`Commit failed: ${err}`);
  }
}

module.exports = push_commit;
