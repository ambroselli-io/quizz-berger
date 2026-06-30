export default function Confidentialite() {
  return (
    <>
      <div className="flex flex-col items-center justify-center overflow-y-scroll bg-white px-2.5 py-10">
        <main className="max-w-[65ch] [&_a]:underline [&_h1]:mt-16 [&_h1]:mb-16 [&_h1]:text-center [&_h2]:mt-12 [&_h2]:mb-8 [&_h2]:text-center [&_li]:mb-2 [&_p]:mb-8 [&_p]:text-justify [&_p]:font-sans [&_p]:leading-relaxed [&_ul]:mb-8 [&_ul]:list-disc [&_ul]:pl-6">
          <h1 className="font-[Merriweather] text-3xl font-bold text-quizz-dark">Politique de confidentialité</h1>

          <p>
            Le Quizz du Berger est un projet associatif et <b>open-source</b>. Nous attachons une grande importance à
            votre vie privée&nbsp;: nous collectons le strict minimum, nous ne vendons aucune donnée et nous n'utilisons
            aucun outil publicitaire ni aucun traceur marketing. Cette politique s'applique au site{' '}
            <b>quizz-du-berger.com</b> ainsi qu'à nos applications mobiles iOS et Android.
          </p>

          <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Vous pouvez jouer sans compte</h2>
          <p>
            Répondre au quizz, comparer vos idées avec celles des candidats et explorer les résultats ne nécessite{' '}
            <b>aucune inscription</b> et <b>aucune donnée personnelle</b>. La création d'un compte est uniquement utile
            si vous souhaitez enregistrer vos résultats et les comparer avec vos amis.
          </p>

          <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Les données que nous collectons</h2>
          <p>Si vous choisissez de créer un compte, nous enregistrons&nbsp;:</p>
          <ul>
            <li>
              un <b>pseudonyme</b> (obligatoire) — vous n'êtes pas obligé d'utiliser votre vrai nom&nbsp;;
            </li>
            <li>
              un <b>mot de passe</b>, stocké uniquement sous forme hachée (jamais en clair)&nbsp;;
            </li>
            <li>
              vos <b>réponses au quizz</b> et les <b>thèmes</b> auxquels vous avez répondu&nbsp;;
            </li>
            <li>
              les <b>amis</b> que vous reliez à votre compte pour vous comparer&nbsp;;
            </li>
            <li>
              un indicateur précisant si votre profil est <b>public ou privé</b>, et la date de votre dernière
              connexion.
            </li>
          </ul>
          <p>
            Nous ne collectons <b>aucune adresse e-mail</b> et nous ne demandons <b>aucune information de paiement</b>{' '}
            (l'application est entièrement gratuite). Des champs facultatifs (prénom, nom, parti) existent uniquement
            pour les profils de candidats publics et ne sont jamais demandés aux utilisateurs ordinaires.
          </p>

          <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Cookies et stockage local</h2>
          <p>
            Lorsque vous vous connectez, nous déposons un seul cookie d'authentification (<code>jwt</code>), sécurisé et
            inaccessible au JavaScript (<i>httpOnly</i>), qui sert uniquement à vous maintenir connecté. Votre profil est
            aussi conservé localement dans votre navigateur (<i>localStorage</i>) pour vous éviter de vous reconnecter.
            Nous n'utilisons <b>aucun cookie publicitaire ni de suivi</b>.
          </p>

          <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Sous-traitants et hébergement</h2>
          <ul>
            <li>
              <b>Base de données</b> (PostgreSQL) hébergée chez notre fournisseur pour conserver votre compte et vos
              réponses&nbsp;;
            </li>
            <li>
              <b>Sentry</b> — outil de détection d'erreurs techniques, qui peut enregistrer votre adresse IP afin de
              corriger les bugs&nbsp;;
            </li>
            <li>
              <b>Tipimail</b> — utilisé uniquement pour nous transmettre les messages que vous nous envoyez via le
              formulaire de contact.
            </li>
          </ul>
          <p>
            Nous n'utilisons <b>aucun service d'analyse d'audience</b> (pas de Google Analytics, Plausible, Matomo,
            etc.).
          </p>

          <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Durée de conservation</h2>
          <p>
            Vos données sont conservées tant que votre compte existe. Vous pouvez à tout moment demander la suppression
            de votre compte et de l'ensemble des données associées en nous écrivant à l'adresse ci-dessous.
          </p>

          <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de
            portabilité de vos données. Pour exercer ces droits, ou pour toute question relative à cette politique,
            écrivez-nous à{' '}
            <a href="mailto:contact@quizz-du-berger.com">contact@quizz-du-berger.com</a>.
          </p>

          <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Modifications</h2>
          <p>
            Cette politique peut être mise à jour pour refléter des évolutions du service. Toute modification importante
            sera signalée sur cette page. Dernière mise à jour&nbsp;: 1<sup>er</sup> juillet 2026.
          </p>
        </main>
      </div>
    </>
  );
}
