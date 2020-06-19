const scenarios = [
  {
    id: 1,
    description: "Smell of sweat",
    slug: "smell-of-sweat",
    category: 1,
    active: true
  },
  {
    id: 2,
    description: "Cigarretes",
    slug: "cigarretes",
    category: 1,
    active: true
  },
  {
    id: 3,
    description: "Onions",
    slug: "onions",
    category: 2,
    active: true
  },
  {
    id: 4,
    description: "Salty food",
    slug: "salty-food",
    category: 2,
    active: true
  },
  {
    id: 5,
    description: "Messed room",
    slug: "messed-room",
    category: 3,
    active: true
  },
  {
    id: 6,
    description: "Poorly lit enviroment",
    slug: "poorly-lit-enviroment",
    category: 3,
    active: true
  },
  {
    id: 7,
    description: "Noisy enviroment",
    slug: "noisy-enviroment",
    category: 4,
    active: true
  },
  {
    id: 8,
    description: "Loud music",
    slug: "loud-music",
    category: 4,
    active: true
  },
  {
    id: 9,
    description: "Broken nail",
    slug: "broken-nail",
    category: 5,
    active: true
  },
  {
    id: 10,
    description: "Popcorn crumb stuck in your teeth",
    slug: "popcorn-crumb-stuck-in-your-teeth",
    category: 5,
    active: true
  },
  {
    id: 11,
    description: "Lagging PC",
    slug: "lagging-pc",
    category: 6,
    active: true
  },
  {
    id: 12,
    description: "Queues",
    slug: "queues",
    category: 6,
    active: true
  }
];

const categories = [
  { id: 1, category: "Smell" },
  { id: 2, category: "Taste" },
  { id: 3, category: "Sight" },
  { id: 4, category: "Hearing" },
  { id: 5, category: "Tact" },
  { id: 6, category: "Mental" },
];

const newScenario = {
  id: null,
  description: "",
  category: null,
  active: false
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newScenario,
  scenarios,
  categories
};
