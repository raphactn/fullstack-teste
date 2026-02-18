import { Layout } from "@/components/Layout";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider forcedTheme="dark">
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <Toaster />
          {router.pathname.startsWith("/dashboard") ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}
