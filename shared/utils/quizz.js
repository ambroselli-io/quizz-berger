const quizz = require("../quizz.json");

const candidates = [
  {
    _id: "61599d2ac9a71464851693ae",
    pseudo: "Jean-Luc Mélenchon",
  },
  {
    _id: "6159a874a6608465eccab379",
    pseudo: "Marine Le Pen",
  },
  {
    _id: "615a9abb8115a6abca5f14e4",
    pseudo: "Éric Zemmour",
  },
  {
    _id: "615a9b3d4df3e6ac151232e8",
    pseudo: "François Asselineau",
  },
  {
    _id: "615a9b564df3e6ac151232ee",
    pseudo: "Valérie Pécresse",
  },
  {
    _id: "615a9b864df3e6ac151232f1",
    pseudo: "Jean Lassalle",
  },
  {
    _id: "615a9b9f4df3e6ac151232f4",
    pseudo: "Fabien Roussel",
  },
  {
    _id: "615a9ba94df3e6ac151232f7",
    pseudo: "Anne Hidalgo",
  },
  {
    _id: "615a9bb94df3e6ac151232fa",
    pseudo: "Yannick Jadot",
  },
  {
    _id: "615a9bc64df3e6ac151232fd",
    pseudo: "Christiane Taubira",
  },
  {
    _id: "615a9bd24df3e6ac15123300",
    pseudo: "Emmanuel Macron",
  },
  {
    _id: "615a9cabe1025bac5ae83d7a",
    pseudo: "Nathalie Arthaud",
  },
  {
    _id: "615a9cc9e1025bac5ae83d7f",
    pseudo: "Nicolas Dupont-Aignan",
  },
  {
    _id: "615a9ceae1025bac5ae83d89",
    pseudo: "Philippe Poutou",
  },
].sort((c1, c2) => c1.pseudo.localeCompare(c2.pseudo));

const quizzWithLastQuestion = [
  ...quizz,
  {
    _id: "theme-620b92395a0afa612d005ef3",
    fr: "Candidats",
    questions: candidates.map((c) => ({
      _id: `question-${c._id}`,
      fr: `Si ${c.pseudo} était élu(e), quel serait votre sentiment ?`,
      answers: [
        "Très content(e)",
        "Plutôt content(e)",
        "Dans l'expectative",
        "Plutôt mécontent(e)",
        "Très mécontent(e)",
        "Indifférent / Je n'ai pas d'avis",
      ],
      scores: [
        [5, 3, 2, 0, 0, 0],
        [4, 5, 3, 1, 0, 0],
        [2, 3, 5, 3, 2, 0],
        [0, 1, 3, 5, 4, 0],
        [0, 0, 2, 3, 5, 0],
        [0, 0, 0, 0, 0, 0],
      ],
    })),
  },
];

module.exports = quizzWithLastQuestion;
