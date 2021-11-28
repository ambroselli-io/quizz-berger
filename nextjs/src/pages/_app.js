import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import GlobalStyle from "../styles/globalStyle";
import swrConfigOptions from "../services/swrConfigOptions";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <SWRConfig value={swrConfigOptions}>
      <GlobalStyle path={router.asPath} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
