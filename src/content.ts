type Article = string[];
type Section = { [key: string]: Article };

// the first item in each array should be the section title.
export const content: Section[] = [
  { Overview: ["Overview"] },
  { "System Design": ["System Design"] },
  {
    Bootstrapping: ["Bootstrapping"],
  },
  { Running: ["Running"] },
  {
    "Adding a new feature": [
      "Adding a new feature",
      "1. Control Panel",
      "2. Flask API",
      "3. Database Changes",
      "4. WebSocket Changes",
    ],
  },
  { "Fine-Tuning GPT-3.5": ["Fine-Tuning GPT-3.5"] },
  {
    Singing: [
      "Singing",
      "1. Extract a song's vocals",
      "2. Create AI vocals cover",
      "3. Create finished song file",
      "4. Play the song live!",
    ],
  },
];
