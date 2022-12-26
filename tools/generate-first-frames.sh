#!/usr/bin/env bash
pushd public/memes
for GIF in *.gif; do
  gifsicle "$GIF" "#0" > firstFrames/"$GIF"
done
