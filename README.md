An app for stashing quality reaction memes.

## Design

This site hardcodes the memes in the repo under `public/memes`. It
also displays placeholder images that you pregenerate and save at `public/memes/firstFrames`.
You can pregenere the first frames of each GIF with `bash tools/generate-first-frames.sh`.

To add a new meme, run

```shell
ts-node --esm tools/add-meme.mts GIF_PATH
```

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
1. Initialize the project:
   ```shell
   npm i
   ```
