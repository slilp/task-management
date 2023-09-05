import { useState } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from "@tanstack/react-query";
import "../styles/globals.css";

type ExtendedAppProps = AppProps & {
  dehydratedState: DehydratedState;
  session: Session;
};

function App({
  Component,
  pageProps,
  session,
  dehydratedState,
  ...appProps
}: ExtendedAppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 0,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState || null}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
