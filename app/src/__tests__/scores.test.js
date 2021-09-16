import { getUserResultScoreLines } from "../utils/score";

describe("test score calculation", () => {
  test("test normal", () => {
    const userResults = [
      {
        _id: "613b0a57d6546e82f495b48b",
        user: "612f426534efc4204fbad515",
        theme: "Entreprises, emploi et économie",
        themeId: "theme2",
        question: "Êtes-vous pour l'augmentation du SMIC ?",
        questionIndex: 0,
        answer: "Moyennement",
        answerIndex: 1,
        createdAt: "2021-09-10T07:33:43.192Z",
        __v: 0,
      },
      {
        _id: "613b0a57d6546e82f495b48f",
        user: "612f426534efc4204fbad515",
        theme: "Entreprises, emploi et économie",
        themeId: "theme2",
        question:
          "Êtes-vous pour la mise en place d'activité d'intérêt général hebdomadaires pour les détenteurs du RSA ?",
        questionIndex: 1,
        answer: "Moyennement",
        answerIndex: 1,
        createdAt: "2021-09-10T07:33:43.662Z",
        __v: 0,
      },
      {
        _id: "613b0a58d6546e82f495b493",
        user: "612f426534efc4204fbad515",
        theme: "Entreprises, emploi et économie",
        themeId: "theme2",
        question:
          "Pensez-vous qu'il faut endurcir les critères d'accès à l'assurance chômage ?",
        questionIndex: 2,
        answer: "Moyennement",
        answerIndex: 1,
        createdAt: "2021-09-10T07:33:44.114Z",
        __v: 0,
      },
      {
        _id: "613b0a58d6546e82f495b497",
        user: "612f426534efc4204fbad515",
        theme: "Environnement et Energie",
        themeId: "theme3",
        question:
          "Pensez-vous qu'un virage à 180 degres est nécessaire pour lutter contre le réchauffement climatique ?",
        questionIndex: 0,
        answer: "Moyennement",
        answerIndex: 1,
        createdAt: "2021-09-10T07:33:44.543Z",
        __v: 0,
      },
      {
        _id: "613b0a59d6546e82f495b49b",
        user: "612f426534efc4204fbad515",
        theme: "Environnement et Energie",
        themeId: "theme3",
        question:
          "Êtes-vous pour une imposition des circuits courts et de stopper les fermes usines ?",
        questionIndex: 1,
        answer: "Moyennement",
        answerIndex: 1,
        createdAt: "2021-09-10T07:33:45.016Z",
        __v: 0,
      },
      {
        _id: "613b0a59d6546e82f495b49f",
        user: "612f426534efc4204fbad515",
        theme: "Environnement et Energie",
        themeId: "theme3",
        question: "Etes-vous contre le nucléaire ?",
        questionIndex: 2,
        answer: "Moyennement",
        answerIndex: 1,
        createdAt: "2021-09-10T07:33:45.501Z",
        __v: 0,
      },
      {
        _id: "613b0a59d6546e82f495b4a3",
        user: "612f426534efc4204fbad515",
        theme: "Gouvernance et république",
        themeId: "theme5",
        question:
          "Que pensez vous du régime de la Cinquième République et de sa Constitution ?",
        questionIndex: 0,
        answer: "Moyennement",
        answerIndex: 1,
        createdAt: "2021-09-10T07:33:45.963Z",
        __v: 0,
      },
      {
        _id: "613b0a5ad6546e82f495b4a7",
        user: "612f426534efc4204fbad515",
        theme: "Gouvernance et république",
        themeId: "theme5",
        question:
          "Que pensez-vous du recours au référendum par le Président de la République ?",
        questionIndex: 1,
        answer: "Moyennement",
        answerIndex: 1,
        createdAt: "2021-09-10T07:33:46.364Z",
        __v: 0,
      },
      {
        _id: "613b0a5ad6546e82f495b4ab",
        user: "612f426534efc4204fbad515",
        theme: "Gouvernance et république",
        themeId: "theme5",
        question:
          "Que pensez-vous de la représentativité de nos députés et sénateurs ?",
        questionIndex: 2,
        answer: "Moyennement",
        answerIndex: 1,
        createdAt: "2021-09-10T07:33:46.847Z",
        __v: 0,
      },
    ];

    const matchedPartyResults = [
      {
        _id: "613b0a46d6546e82f495b45d",
        user: "61372714aba6dd580e026caf",
        theme: "Entreprises, emploi et économie",
        themeId: "theme2",
        question: "Êtes-vous pour l'augmentation du SMIC ?",
        questionIndex: 0,
        answer: "Totalement",
        answerIndex: 0,
        createdAt: "2021-09-10T07:33:26.039Z",
        __v: 0,
      },
      {
        _id: "613b0a49d6546e82f495b464",
        user: "61372714aba6dd580e026caf",
        theme: "Entreprises, emploi et économie",
        themeId: "theme2",
        question:
          "Êtes-vous pour la mise en place d'activité d'intérêt général hebdomadaires pour les détenteurs du RSA ?",
        questionIndex: 1,
        answer: "Totalement",
        answerIndex: 0,
        createdAt: "2021-09-10T07:33:29.729Z",
        __v: 0,
      },
      {
        _id: "613b0a4ad6546e82f495b468",
        user: "61372714aba6dd580e026caf",
        theme: "Entreprises, emploi et économie",
        themeId: "theme2",
        question:
          "Pensez-vous qu'il faut endurcir les critères d'accès à l'assurance chômage ?",
        questionIndex: 2,
        answer: "Totalement",
        answerIndex: 0,
        createdAt: "2021-09-10T07:33:30.228Z",
        __v: 0,
      },
      {
        _id: "613b0a4ad6546e82f495b46c",
        user: "61372714aba6dd580e026caf",
        theme: "Environnement et Energie",
        themeId: "theme3",
        question:
          "Pensez-vous qu'un virage à 180 degres est nécessaire pour lutter contre le réchauffement climatique ?",
        questionIndex: 0,
        answer: "Totalement",
        answerIndex: 0,
        createdAt: "2021-09-10T07:33:30.666Z",
        __v: 0,
      },
      {
        _id: "613b0a4bd6546e82f495b470",
        user: "61372714aba6dd580e026caf",
        theme: "Environnement et Energie",
        themeId: "theme3",
        question:
          "Êtes-vous pour une imposition des circuits courts et de stopper les fermes usines ?",
        questionIndex: 1,
        answer: "Totalement",
        answerIndex: 0,
        createdAt: "2021-09-10T07:33:31.107Z",
        __v: 0,
      },
      {
        _id: "613b0a4bd6546e82f495b474",
        user: "61372714aba6dd580e026caf",
        theme: "Environnement et Energie",
        themeId: "theme3",
        question: "Etes-vous contre le nucléaire ?",
        questionIndex: 2,
        answer: "Totalement",
        answerIndex: 0,
        createdAt: "2021-09-10T07:33:31.528Z",
        __v: 0,
      },
      {
        _id: "613b0a4bd6546e82f495b478",
        user: "61372714aba6dd580e026caf",
        theme: "Gouvernance et république",
        themeId: "theme5",
        question:
          "Que pensez vous du régime de la Cinquième République et de sa Constitution ?",
        questionIndex: 0,
        answer: "Totalement",
        answerIndex: 0,
        createdAt: "2021-09-10T07:33:31.907Z",
        __v: 0,
      },
      {
        _id: "613b0a4cd6546e82f495b47c",
        user: "61372714aba6dd580e026caf",
        theme: "Gouvernance et république",
        themeId: "theme5",
        question:
          "Que pensez-vous du recours au référendum par le Président de la République ?",
        questionIndex: 1,
        answer: "Totalement",
        answerIndex: 0,
        createdAt: "2021-09-10T07:33:32.259Z",
        __v: 0,
      },
      {
        _id: "613b0a4cd6546e82f495b480",
        user: "61372714aba6dd580e026caf",
        theme: "Gouvernance et république",
        themeId: "theme5",
        question:
          "Que pensez-vous de la représentativité de nos députés et sénateurs ?",
        questionIndex: 2,
        answer: "Totalement",
        answerIndex: 0,
        createdAt: "2021-09-10T07:33:32.614Z",
        __v: 0,
      },
    ];

    const result = [];

    expect(getUserResultScoreLines(userResults)).toBe(result);
  });
});

// describe("test bidon", () => {
//   test("normal", () => {
//     expect(1).toBe(5);
//   });
//   test("not normal", () => {
//     expect(2).toBe(1);
//   });
// });
