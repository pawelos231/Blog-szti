import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@components/Layout";
import { store, saga } from "@redux/store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import WatcherComments from "@redux/sagas/PostSaga/commentSaga";
import { ThemeProvider } from "next-themes";

saga.run(WatcherComments);
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log("wywołanie");
    const init = async () => {
      await fetch("/api/init");
    };
    init();
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
