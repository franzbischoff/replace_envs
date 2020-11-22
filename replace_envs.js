module.exports = replace_envs;

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
            let data = fs.readFileSync(from_file, 'utf8');
            let res = data.replace(/\${\w+}/gi,
                function (c) {
                    let res = c.match(/\${(\w+)}/i);
                    let env = process.env[res[1]];

                    if (typeof env === 'undefined') {
                        core.warning(`Environment Variable ${res[1]} not found!`);
                        result = false;
                        env = c;
                    } else {
                        core.info(`Replacing Environment Variable ${res[1]}.`);
                    }
                    return (env);
                });
            fs.writeFileSync(to_file, res);
            core.info(`File ${to_file} saved.`);
        }
    } catch (err) {
        console.error(err)
    }

    return result;
}
