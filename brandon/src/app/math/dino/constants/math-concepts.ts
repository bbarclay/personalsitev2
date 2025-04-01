interface MathProblem {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface EraContent {
  title: string;
  description: string;
  facts: string[];
  mathConcepts: string[];
  problems: MathProblem[];
}

export const ERA_MATH_CONTENT: Record<string, EraContent> = {
  triassic: {
    title: "Triassic Math Trail",
    description: "Discover proportions and measurements with early dinosaurs",
    facts: [
      "The Triassic period lasted about 50.9 million years",
      "Early dinosaurs were relatively small compared to later species",
      "Understanding proportions helps us study dinosaur evolution"
    ],
    mathConcepts: [
      "Proportional Reasoning",
      "Basic Measurements",
      "Number Lines (Timeline)",
      "Scale and Size Comparisons"
    ],
    problems: [
      {
        question: "If a Coelophysis was 3 meters long and its tail was 1/2 its length, how long was its tail?",
        options: ["1 meter", "1.5 meters", "2 meters", "2.5 meters"],
        answer: 1,
        explanation: "Half of 3 meters is 1.5 meters. Using proportions helps us understand dinosaur anatomy."
      },
      {
        question: "A Plateosaurus doubled in size every 5 years until age 15. If it started at 1 meter, how tall was it at 15 years?",
        options: ["4 meters", "8 meters", "16 meters", "32 meters"],
        answer: 2,
        explanation: "Starting at 1m: 5 years = 2m, 10 years = 4m, 15 years = 8m. This shows exponential growth!"
      }
    ]
  },
  jurassic: {
    title: "Jurassic Geometry",
    description: "Explore shapes and sizes with the largest dinosaurs",
    facts: [
      "Sauropods were the largest land animals ever",
      "Some dinosaurs had complex geometric patterns on their skin",
      "Geometry helps us understand how dinosaurs moved and balanced"
    ],
    mathConcepts: [
      "Area and Volume",
      "Geometric Shapes",
      "Weight Distribution",
      "Spatial Reasoning"
    ],
    problems: [
      {
        question: "A Diplodocus's neck was a cylinder 8m long and 2m in diameter. What was its approximate volume?",
        options: ["25.13m³", "50.27m³", "75.40m³", "100.53m³"],
        answer: 0,
        explanation: "Volume of a cylinder = πr²h. With r=1m and h=8m: V = π(1)²(8) ≈ 25.13m³"
      },
      {
        question: "If a Stegosaurus plate was triangular with base 2m and height 3m, what was its area?",
        options: ["2m²", "3m²", "4m²", "6m²"],
        answer: 1,
        explanation: "Area of a triangle = (base × height) ÷ 2. Here: (2 × 3) ÷ 2 = 3m²"
      }
    ]
  },
  cretaceous: {
    title: "Cretaceous Calculations",
    description: "Master probability and statistics with predator-prey relationships",
    facts: [
      "T-Rex had a bite force of about 35,000 newtons",
      "Pack hunting required complex spatial coordination",
      "Survival rates can be calculated using probability"
    ],
    mathConcepts: [
      "Probability",
      "Statistics",
      "Force Calculations",
      "Population Growth"
    ],
    problems: [
      {
        question: "If a T-Rex had a 60% chance of catching prey, what was the probability of successful hunts in 2 attempts?",
        options: ["36%", "60%", "84%", "120%"],
        answer: 0,
        explanation: "Probability of both succeeding = 0.6 × 0.6 = 0.36 or 36%"
      },
      {
        question: "A Velociraptor pack had 5 members. How many different hunting formations were possible?",
        options: ["24", "60", "120", "720"],
        answer: 2,
        explanation: "This is a permutation problem: 5! = 5 × 4 × 3 × 2 × 1 = 120 possibilities"
      }
    ]
  }
};
