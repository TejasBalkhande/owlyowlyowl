// data/highYieldTopics.ts

export interface HighYieldRow {
  category: string;
  weight: string;
  difficulty: string;
  skills: string;
  why: string;
}

export const highYieldTopics = {
  english: [
    {
      category: "Production of Writing",
      weight: "38–43%",
      difficulty: "Medium",
      skills: "Organization/transitions, logical flow, relevance, main idea/purpose",
      why: "Passage‑level strategy; mastering improves overall section accuracy",
    },
    {
      category: "Conventions of Standard English",
      weight: "38–43%",
      difficulty: "Medium",
      skills: "Punctuation (commas, semicolons, dashes, colons, apostrophes), subject‑verb agreement, pronoun errors, modifier placement, verb tense",
      why: "Most frequent questions; rule‑based with many common traps",
    },
    {
      category: "Knowledge of Language",
      weight: "18–23%",
      difficulty: "Medium",
      skills: "Conciseness/redundancy, word choice, style/tone consistency",
      why: "Quick elimination of wordy or inconsistent options",
    },
  ],
  mathematics: [
    {
      category: "Algebra",
      weight: "17–20%",
      difficulty: "Medium",
      skills: "Linear equations/inequalities, systems of equations, quadratics (factoring, graphing)",
      why: "Core foundation; appears in many problem types",
    },
    {
      category: "Functions",
      weight: "17–20%",
      difficulty: "Medium‑Hard",
      skills: "Function notation/evaluation, graphing transformations, modeling",
      why: "Modeling separates high scorers",
    },
    {
      category: "Geometry",
      weight: "17–20%",
      difficulty: "Medium",
      skills: "Triangles (properties, similarity), circles, coordinate geometry, basic trig (SOH‑CAH‑TOA)",
      why: "Visual problems; trig gives fast points if learned",
    },
    {
      category: "Statistics & Probability",
      weight: "12–15%",
      difficulty: "Easy‑Medium",
      skills: "Mean/median/mode, probability, data interpretation",
      why: "Calculation‑based; low error rate with practice",
    },
    {
      category: "Number & Quantity",
      weight: "10–12%",
      difficulty: "Easy‑Medium",
      skills: "Percentages/ratios/proportions, exponents, complex numbers",
      why: "Essential basics; often straightforward",
    },
    {
      category: "Integrating Essential Skills",
      weight: "~20%",
      difficulty: "Medium",
      skills: "Rates/proportions in context, area/volume applications, multi‑step word problems",
      why: "Applied problems; rewards strong fundamentals",
    },
  ],
  reading: [
    {
      category: "Key Ideas and Details",
      weight: "44–52%",
      difficulty: "Medium",
      skills: "Main idea/purpose, locating details, basic inferences, sequence/relationships",
      why: "Highest volume; evidence‑based questions",
    },
    {
      category: "Craft and Structure",
      weight: "26–33%",
      difficulty: "Medium‑Hard",
      skills: "Vocabulary in context, author's tone/voice, word choice impact",
      why: "Requires nuance; common distractors",
    },
    {
      category: "Integration of Knowledge and Ideas",
      weight: "19–26%",
      difficulty: "Hard",
      skills: "Evidence support, comparing passages (dual), analyzing arguments",
      why: "Differentiates 30+ scores; increased emphasis",
    },
  ],
  science: [
    {
      category: "Interpretation of Data",
      weight: "36–47%",
      difficulty: "Medium",
      skills: "Graphs/tables/figures, trends/patterns, extrapolation/interpolation",
      why: "Most questions; practice dramatically improves speed/accuracy",
    },
    {
      category: "Scientific Investigation",
      weight: "17–31%",
      difficulty: "Medium‑Hard",
      skills: "Experiment design, variables, procedures, predictions",
      why: "Common in research summaries; understanding setups is key",
    },
    {
      category: "Evaluation of Models/Inferences/Results",
      weight: "22–36%",
      difficulty: "Hard",
      skills: "Conflicting viewpoints, hypothesis evaluation, experimental results",
      why: "Pure reasoning; at least one passage per test",
    },
  ],
};