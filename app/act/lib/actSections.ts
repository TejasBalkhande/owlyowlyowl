// lib/actSections.ts
export interface PracticeLevel {
  level: number;
  title: string;
  description: string;
  color: string;
}

export interface SectionOption {
  name: string;
  practiceLevels: PracticeLevel[];
}

export interface Section {
  name: string;
  options: SectionOption[];
}

export const sections: Section[] = [
  {
    name: "English",
    options: [
      {
        name: "Production of Writing",
        practiceLevels: [
          {
            level: 1,
            title: "Topic Development",
            description: "Develop clear and focused ideas in writing.",
            color: "green",
          },
          {
            level: 2,
            title: "Organization and Transitions",
            description: "Practice organization and effective expression.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Full Production of Writing",
            description: "Complete and refine writing projects.",
            color: "red",
          },
        ],
      },
      {
        name: "Conventions of Standard English",
        practiceLevels: [
          {
            level: 1,
            title: "Sentence Structure",
            description: "Basic sentence construction and punctuation.",
            color: "green",
          },
          {
            level: 2,
            title: "Grammar and Usage",
            description: "Verb tense, agreement, and pronoun clarity.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Punctuation Conventions",
            description: "Advanced punctuation and sentence mechanics.",
            color: "red",
          },
        ],
      },
      {
        name: "Knowledge of Language",
        practiceLevels: [
          {
            level: 1,
            title: "Word Choice",
            description: "Precision and conciseness in writing.",
            color: "green",
          },
          {
            level: 2,
            title: "Style and Tone",
            description: "Match language to audience and purpose.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Concision and Clarity",
            description: "Eliminate redundancy and improve clarity.",
            color: "red",
          },
        ],
      },
    ],
  },
  {
    name: "Mathematics",
    options: [
      {
        name: "Algebra",
        practiceLevels: [
          {
            level: 1,
            title: "Linear Equations",
            description: "Solve one‑variable equations and inequalities.",
            color: "green",
          },
          {
            level: 2,
            title: "Quadratic Equations",
            description: "Factor, complete the square, and use the quadratic formula.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Polynomials",
            description: "Add, subtract, and multiply polynomials.",
            color: "red",
          },
        ],
      },
      {
        name: "Functions",
        practiceLevels: [
          {
            level: 1,
            title: "Function Notation",
            description: "Evaluate and interpret functions.",
            color: "green",
          },
          {
            level: 2,
            title: "Linear and Exponential",
            description: "Graph and compare function types.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Transformations",
            description: "Translate, reflect, and scale functions.",
            color: "red",
          },
        ],
      },
      {
        name: "Geometry",
        practiceLevels: [
          {
            level: 1,
            title: "Shapes and Angles",
            description: "Basic properties and measurements.",
            color: "green",
          },
          {
            level: 2,
            title: "Circles",
            description: "Arcs, sectors, and properties of circles.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Coordinate Geometry",
            description: "Distance, midpoint, and proofs on the plane.",
            color: "red",
          },
        ],
      },
      {
        name: "Number and Quantity",
        practiceLevels: [
          {
            level: 1,
            title: "Real Numbers",
            description: "Operations, factors, and multiples.",
            color: "green",
          },
          {
            level: 2,
            title: "Ratios and Proportions",
            description: "Rates, percentages, and scale factors.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Complex Numbers",
            description: "Imaginary numbers and operations.",
            color: "red",
          },
        ],
      },
      {
        name: "Statistics and Probability",
        practiceLevels: [
          
          {
            level: 1,
            title: "Statistical Measures",
            description: "Mean, median, mode, and range.",
            color: "yellow",
          },
          {
            level: 2,
            title: "Probability Models",
            description: "Compound events and expected value.",
            color: "red",
          },
          {
            level: 3,
            title: "Sequences and Series",
            description: "Arithmetic and geometric sequences.",
            color: "green",
          },
        ],
      },
      {
        name: "Integrating Essential Skills",
        practiceLevels: [
          {
            level: 1,
            title: "Multi step Problems",
            description: "Combine basic operations in context.",
            color: "green",
          },
          {
            level: 2,
            title: "Word problems",
            description: "Translate real‑world situations into math.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Rates and percentages",
            description: "Solve problems requiring multiple skills.",
            color: "red",
          },
        ],
      },
    ],
  },
  {
    name: "Reading",
    options: [
      {
        name: "Key Ideas & Details",
        practiceLevels: [
          {
            level: 1,
            title: "Reading Set 1",
            description: "Identify central themes and claims.",
            color: "green",
          },
          {
            level: 2,
            title: "Supporting Details",
            description: "Locate evidence and explicit information.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Summarizing",
            description: "Condense and paraphrase passages.",
            color: "red",
          },
          {
            level: 4,
            title: "Advanced Summarizing",
            description: "Synthesize key ideas from multiple passages.",
            color: "red",
          },
        ],
      },
      {
        name: "Craft and Structure",
        practiceLevels: [
          {
            level: 1,
            title: "Word Meanings",
            description: "Determine meaning from context.",
            color: "green",
          },
          {
            level: 2,
            title: "Text Structure",
            description: "Analyze organization and purpose.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Point of View",
            description: "Understand narrator and author perspective.",
            color: "red",
          },
        ],
      },
      {
        name: "Integration",
        practiceLevels: [
          {
            level: 1,
            title: "Comparing Texts",
            description: "Find similarities and differences.",
            color: "green",
          },
          {
            level: 2,
            title: "Arguments",
            description: "Evaluate claims and evidence.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Multiple Sources",
            description: "Synthesize information from two passages.",
            color: "red",
          },
        ],
      },
    ],
  },
  {
    name: "Science",
    options: [
      {
        name: "Interpretation of Data",
        practiceLevels: [
          {
            level: 1,
            title: "Tables & Graphs",
            description: "Read values and identify trends.",
            color: "green",
          },
          {
            level: 2,
            title: "Interpolate/Extrapolate",
            description: "Make predictions from data.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Conflicting Views",
            description: "Compare data from multiple studies.",
            color: "red",
          },
        ],
      },
      {
        name: "Scientific Investigation",
        practiceLevels: [
          {
            level: 1,
            title: "Experimental Design",
            description: "Identify variables and controls.",
            color: "green",
          },
          {
            level: 2,
            title: "Procedures",
            description: "Understand experimental steps.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Conclusions",
            description: "Draw valid inferences from results.",
            color: "red",
          },
        ],
      },
      {
        name: "Evaluation of Arguments",
        practiceLevels: [
          {
            level: 1,
            title: "Hypotheses",
            description: "Identify proposed explanations.",
            color: "green",
          },
          {
            level: 2,
            title: "Strengthening/Weakening",
            description: "Assess evidence impact.",
            color: "yellow",
          },
          {
            level: 3,
            title: "Resolving Discrepancies",
            description: "Reconcile conflicting viewpoints.",
            color: "red",
          },
        ],
      },
    ],
  },
];