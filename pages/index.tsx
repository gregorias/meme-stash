import path from "path";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import { getPlaiceholder } from "plaiceholder";
import styles from "../styles/Home.module.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { MemeDatabase, Meme, fuzzyMatchArray } from "../src/meme";
import { useMemo, useState } from "react";
import { Masonry } from "@mui/lab";

interface MemeImage {
  meme: StaticImageData;
  // Base64 encoded placeholder.
  placeholder?: string;
}

function Meme({ meme, placeholder }: MemeImage) {
  return (
    <Image
      className={styles.gif}
      src={meme}
      placeholder={placeholder ? "blur" : "empty"}
      blurDataURL={placeholder ? placeholder : undefined}
      alt="a meme"
    />
  );
}

interface MemeDisplayProps {
  memes: MemeImage[];
}

function MemeDisplay({ memes }: MemeDisplayProps) {
  return (
    /* Add a container that adds vertical margin.
      Can't do this in Masonry, because it has its own spacing. */
    <div className="my-4 w-full flex justify-center">
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        {memes.map((memeWithPlaceholder) => {
          return (
            <Meme
              meme={memeWithPlaceholder.meme}
              placeholder={memeWithPlaceholder.placeholder}
              key={memeWithPlaceholder.meme.src}
            />
          );
        })}
      </Masonry>
    </div>
  );
}

interface LoadedMeme {
  img: StaticImageData;
  placeholder?: string;
  tags: string[];
}

interface HomeProps {
  memes: LoadedMeme[];
}

export default function Home({ memes }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchTags = useMemo(() => searchQuery.split(" "), [searchQuery]);
  const displayedMemes = useMemo<MemeImage[]>(
    () =>
      (searchTags.length == 0 || searchTags[0] === ""
        ? memes
        : memes.filter((m) => fuzzyMatchArray(searchTags, m.tags))
      ).map((m) => {
        return { meme: m.img, placeholder: m.placeholder };
      }),
    [searchTags, memes]
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: "#6d1963",
      },
      secondary: {
        main: "#97D8B2",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Meme Stash</title>
          <meta
            name="description"
            content="An app for stashing quality reaction memes."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex justify-center px-6 md:px-24">
          <div className="flex flex-col flex-grow items-center max-w-screen-lg">
            <h1 className="text-center my-4 text-6xl md:text-9xl">
              Meme Stash
            </h1>
            <TextField
              id="search-box"
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth={true}
              autoFocus={true}
            />
            <MemeDisplay memes={displayedMemes} />
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}

async function extractGifPlaceholder(imgSrc: string): Promise<string | null> {
  if (!path.basename(imgSrc).endsWith(".gif")) return null;

  const plaiceholder = await getPlaiceholder("/memes/firstFrames/" + imgSrc);
  return plaiceholder.base64;
}

export async function getStaticProps() {
  const memeDb = new MemeDatabase();
  const rawMemes: Meme[] = memeDb.memes;
  const loadedMemes: LoadedMeme[] = [];
  for (let rawMeme of rawMemes) {
    const placeholder = await extractGifPlaceholder(rawMeme.src);
    let loadedMeme: LoadedMeme = { img: rawMeme.img, tags: rawMeme.tags };
    if (placeholder) loadedMeme.placeholder = placeholder;
    loadedMemes.push(loadedMeme);
  }
  return {
    props: { memes: loadedMemes },
  };
}
