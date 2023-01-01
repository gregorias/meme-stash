import path from "path";
import Head from "next/head";
import { Lobster, Roboto } from "@next/font/google";
import Image, { StaticImageData } from "next/image";
import { getPlaiceholder } from "plaiceholder";
import styles from "../styles/Home.module.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { MemeDatabase, Meme, fuzzyMatchArray } from "../src/meme";
import { useEffect, useMemo, useState } from "react";
import { Masonry } from "@mui/lab";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400" });

interface MemeImage {
  meme: StaticImageData;
  // Base64 encoded placeholder.
  placeholder?: string;
  tags: string[];
}

function Meme({ meme, placeholder, tags }: MemeImage) {
  const tagString = useMemo(() => tags.map((t) => "#" + t).join(" "), [tags]);
  return (
    <div
      className={
        styles.gifContainer + " flex relative overflow-clip rounded-lg"
      }
    >
      <Image
        className={styles.gif + " w-full"}
        src={meme}
        placeholder={placeholder ? "blur" : "empty"}
        blurDataURL={placeholder ? placeholder : undefined}
        alt="a meme"
      />
      <div
        className={
          styles.overlay +
          " hidden absolute left-0 top-0 w-full h-full hover:block pointer-events-none"
        }
        style={{
          backgroundImage:
            "linear-gradient(-180deg,transparent 50%,rgba(0,0,0,.75) 99%)",
        }}
      />
      <div
        className={
          styles.tags +
          ` ${roboto.className}` +
          " hidden absolute w-full p-2 bottom-0 text-white pointer-events-none text-sm"
        }
      >
        {tagString}
      </div>
    </div>
  );
}

interface MemeDisplayProps {
  memes: MemeImage[];
}

function MemeDisplay({ memes }: MemeDisplayProps) {
  // Do not render MemeDisplay server-side.
  // Masonry is a JS-based layout. The static rendering results
  // in a flash of a single column on wide-screens.
  // It's better to leave the space empty.
  const [showMemes, setShowMemes] = useState<boolean>(false);

  useEffect(() => {
    setShowMemes(true);
    return () => {
      setShowMemes(false);
    };
  }, [setShowMemes]);

  if (!showMemes) return <></>;
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
              tags={memeWithPlaceholder.tags}
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
  const searchTags = useMemo(
    () => searchQuery.split(" ").map((s) => s.toLowerCase()),
    [searchQuery]
  );
  const displayedMemes = useMemo<MemeImage[]>(
    () =>
      (searchTags.length == 0 || searchTags[0] === ""
        ? memes
        : memes.filter((m) => fuzzyMatchArray(searchTags, m.tags))
      ).map((m) => {
        return { meme: m.img, placeholder: m.placeholder, tags: m.tags };
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
            <h1
              className={
                lobster.className + " text-center my-4 text-6xl md:text-9xl"
              }
            >
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
