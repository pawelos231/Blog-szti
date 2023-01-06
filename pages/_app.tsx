import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { store, saga } from "../redux/store/store";
import { Provider } from "react-redux";
import watcherNumberSaga from "../redux/sagas/numberSaga/numberSaga";
import WatcherComments from "../redux/sagas/PostSaga/commentSaga";

saga.run(watcherNumberSaga);
saga.run(WatcherComments);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;
