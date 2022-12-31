// A happy birthday page for a friend's birthday on Jan 2.
import Head from "next/head";
import { Lobster } from "@next/font/google";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });

function useWindowSize(): { width: number; height: number } | undefined {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<
    { width: number; height: number } | undefined
  >(undefined);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default function HappyBirthdayMaciej() {
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

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    setShowConfetti(true);
    return () => {
      setShowConfetti(false);
    };
  }, [setShowConfetti]);

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
        <main className="flex justify-center px-6 md:px-24 h-screen">
          {showConfetti && windowSize && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={400}
              tweenDuration={10}
            />
          )}

          <div className="flex flex-col justify-center">
            <h1
              className={
                lobster.className + " text-center text-5xl md:text-8xl"
              }
              style={{ marginBottom: "2rem" }}
            >
              Wszystkiego Najlepszego, Maciej!
            </h1>
            <Button variant="contained" size="large" href="/">
              Ack
            </Button>
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}
