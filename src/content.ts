type Article = string[];
type Section = { [key: string]: Article };

// the first item in each array should be the section title.
export const content: Section[] = [
  { Overview: ["Overview"] },
  { "System Design": ["System Design"] },
  {
    Bootstrapping: [
      "Bootstrapping",
      "WebSocket Server",
      "Control Panel",
      "Python Backend",
      "Discord Bot",
    ],
  },
  { "Running the App": ["Running the App"] },
  { "Adding a new feature": ["Adding a new feature"] },
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
