const core = require('@actions/core');
const fs = require('fs');

/**
 * @param {PathLike} from_file
 * @param {PathLike} to_file
 */
function replace_envs(from_file, to_file) {
  let result = true;

  try {
    if (fs.existsSync(from_file)) {
      const data = fs.readFileSync(from_file, 'utf8');
      const res = data.replace(/\${\w+}/gi, (c) => {
        const match = c.match(/\${(?<var>\w+)}/i);
        let env = process.env[match[1]];

        if (typeof env === 'undefined') {
          throw new Error(`Environment Variable ${match[1]} not found`);
        } else {
          core.info(`Replacing Environment Variable ${match[1]}.`);
        }
        return env;
      });
      fs.writeFileSync(to_file, res);
      core.info(`File ${to_file} saved.`);
    } else {
      throw new Error(`Source file ${from_file} not found`)
    }
  } catch (err) {
    core.error(err);
  }
}

module.exports = replace_envs;
