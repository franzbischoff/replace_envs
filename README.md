<!-- badges -->

<!-- end badges -->

# Replace Environment Variables Action

This action has the simple task of replacing the placeholders of Environment Variables with their values.

For example, you have a README.md file in a template repository, and you want to have a link that points to your
new repository just after you 'fork' it.

So in your template repository, you may have a line like this:

> https://github.com/${GITHUB_REPOSITORY}/

And this will be translated (as in this repository) as:

> https://github.com/franzbischoff/replace_envs/

In [this link](https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables) is the default 
list of environment variables that Github has set.

In addition, you may set your own variables in the workflow YAML file like this:

```yaml
    env:
      MY_CUSTOM_VARIABLE: 'some value'
```

That's all it does.

Lastly, just three comments:

- I've created two new variables called `REPOSITORY_ACCOUNT` and `REPOSITORY_ACCOUNT` that is derived from the
 `GITHUB_REPOSITORY` variable, to make it easier to use in some use-cases.
- The changes are by default `pushed` to the repository. If this action is part of a chain of steps, and you want to 
push the changes later, by yourself, you can disable this behavior with the parameter `commit: 'false'`.
- The input and output file can be either a `template -> definitive` or `definitive -> definitive`; this just means that
 the input and output may be the same file. The later attempts to replace, by this action, will 'fail' safely without an
  Error code.

# Usage

Create a YAML file at `.github/workflows/myworkflow.yml`
> GITHUB_TOKEN must be set, otherwise this action cannot perform changes in your repository.

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: franzbischoff/replace_envs@v1
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      MY_CUSTOM_VARIABLE: 'some value'
    with:
      from_file: 'README.md'
      to_file: 'README.md'
      commit: 'true'
```

# Code of Conduct
Please note that this project is released with a Contributor [Code of Conduct](CODE_OF_CONDUCT.md). By contributing to
 this project, you agree to abide by its terms.

# License
The scripts and documentation in this project are released under the [MIT License](LICENSE)

# Contributions
Contributions are welcome!  See [Contributor's Guide](CONTRIBUTING.md)

## Code of Conduct
:wave: Be nice. See [the code of conduct](CODE_OF_CONDUCT.md)
