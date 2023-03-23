const core = require('@actions/core');
const fs = require('fs');

/**
 * @param {PathLike} from_file
 * @param {PathLike} to_file
 */
function replace_envs(from_file, to_file) {
  if (!fs.existsSync(from_file)) {
    throw new Error(`Source file ${from_file} not found`);
  }
  const data = fs.readFileSync(from_file, 'utf8');
  const res = data.replace(/\${\w+}/gi, (c) => {
    const match = c.match(/\${(?<var>\w+)}/i);
    const key = match[1];
    const env = process.env[key];

    if (typeof env === 'undefined') {
      throw new Error(`environment variable ${key} not found`);
    } else {
      core.info(`replacing environment variable ${key}.`);
    }
    return env;
  });
  fs.writeFileSync(to_file, res);
  core.info(`File ${to_file} saved.`);
}

module.exports = replace_envs;
