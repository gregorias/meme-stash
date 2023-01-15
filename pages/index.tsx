import Head from "next/head";
import { Lobster, Roboto } from "@next/font/google";
import Image, { StaticImageData } from "next/image";
import styles from "../styles/Home.module.css";
import {
  createTheme,
  StyledEngineProvider,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { fuzzyMatchArray } from "../src/meme";
import * as MemeModel from "../src/meme";
import { useEffect, useMemo, useState } from "react";
import { Masonry } from "@mui/lab";
import { getPlaiceholder } from "plaiceholder";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

interface MemeImage {
  meme: StaticImageData;
  description?: string;
  tags: string[];
}

function Meme({ meme, description, tags }: MemeImage) {
  const tagString = useMemo(() => tags.map((t) => "#" + t).join(" "), [tags]);
  return (
    <div
      className={
        styles.gifContainer + " flex relative overflow-clip rounded-lg"
      }
    >
      <Image
        className={styles.gif + " w-full h-full"}
        src={meme}
        placeholder="blur"
        blurDataURL={meme.blurDataURL}
        alt={description ?? "a meme"}
      />
      <div
        className={
          styles.overlay +
          " absolute left-0 top-0 w-full h-full hover:block pointer-events-none"
        }
      />
      <div
        className={
          styles.tags +
          ` ${roboto.className}` +
          " absolute w-full p-2 bottom-0 text-white pointer-events-none text-sm"
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
        columns={{ xs: 2, sm: 3, lg: 4 }}
        spacing={{ xs: 2, sm: 3, lg: 4 }}
      >
        {memes.map((meme) => {
          return (
            <Meme
              meme={meme.meme}
              description={meme.description}
              tags={meme.tags}
              key={meme.meme.src}
            />
          );
        })}
      </Masonry>
    </div>
  );
}

interface LoadedMeme {
  img: StaticImageData;
  description?: string;
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
        return {
          meme: m.img,
          description: m.description,
          tags: m.tags,
        };
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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Meme Stash</title>
            <meta
              name="description"
              content="An app for stashing quality reaction memes."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex justify-center px-4 md:px-24">
            <div className="flex flex-col flex-grow items-center max-w-screen-lg">
              <h1
                className={
                  lobster.className + " text-center my-4 text-6xl lg:text-9xl"
                }
              >
                Meme Stash
              </h1>
              <TextField
                id="search-box"
                label={'Search (e.g., "bed cat", "fuck")'}
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
      </StyledEngineProvider>
    </>
  );
}

export async function getStaticProps() {
  const srcMemes = await MemeModel.fetchMemes((src) => {
    return getPlaiceholder(src).then((r) => r.base64);
  });
  const loadedMemes: LoadedMeme[] = [];
  for (let rawMeme of srcMemes) {
    let loadedMeme: LoadedMeme = { img: rawMeme.img, tags: rawMeme.tags };
    if (rawMeme.description) loadedMeme.description = rawMeme.description;
    loadedMemes.push(loadedMeme);
  }
  return {
    props: { memes: loadedMemes },
  };
}
