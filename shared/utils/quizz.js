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

module.exports = quizz;
