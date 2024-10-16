import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/700.css"; // Bold
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "thirdweb/react";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        <Component {...pageProps} />;
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}
