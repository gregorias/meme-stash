import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider adapter={NextAdapter}>
      <Component {...pageProps} />
    </QueryParamProvider>
  );
}
