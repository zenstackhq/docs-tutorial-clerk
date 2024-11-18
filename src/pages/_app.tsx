import { type AppType } from "next/app";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <ClerkProvider {...pageProps}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default MyApp;
