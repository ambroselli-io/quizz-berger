require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const quizz = [
  {
    _id: "theme1",
    fr: "Dépenses publiques et dette",
    questions: [
      {
        questionId: "1",
        fr: "Theme 1 question 1",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "2",
        fr: "Theme 1 question 2",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "3",
        fr: "Theme 1 question 3",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
    ],
  },
  {
    _id: "theme2",
    fr: "Entreprises, emploi et économie",
    questions: [
      {
        questionId: "1",
        fr: "Êtes-vous pour l'augmentation du SMIC ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      },
      {
        questionId: "2",
        fr: "Êtes-vous pour la mise en place d'activité d'intérêt général hebdomadaires pour les détenteurs du RSA ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      },
      {
        questionId: "3",
        fr: "Pensez-vous qu'il faut endurcir les critères d'accès à l'assurance chômage ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      },
    ],
  },
  {
    _id: "theme3",
    fr: "Environnement et Energie",
    questions: [
      {
        questionId: "1",
        fr: "Pensez-vous qu'un virage à 180 degres est nécessaire pour lutter contre le réchauffement climatique ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      },
      {
        questionId: "2",
        fr: "Êtes-vous pour une imposition des circuits courts et de stopper les fermes usines ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      },
      {
        questionId: "3",
        fr: "Etes-vous contre le nucléaire ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      },
    ],
  },
  {
    _id: "theme4",
    fr: "Fonction publique et effectifs publics",
    questions: [
      {
        questionId: "1",
        fr: "Theme 4 question 1",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "2",
        fr: "Theme 4 question 2",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "3",
        fr: "Theme 4 question 3",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
    ],
  },
  {
    _id: "theme5",
    fr: "Gouvernance et république",
    questions: [
      {
        questionId: "1",
        fr: "Que pensez vous du régime de la Cinquième République et de sa Constitution ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      },
      {
        questionId: "2",
        fr: "Que pensez-vous du recours au référendum par le Président de la République ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      },
      {
        questionId: "3",
        fr: "Que pensez-vous de la représentativité de nos députés et sénateurs ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      },
    ],
  },
  {
    _id: "theme6",
    fr: "Défense et justice",
    questions: [
      {
        questionId: "1",
        fr: "Theme 6 question 1",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "2",
        fr: "Theme 6 question 2",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "3",
        fr: "Theme 6 question 3",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
    ],
  },
  {
    _id: "theme7",
    fr: "Politique fiscale",
    questions: [
      {
        questionId: "1",
        fr: "Que pensez-vous de la répartition actuelle des tranches d'imposition ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "2",
        fr: "Que pensez-vous de l'évasion fiscale des multinationales ?",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "3",
        fr: "Theme 7 question 3",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
    ],
  },
  {
    _id: "theme8",
    fr: "Politique publique",
    questions: [
      {
        questionId: "1",
        fr: "Theme 8 question 1",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "2",
        fr: "Theme 8 question 2",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "3",
        fr: "Theme 8 question 3",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
    ],
  },
  {
    _id: "theme9",
    fr: "Social et solidarité",
    questions: [
      {
        questionId: "1",
        fr: "Theme 9 question 1",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "2",
        fr: "Theme 9 question 2",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "3",
        fr: "Theme 9 question 3",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
    ],
  },
  {
    _id: "theme10",
    fr: "Territoires et colléctivités",
    questions: [
      {
        questionId: "1",
        fr: "Theme 10 question 1",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "2",
        fr: "Theme 10 question 2",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
      {
        questionId: "3",
        fr: "Theme 10 question 3",
        answers: ["Totalement", "Moyennement", "Pas du tout", "Ça ne m'interesse pas"],
      },
    ],
  },
];

const plaf = async () => {
  const test = quizz.map((theme) => {
    // const questions = theme.questions;
    const mapQuestions = theme.questions.map((q) => {
      return {
        _id: new mongoose.Types.ObjectId(),
        fr: q.fr,
        answers: q.answers,
        scores: [
          [5, 3, 1, 0],
          [3, 5, 3, 0],
          [1, 3, 5, 0],
          [0, 0, 0, 0],
        ],
      };
    });
    // console.log(mapQuestions);
    return {
      _id: `theme-${new mongoose.Types.ObjectId()}`,
      fr: theme.fr,
      questions: mapQuestions,
    };
  });
  console.log(JSON.stringify(test));
  //   var id = new mongoose.Types.ObjectId();
  //   console.log(JSON.stringify(quizz, null, 2));
  //   console.log(id);
  //   console.log(`theme-${Date.now()}`);
  //   console.log(id.getTimestamp());
};

// plaf();
