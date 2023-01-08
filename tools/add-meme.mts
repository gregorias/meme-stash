// A CLI utility that adds a meme to the project.
//
// Usage:
//   ts-node --esm tools/add-meme.mts GIF_FILENAME
//
// This command will:
// 1. Copy the meme to the memes directory.
// 2. Generate first frames.
// 3. Add the meme to the static registry.
import fs from "node:fs";
import { argv } from "node:process";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import path from "node:path";
import {
  ArrayLiteralExpression,
  Project,
  SourceFile,
  VariableDeclaration,
} from "ts-morph";
import { exec } from "node:child_process";

async function main(): Promise<void> {
  const memePath: string = extractFilePath();
  const memeBasename: string = path.basename(memePath);

  fs.copyFileSync(memePath, `public/memes/${memeBasename}`);
  exec(`git add 'public/memes/${memeBasename}'`);
  exec("bash tools/generate-first-frames.sh");
  if (memeBasename.endsWith(".gif")) {
    exec(`git add 'public/memes/firstFrames/${memeBasename}'`);
  }

  const rl = readline.createInterface({ input, output });
  const memeId = await rl.question(
    'Provide the meme\'s identifier (e.g., "fooMeme"): '
  );
  const memeDescription = await rl.question(
    'Provide the meme\'s description (e.g., "A foo guy doing bar."): '
  );
  const memeTags = await rl.question(
    'Provide the meme\'s tags (e.g., "foo foo-meme"): '
  );
  rl.close();

  addMemeToRegistry(memeId, memeBasename, memeDescription, memeTags.split(" "));
  exec("prettier --write .");
  // Not adding src/meme.ts, so that the operator is incentivized to verify.
}

function extractFilePath(): string {
  if (argv.length < 3) throw new Error("No meme filename has been provided.");
  return argv[2];
}

async function addMemeToRegistry(
  memeName: string,
  memeBasename: string,
  memeDescription: string,
  tags: string[]
) {
  const MEME_REGISTRY_FILENAME = "src/meme.ts";
  const project = new Project({ tsConfigFilePath: "./tsconfig.json" });
  const memeSource: SourceFile = project.getSourceFileOrThrow(
    MEME_REGISTRY_FILENAME
  );
  memeSource.addImportDeclaration({
    defaultImport: memeName,
    moduleSpecifier: `../public/memes/${memeBasename}`,
  });
  const memesArray: VariableDeclaration = memeSource
    .getVariableStatementOrThrow("MEMES")
    .getDeclarations()[0];
  const memesInitializer = memesArray.getInitializer();
  if (!(memesInitializer instanceof ArrayLiteralExpression)) throw new Error();
  memesInitializer.addElement(`{ img: ${memeName}, src: '${memeBasename}',
                              description: ${JSON.stringify(memeDescription)},
                              tags: [${tags
                                .map((t) => '"' + t + '"')
                                .join(",")}]}`);
  await project.save();
}

main();
