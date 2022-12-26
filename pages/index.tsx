import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import styles from "../styles/Home.module.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { MemeDatabase } from "../src/meme";
import { useMemo, useState } from "react";
import { Masonry } from "@mui/lab";

interface GifDisplayProps {
  gifs: StaticImageData[];
}

function GifDisplay({ gifs }: GifDisplayProps) {
  return (
    /* Add a container that adds vertical margin.
      Can't do this in Masonry, because it has its own spacing. */
    <div className="my-4 w-full flex justify-center">
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        {gifs.map((gif: StaticImageData) => (
          <Image className={styles.gif} src={gif} key={gif.src} alt="a gif" />
        ))}
      </Masonry>
    </div>
  );
}

export default function Home() {
  const memeDb = useMemo(() => new MemeDatabase(), []);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchTags = useMemo(() => searchQuery.split(" "), [searchQuery]);

  const gifs = useMemo(() => {
    return (
      searchTags.length == 0 || searchTags[0] === ""
        ? memeDb.memes
        : memeDb.getMemesByTags(searchTags)
    ).map((m) => m.gif);
  }, [searchTags, memeDb]);

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
            <GifDisplay gifs={gifs} />
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}
