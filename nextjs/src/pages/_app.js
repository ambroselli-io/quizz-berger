import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import Head from "next/head";
import GlobalStyle from "../styles/globalStyle";
import swrConfigOptions from "../services/swrConfigOptions";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#101827" />
        <meta
          name="description"
          content="QUI est mon candidat idéal ? Répondez de façon anonyme aux questions pour connaître les candidats qui se rapprochent le plus de vos idées, et faites votre choix !"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Le Quizz du Berger - QUI sont vos candidats pour les Présidentielles 2022"
        />
        <meta property="og:url" key="og:url" content="https://www.quizz-du-berger.com/" />
        <meta rel="canonical" key="canonical" content="https://www.quizz-du-berger.com/" />
        <meta
          property="og:description"
          content="QUI est mon candidat idéal ? Répondez de façon anonyme aux questions pour connaître les candidats qui se rapprochent le plus de vos idées, et faites votre choix !"
        />

        <meta property="og:image" key="og:image" content="https://www.quizz-du-berger.com/og_1200_630.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          key="og:image:alt"
          content="Copie de la page d'accueil du Quizz du Berger: QUI est mon candidat idéal ?"
        />

        <meta property="og:type" content="article" />
        <title>Le Quizz du Berger - QUI sont vos candidats pour les Présidentielles 2022</title>
      </Head>
      <SWRConfig value={swrConfigOptions}>
        <GlobalStyle path={router.asPath} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </>
  );
}

export default MyApp;
