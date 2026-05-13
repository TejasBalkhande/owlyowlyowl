// app/sat/lib/highYieldTopics.ts
export interface HighYieldRow {
  category: string;
  weight: string;
  difficulty: string;
  skills: string;
  why: string;
}

export const highYieldTopics = {
  readingWriting: [
    {
      category: "Craft and Structure",
      weight: "28%",
      difficulty: "Medium‑Hard",
      skills: "Vocabulary in context, text structure, purpose, author's point of view",
      why: "Tests nuanced understanding; common trap answers reward careful reading",
    },
    {
      category: "Information and Ideas",
      weight: "26%",
      difficulty: "Medium",
      skills: "Central ideas, details, inferences, evidence‑based support, data interpretation",
      why: "High volume; mastering main idea and evidence sharpens accuracy",
    },
    {
      category: "Standard English Conventions",
      weight: "26%",
      difficulty: "Medium",
      skills: "Sentence boundaries, form/structure, punctuation, subject‑verb agreement",
      why: "Rule‑based; consistent practice yields quick gains",
    },
  ],
  mathematics: [
    {
      category: "Algebra",
      weight: "35%",
      difficulty: "Medium",
      skills: "Linear equations/inequalities, systems, absolute value, word problems",
      why: "Foundation of the math section; appears in many question types",
    },
    {
      category: "Advanced Math",
      weight: "35%",
      difficulty: "Medium‑Hard",
      skills: "Quadratic and exponential functions, nonlinear equations, function transformations",
      why: "Differentiates top scores; strong algebra skills are essential",
    },
    {
      category: "Problem Solving & Data Analysis",
      weight: "15%",
      difficulty: "Medium",
      skills: "Ratios, percentages, data tables, graphs, statistics, probability",
      why: "Real‑world contexts; often straightforward with careful reading",
    },
    {
      category: "Geometry & Trigonometry",
      weight: "15%",
      difficulty: "Medium",
      skills: "Area/volume, lines/angles, triangles, circles, basic trig (SOH‑CAH‑TOA)",
      why: "Predictable formulas; memorisation rewards quick points",
    },
  ],
};