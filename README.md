An app for stashing quality reaction memes.

## Design

This site hardcodes the displayed memes in the repo under `public/memes`. It
also displays placeholder images. To support that feature, generate files
containing the first frame of each GIF. Use `bash tools/generate-first-frames.sh`.

## Development

This section is intended for developers.

### Dev environment setup

This section describes how to set up the development environment.

This project requires the following tools:

1. [Lefthook](https://github.com/evilmartians/lefthook)
1. [Commitlint](https://github.com/conventional-changelog/commitlint)
1. [Prettier](https://prettier.io)

To setup the project, run the following:

1. Install Lefthook's hooks:

```shell
lefthook install
```
