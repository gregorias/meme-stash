import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import styles from "../styles/Home.module.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { MemeDatabase } from "../src/meme";
import { useMemo, useState } from "react";

interface GifDisplayProps {
  gifs: StaticImageData[];
}

function GifDisplay({ gifs }: GifDisplayProps) {
  return (
    <div className={styles.gifDisplay}>
      {gifs.map((gif: StaticImageData, i: any) => (
        <Image
          className={styles.gif}
          src={gif}
          key={i}
          alt="a gif"
          height={150}
        />
      ))}
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
        <main className={styles.main}>
          <h1>Meme Stash</h1>
          <TextField
            id="search-box"
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth={true}
          />
          <GifDisplay gifs={gifs} />
        </main>
      </ThemeProvider>
    </>
  );
}
