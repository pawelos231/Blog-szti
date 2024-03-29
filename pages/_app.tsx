import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@components/Layout";
import { store, saga } from "@redux/store/store";
import { Provider } from "react-redux";
import rootSaga from "@redux/sagas/rootSaga";
import { ThemeProvider } from "next-themes";

saga.run(rootSaga);

function MyApp({ Component, pageProps }: AppProps) {
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
