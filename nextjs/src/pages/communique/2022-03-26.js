import React from "react";
import styled from "styled-components";
import Head from "next/head";

const AllQuestions = () => {
  return (
    <>
      <Head>
        <title>Communiqué du 26 mars 2022 | Le Quizz du Berger</title>
        <meta
          property="og:title"
          key="og:title"
          content="26 mars, 45.000 tests, 2 millions de réponses, le Quizz du Berger transforme 🏉 😮"
        />
        <meta property="og:url" key="og:url" content="https://www.quizz-du-berger.com/communique/2022-03-26/" />
        <meta property="og:image" key="og:image" content="https://www.quizz-du-berger.com/2022-03-26.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta rel="canonical" key="canonical" content="https://www.quizz-du-berger.com/communique/2022-03-26/" />
        <meta
          property="og:image:alt"
          key="og:image:alt"
          content="26 mars, 45.000 tests, 2 millions de réponses, le Quizz du Berger transforme 🏉 😮"
        />
        <meta
          key="twitter:title"
          name="twitter:title"
          content="26 mars, 45.000 tests, 2 millions de réponses, le Quizz du Berger transforme 🏉 😮"
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Présidentielles 2022 - Répondez aux questions que vous voulez pour connaître le candidat qui pense comme vous"
        />
        <meta name="twitter:image" key="twitter:image" content="https://www.quizz-du-berger.com/2022-03-26.png" />
        <meta
          key="twitter:image:alt"
          name="twitter:image:alt"
          content="26 mars, 45.000 tests, 2 millions de réponses, le Quizz du Berger transforme 🏉 😮"
        />
      </Head>
      <Container>
        <Content>
          <h1>45.000 tests, 2 millions de réponses&nbsp;:&nbsp;le Quizz du Berger transforme 🏉 😮</h1>
          <p>
            <i>
              <small>
                Ceci reflète notre avis, mais on parle aussi de nous sur{" "}
                <a
                  href="https://www.commentcamarche.net/applis-sites/services-en-ligne/25367-quizz-du-berger-un-questionnaire-pour-choisir-un-candidat/"
                  trarget="_blank"
                >
                  commentcamarche.net
                </a>
              </small>
            </i>
          </p>
          <h2>Le Quizz du Berger a remplit son objectif !</h2>
          <p>
            Le Quizz du Berger va dépasser aujourd'hui les 45.000 tests réalisés, et a déjà dépassé les 2&nbsp;millions
            de réponses. Plus d'un quart des utilisateurs a fait l'exercice en entier, ont répondu aux 116 questions des
            18 thèmes.
            <a href="#note">
              <b>*</b>
            </a>
          </p>
          <p>
            <b>Le Quizz du Berger a aujourd'hui remplit son objectif !</b> <br />
            Et pas seulement grâce aux chiffres... Certes, ceux-ci confirment l'intérêt des électeurs à un tel exercice
            et c'est important. Mais d'autres objectifs sont recherchés par Arnaud Ambroselli, createur du quizz.
            <a href="#note2">
              <b>**</b>
            </a>
          </p>
          <p>
            Pour résumer,{" "}
            <b>
              l'objectif caché du Quizz du Berger est celui-ci&nbsp;:&nbsp;après avoir montré que, thème par thème,
              notre pensée politique est complexe, nous en venons à douter&nbsp;:&nbsp;ce candidat est-il le bon ?
              Devrais-je préférer tel ou telle autre ? Le doute nous fait poser des questions, peut-être revoir nos
              convictions, et finalement aboutir à l'objectif principal du Quizz, à savoir nous faire progresser dans
              notre capacité si essentielle de savoir faire un choix&nbsp;:&nbsp;alors, quel candidat(e), si l'en est
              un(e), aura ma voix, et pourquoi ?
            </b>
          </p>
          <ol>
            <li>
              <a href="#1">L'algorithme et la construction du Quizz</a>
            </li>
            <li>
              <a href="#2">Plus nuancé, plus neutre, plus étoffé qu'Elyze</a>
            </li>
            <li>
              <a href="#3">Objectifs&nbsp;:&nbsp;faire douter, s'ouvrir, progresser</a>
            </li>
          </ol>
          <hr id="1" />
          <h2>L'algorithme et la construction du Quizz</h2>
          <p>
            Le Quizz est fait d'une telle manière qu'on peut répondre aux thèmes que l'on veut et avoir immédiatement
            des résultats disponibles, thème par thème et globalement.
          </p>
          <p>
            À vrai dire, une question suffit à notre algorithme pour donner un résultat. En effet, préalablement, nous
            avons simulé les réponses des candidats aux questions - qui sont elles-mêmes une compilation de l'ensemble
            de leurs programmes. Ces réponses sont toujours échelonnées, et permettent les points de vue radicaux et
            opposés, en passant par quelques nuances. Ainsi, lorsque vous, électeur, répondez à une question, nous
            calculons ensuite la proximité de chaque candidat à la réponse que vous avez donnée&nbsp;:&nbsp;si la
            réponse est identique, c'est un maximum de points (5), si elle est opposée c'est un minimum (0 ou 1, 0 étant
            surtout réservé à "Je n'ai pas d'avis"), et si c'est un entre-deux, c'est aussi un entre-deux de points
            (2-3-4 en fonction de la nuance). Le candidat qui a le plus de points sera le plus proche de votre pensée.
          </p>
          <p></p>
          <hr id="2" />
          <h2>Plus nuancé, plus neutre, plus étoffé qu'Elyze</h2>
          <p>
            <b>Plus nuancé&nbsp;:&nbsp;</b> parce que Elyze propose seulement d'accord/pas d'accord là où on propose 5
            variations d'un bout à l'autre pour mieux refléter la complexité des opinions de chacun
          </p>
          <p>
            <b>Plus neutre&nbsp;:&nbsp;</b> parce que j'ai eu quelques retours d'Elyze de gens qui trouvaient ça trop
            orienté (ce n'est pas mon avis - le mien c'est que les résultats après 50 questions étaient à l'opposé de ce
            que je prône). Pour le Quizz du Berger, tous les retours que j'ai de tout bord politique sont plutôt
            satisfaisant à ce niveau&nbsp;:&nbsp;chacun y trouve son compte niveau orientation, il y a des questions de
            gauchiste, d'extrême droite aussi, et de centre, et pour l'instant tout les gens politisés que je connais
            ont été en accord avec les résultats. Par conséquent, aux quelques personnes qui m'ont reprochées que le
            résultat était contraire à ce qu'ils pensaient, j'ai pu leur répondre qu'ils se trompaient peut-être sur
            leur candidat !
          </p>
          <p>
            <b>Plus étoffé&nbsp;:&nbsp;</b>on aborde 18 thèmes et 114 questions
            <a href="#note">
              <b>*</b>
            </a>
            , de 3 à 5 réponses par questions, c'est plus étoffé.
          </p>
          <p>
            Je ne dis pas que c'est mieux qu'Elyze&nbsp;:&nbsp;Elyze a son public, c'est plus simple donc plus
            abordable. À vrai dire, c'est très bien pour ceux qui ont la flemme où qui n'ont aucune pensée politique,
            mais c'est limité pour les autres et ceux qui ont déjà réfléchi à tout ça.
          </p>
          <p>
            Le Quizz du Berger demande plus à ceux qui le font. Il est bien pour les mêmes catégories de personnes, mais
            il est aussi bien pour ceux qui ont déjà une conscience politique forte voire très forte&nbsp;:&nbsp;ça
            devrait leur insinuer une part de doute et une ouverture aux autres partis/candidats qu'il n'auraient jamais
            considéré sans. C'est, je pense, cet aspect qui correspond aussi à un objectif réalisé.
          </p>
          <p></p>
          <hr id="3" />
          <h2>Objectifs&nbsp;:&nbsp;faire douter, s'ouvrir, progresser</h2>
          <p>
            Un utilisateur me faisait la remarque que le Quizz était surtout basé sur les programmes, pas sur les
            personnalités des candidats qui pourtant sont importantes. Je lui ai répondu que, justement, hors des tests
            politiques, on n'apporte pas assez d'importance aux programmes et à la pensée politique de chaque électeur,
            et que c'est l'objectif principal du Quizz du Berger que d'apporter une pierre à cet édifice.
          </p>
          <p>
            <b>Faire douter&nbsp;:&nbsp;</b> parce que le Quizz apporte une synthèse thème par thème, il est possible
            d'avoir des résultats assez peu homogènes. Et c'est assez logique&nbsp;:&nbsp;pourquoi doit-on être d'accord
            avec un candidat Et sur les questions de société, d'économie, d'immigration ou d'écologie ?
          </p>
          <p>
            <b>S'ouvrir&nbsp;:&nbsp;</b>À travers ces résultats thème par thème, l'utilisateur se rendra plus compte que
            sa pensée n'est pas binaire mais bien complexe, qu'il a peut-être un peu de droite ici, pourquoi pas un peu
            de gauche là...
          </p>
          <p>
            <b>Progresser&nbsp;:&nbsp;</b>Pour faire une mauvaise parodie des Inconnus, selon moi, il y a le bon et le
            mauvais électeur.
            <br />
            Le mauvais, c'est celui qui répond "oh, moi ça vait 20 ans que je vote Bidule, je vais pas changer - même si
            ses idées ont changées, elles - même si je suis autant d'accord avec lui sur tel sujet qu'avec Bidule2 sur
            tel autre sujet". Le mauvais, c'est aussi celui qui vote sans programme, sans pensée, c'est celui qui pense
            que la stature a au moins autant, si ce n'est plus, d'importance que le programme d'un candidat. Le mauvais,
            c'est celui qui démissionne en démocratie parce que "de toutes façons, c'est trop compliqué pour moi". Non,
            la démocratie et les élections demandent à ses électeurs d'y réfléchir, sans quoi l'intérêt pour ce régime
            est limité.
            <br />À l'inverse, le bon électeur est celui qui va réfléchir aux idées, consacrer un peu de temps et
            d'énergie à construire sa propre pensée politique. C'est aussi celui qui va être capable de faire évoluer sa
            pensée&nbsp;:&nbsp;la vie nous fait changer et avoir des expériences diverses, qui ont probablement un
            impact sur notre ressenti du monde et la pensée politique qui l'accompagne. C'est par ailleurs celui qui
            pourra reconnaître que voter pour un autre est possible, puisque les pensées sont complexes, et que notre
            voisin qui vote à l'opposé de nous n'est pas nécessairement un con ou un traître, mais que sa pensée est
            complexe et que le choix qu'il a fait est possible.
          </p>
          <p>
            Plus on sait que sa propre pensée politique est complexe, plus on comprend que choisir est
            difficile&nbsp;:&nbsp;dois-je privilégier tel thème ou tel autre&nbsp;? Qu'est-ce qui est important pour
            moi&nbsp;? Or, la capacité de choisir fait aussi partie des prérogatives d'un électeur et d'un citoyen.
            Lorsqu'on est entrepreneur, on se rend bien compte que la plus grande des difficultés au début, c'est de
            choisir. Choisir, ça s'apprend, ça se travaille. Voter, c'est choisir, cela devrait donc être la même chose,
            s'apprendre, se travailler.
          </p>
          <p>
            <b>
              L'objectif caché du Quizz du Berger est celui-ci&nbsp;:&nbsp;après avoir montré que, thème par thème,
              notre pensée politique est complexe, nous en venons à douter&nbsp;:&nbsp;ce candidat est-il le bon ?
              Devrais-je préférer tel ou telle autre ? Le doute nous fait poser des questions, peut-être revoir nos
              convictions, et finalement aboutir à l'objectif principal du Quizz, à savoir nous faire progresser dans
              notre capacité si essentielle de savoir faire un choix&nbsp;:&nbsp;alors, quel candidat(e), si l'en est
              un(e), aura ma voix, et pourquoi ?
            </b>
          </p>
          <p>Pourquoi pas...</p>
          <hr id="note" />
          <p>
            <b>*</b> Nous allons apporter une modification cette semaine&nbsp;:&nbsp;nous supprimons la question "Et si
            un autre gagnait..." qui est mal comprise par les utilisateurs. Certains ont pensé que nous modifions notre
            calcul après avoir répondu à cette question, mais il n'en est rien&nbsp;:&nbsp;le seul but de cette question
            était de relativiser. Et si mon candidat perdait et qu'un autre gagnait, serais-je en rage ou pas ? Pourquoi
            ? Nous abordions cette question toujours avec la même approche&nbsp;:&nbsp;faire réfléchir. Elle n'a pas été
            comprise, nous en prenons bien note&nbsp;:&nbsp;nous la retirons !
          </p>
          <hr id="note2" />
          <p>
            <b>**</b> Arnaud Ambroselli n'a pas réalisé cet exercice seul, un designer s'est occupé de la partie
            graphique, un autre développeur a réalisé une partie du code, et des étudiants de Interface, la
            Junior-Entreprise Sciences Po Toulouse, ont réalisé le questionnaire.
          </p>
          <hr />
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 40px 10px 40px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  overflow-y: scroll;
`;

const Content = styled.main`
  max-width: 65ch;

  a {
    text-decoration: underline;
  }

  h1 {
    margin-top: 4rem;
    margin-bottom: 4rem;
    text-align: center;
  }
  h2 {
    margin-top: 3rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  hr {
    border: none;
    background: none;
    margin-bottom: 5rem;
  }
  ol {
    font-family: sans-serif;
    padding-left: 2rem;
    padding-right: 2rem;
    li {
      margin-bottom: 1rem;
    }
  }
  summary {
    margin-top: 3rem;
    margin-bottom: 2rem;
    h2 {
      margin-top: 0;
      margin-bottom: 0;
      display: inline-block;
      margin-left: 15px;
    }
  }

  p {
    font-family: sans-serif;
    line-height: 1.25;
    text-align: justify;
    margin-bottom: 2rem;
  }
`;

export default AllQuestions;
