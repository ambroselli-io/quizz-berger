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
          content="Présidentielles 2022 - Répondez aux questions que vous voulez pour connaître le candidat qui pense comme vous"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Le Quizz du Berger - Trouvez votre candidat pour les Présidentielles 2022"
        />
        <meta property="og:url" key="og:url" content="https://www.quizz-du-berger.com/" />
        <meta rel="canonical" key="canonical" content="https://www.quizz-du-berger.com/" />
        <meta
          property="og:description"
          content="Présidentielles 2022 - Répondez aux questions que vous voulez pour connaître le candidat qui pense comme vous"
          l
        />

        <meta property="og:image" key="og:image" content="https://www.quizz-du-berger.com/og_1200_630.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          key="og:image:alt"
          content="Copie de la page d'accueil du Quizz du Berger: Vos candidats pour les Présidentielles 2022"
        />

        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@arnaudambro" />
        <meta name="twitter:site" content="@arnaudambro" />
        <meta
          key="twitter:title"
          name="twitter:title"
          content="Le Quizz du Berger - Vos candidats pour les Présidentielles 2022"
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Présidentielles 2022 - Répondez aux questions que vous voulez pour connaître le candidat qui pense comme vous"
        />
        <meta name="twitter:image" key="twitter:image" content="https://www.quizz-du-berger.com/og_1200_630.png" />
        <meta
          key="twitter:image:alt"
          name="twitter:image:alt"
          content="Copie de la page d'accueil du Quizz du Berger: Vos candidats pour les Présidentielles 2022"
        />

        <title>Le Quizz du Berger - Vos candidats pour les Présidentielles 2022</title>
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
