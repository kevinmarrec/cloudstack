# Contributing Guide

Hi! We are really excited that you are interested in contributing to Cloudstack. Before submitting your contribution, please make sure to take a moment and read through the following guide.

## Opinion Warning

Cloudstack being heavily opinionated, owners and maintainers of the project are not open to all kinds of contributions. We are looking for contributions that align with the vision of Cloudstack and its ecosystem, so make sure to ask questions in [GitHub Discussions](https://github.com/kevinmarrec/cloudstack/discussions) before starting to work on a new feature.

## Set up your local development environment

The Cloudstack repository is a monorepo using Bun workspaces. The package manager used to install and link dependencies must be [Bun](https://bun.sh).

To develop and test Cloudstack, follow these steps:

1. Fork the Cloudstack repository to your own GitHub account and then clone it to your local environment.

2. Ensure you are using the latest Node.js LTS (>= 22.x).

3. Cloudstack uses Bun v1.2, so make sure you have a compatible version installed.

4. Install dependencies: run `bun install --frozen-lockfile` from Cloudstack's root folder.

## Development Workflow

If you are working on a new feature or bug, follow these steps:

1. Check out a branch where you can work and commit your changes:

```shell
git checkout -b my-new-branch-or-feature
```

2. Add the changes to the codebase.

3. Add new tests when adding new features or fixing bugs (not always necessary, but it's a good practice): you can reuse existing tests or create new ones in the `test` folder of the package(s) you're working on. Cloudstack uses [Vitest](https://vitest.dev) as the test runner.

4. Test locally your changes by running the playground in your local environment

5. Run `bun run build` to build the packages: the playground will use the built packages

6. Run `bun run playground` (requires [Docker Compose](https://docs.docker.com/compose/)) and check your changes in the browser

7. Run the checks: `bun run check` and the tests: `bun run test`.

8. Commit and push your changes to your fork using conventional commits. Then, create a pull request to the `main` branch of the Cloudstack repository:

```shell
git add .
git commit -m "feat: my new feature"
git push origin my-new-branch-or-feature
```

## Documentation

Cloudstack documentation is only made of Markdown files (`README.md`) in each package, so you can directly edit these files in your branch.

## CI errors

Sometimes when you push your changes to create a new pull request (PR), the CI can fail, but we cannot check the logs to see what went wrong.

You can run the following commands in your local environment to fix CI errors:

- `bun run check` to run checks
- `bun run test` to run unit tests, maybe you also need to update snapshots: in that case you can run `bun run test -u`
