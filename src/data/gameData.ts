export type GameType = "scramble" | "quiz" | "memory" | "puzzle" | "wordsearch" | "truthlie";
export type Difficulty = "easy" | "medium" | "hard";

export interface GameLevel {
  id: number;
  title: string;
  description: string;
  type: GameType;
  difficulty: Difficulty;
  questions: GameQuestion[];
  timeLimit: number; // in seconds
  pointsPerQuestion: number;
}

export interface GameQuestion {
  id: string;
  question: string;
  answer: string;
  options?: string[];
  hint?: string;
  explanation?: string;
}

export const gameLevels: GameLevel[] = [
  // Easy Levels (1-5)
  {
    id: 1,
    title: "Constitutional Terms",
    description: "Unscramble basic constitutional terms",
    type: "scramble",
    difficulty: "easy",
    timeLimit: 120,
    pointsPerQuestion: 10,
    questions: [
      { id: "1-1", question: "MPREABEL", answer: "PREAMBLE", hint: "The introduction to the Constitution", explanation: "The Preamble is the introductory statement of the Constitution that sets out its purpose and principles." },
      { id: "1-2", question: "STICUJE", answer: "JUSTICE", hint: "Fairness in law and treatment", explanation: "Justice ensures fairness and equality in society." },
      { id: "1-3", question: "YLIRBET", answer: "LIBERTY", hint: "Freedom from oppression", explanation: "Liberty means freedom to think, express, and act within the bounds of law." },
      { id: "1-4", question: "YQAUITLE", answer: "EQUALITY", hint: "Same rights for all", explanation: "Equality ensures all citizens are treated the same under the law." },
      { id: "1-5", question: "REYTNFITAR", answer: "FRATERNITY", hint: "Brotherhood among citizens", explanation: "Fraternity promotes unity and brotherhood among all Indians." },
    ],
  },
  {
    id: 2,
    title: "Fundamental Rights Quiz",
    description: "Test your knowledge of Fundamental Rights",
    type: "quiz",
    difficulty: "easy",
    timeLimit: 180,
    pointsPerQuestion: 15,
    questions: [
      { 
        id: "2-1", 
        question: "Which article guarantees Right to Equality?", 
        answer: "Article 14",
        options: ["Article 14", "Article 19", "Article 21", "Article 32"],
        explanation: "Article 14 states that the State shall not deny any person equality before law."
      },
      { 
        id: "2-2", 
        question: "Right to Freedom of Speech is under which article?", 
        answer: "Article 19",
        options: ["Article 14", "Article 19", "Article 21", "Article 25"],
        explanation: "Article 19(1)(a) guarantees freedom of speech and expression."
      },
      { 
        id: "2-3", 
        question: "Which article provides Right to Life?", 
        answer: "Article 21",
        options: ["Article 14", "Article 19", "Article 21", "Article 32"],
        explanation: "Article 21 states that no person shall be deprived of life or personal liberty except by procedure established by law."
      },
      { 
        id: "2-4", 
        question: "Right to Constitutional Remedies is under?", 
        answer: "Article 32",
        options: ["Article 21", "Article 25", "Article 32", "Article 44"],
        explanation: "Article 32 gives the right to approach Supreme Court for enforcement of Fundamental Rights."
      },
      { 
        id: "2-5", 
        question: "How many Fundamental Rights are there currently?", 
        answer: "6",
        options: ["5", "6", "7", "8"],
        explanation: "There are 6 Fundamental Rights: Equality, Freedom, Against Exploitation, Religion, Cultural & Educational, Constitutional Remedies."
      },
    ],
  },
  {
    id: 3,
        title: "Memory Match: Articles",
    description: "Match articles with their descriptions",
    type: "memory",
    difficulty: "easy",
    timeLimit: 150,
    pointsPerQuestion: 10,
    questions: [
      { id: "3-1", question: "Article 14", answer: "Equality before law", explanation: "The State shall not deny any person equality before the law." },
      { id: "3-2", question: "Article 19", answer: "Freedom of speech", explanation: "All citizens have the right to freedom of speech and expression." },
      { id: "3-3", question: "Article 21", answer: "Right to life", explanation: "No person shall be deprived of life or personal liberty." },
      { id: "3-4", question: "Article 32", answer: "Constitutional remedies", explanation: "Right to move Supreme Court for enforcement of Fundamental Rights." },
      { id: "3-5", question: "Article 51A", answer: "Fundamental duties", explanation: "Lists 11 fundamental duties of every citizen of India." },
      { id: "3-6", question: "Article 44", answer: "Uniform Civil Code", explanation: "Directive to secure uniform civil code throughout India." },
    ],
  },
  {
    id: 4,
    title: "2 Truths 1 Lie",
    description: "Guess the lie from 3 statements",
    type: "truthlie",
    difficulty: "easy",
    timeLimit: 180,
    pointsPerQuestion: 15,
    questions: [
      { 
        id: "4-1", 
        question: "Which statement is FALSE?", 
        answer: "India has 30 states",
        options: ["India has 30 states","The Constitution of India came into effect on January 26, 1950",  "Dr. B.R. Ambedkar is called the Father of Indian Constitution"],
        explanation: "India currently has 28 states, not 30."
      },
      { 
        id: "4-2", 
        question: "Which statement is FALSE?", 
        answer: "Article 19 guarantees Right to Life",
        options: ["Article 14 guarantees Equality before law", "Article 32 is called the Heart and Soul of the Constitution","Article 19 guarantees Right to Life"],
        explanation: "Article 21 (not 19) guarantees Right to Life. Article 19 deals with Freedom of Speech."
      },
      { 
        id: "4-3", 
        question: "Which statement is FALSE?", 
        answer: "There are 8 Fundamental Duties",
        options: ["The Preamble declares India as a Sovereign Socialist Secular Democratic Republic", "There are 8 Fundamental Duties", "The Indian Constitution is the longest written constitution in the world"],
        explanation: "There are 11 Fundamental Duties, not 8."
      },
      { 
        id: "4-4", 
        question: "Which statement is FALSE?", 
        answer: "Parliament can change the Basic Structure of Constitution",
        options: ["The Constitution originally had 395 Articles", "Parliament can change the Basic Structure of Constitution", "The Preamble was amended by the 42nd Amendment"],
        explanation: "Parliament cannot change the Basic Structure as per Kesavananda Bharati case (1973)."
      },
      { 
        id: "4-5", 
        question: "Which statement is FALSE?", 
        answer: "Directive Principles are legally enforceable",
        options: ["Directive Principles are legally enforceable","Fundamental Rights are enforceable by courts", "The Constitution provides for both written and unwritten conventions"],
        explanation: "Directive Principles are NOT legally enforceable - they are guidelines for the state."
      },
    ],
  },
  {
    id: 5,
    title: "Rights Word Search",
    description: "Find constitutional terms in the grid",
    type: "wordsearch",
    difficulty: "easy",
    timeLimit: 180,
    pointsPerQuestion: 8,
    questions: [
      { id: "5-1", question: "Find: JUSTICE", answer: "JUSTICE" },
      { id: "5-2", question: "Find: LIBERTY", answer: "LIBERTY" },
      { id: "5-3", question: "Find: EQUALITY", answer: "EQUALITY" },
      { id: "5-4", question: "Find: RIGHTS", answer: "RIGHTS" },
      { id: "5-5", question: "Find: DUTY", answer: "DUTY" },
    ],
  },

  // Medium Levels (6-10)
  {
    id: 6,
    title: "Fundamental Duties",
    description: "Unscramble your duties as a citizen",
    type: "scramble",
    difficulty: "medium",
    timeLimit: 100,
    pointsPerQuestion: 15,
    questions: [
      { id: "6-1", question: "ERESPCT ONANLIAT GFLA", answer: "RESPECT NATIONAL FLAG", hint: "Honor our tricolor" },
      { id: "6-2", question: "ROTCTEP EENVORTNIMN", answer: "PROTECT ENVIRONMENT", hint: "Save nature" },
      { id: "6-3", question: "PMOEROT MOHARNY", answer: "PROMOTE HARMONY", hint: "Unity in diversity" },
      { id: "6-4", question: "FDEEND CNOTUYR", answer: "DEFEND COUNTRY", hint: "Protect the nation" },
      { id: "6-5", question: "BDEAI YB LAW", answer: "ABIDE BY LAW", hint: "Follow rules" },
    ],
  },
  {
    id: 7,
    title: "Constitutional Bodies Quiz",
    description: "Learn about important constitutional bodies",
    type: "quiz",
    difficulty: "medium",
    timeLimit: 150,
    pointsPerQuestion: 20,
    questions: [
      { 
        id: "7-1", 
        question: "Who is the constitutional head of India?", 
        answer: "President",
        options: ["Prime Minister", "President", "Chief Justice", "Governor"],
        explanation: "The President is the head of state and the supreme commander of armed forces."
      },
      { 
        id: "7-2", 
        question: "Which body interprets the Constitution?", 
        answer: "Supreme Court",
        options: ["Parliament", "Supreme Court", "Election Commission", "CAG"],
        explanation: "The Supreme Court is the guardian and final interpreter of the Constitution."
      },
      { 
        id: "7-3", 
        question: "Who conducts elections in India?", 
        answer: "Election Commission",
        options: ["President", "Parliament", "Election Commission", "Supreme Court"],
        explanation: "The Election Commission is an autonomous body that conducts free and fair elections."
      },
      { 
        id: "7-4", 
        question: "Which article establishes the Supreme Court?", 
        answer: "Article 124",
        options: ["Article 112", "Article 124", "Article 148", "Article 324"],
        explanation: "Article 124 deals with the establishment and constitution of the Supreme Court."
      },
      { 
        id: "7-5", 
        question: "CAG is appointed under which article?", 
        answer: "Article 148",
        options: ["Article 124", "Article 148", "Article 280", "Article 324"],
        explanation: "The Comptroller and Auditor General is appointed under Article 148."
      },
    ],
  },
  {
    id: 8,
    title: "Amendment Memory",
    description: "Match important amendments",
    type: "memory",
    difficulty: "medium",
    timeLimit: 180,
    pointsPerQuestion: 15,
    questions: [
      { id: "8-1", question: "42nd Amendment", answer: "Mini Constitution", explanation: "Made sweeping changes to the Constitution in 1976." },
      { id: "8-2", question: "44th Amendment", answer: "Restored rights", explanation: "Restored many provisions changed by 42nd Amendment." },
      { id: "8-3", question: "73rd Amendment", answer: "Panchayati Raj", explanation: "Gave constitutional status to local self-government." },
      { id: "8-4", question: "86th Amendment", answer: "Right to Education", explanation: "Made education a fundamental right for children 6-14 years." },
      { id: "8-5", question: "101st Amendment", answer: "GST", explanation: "Introduced Goods and Services Tax in India." },
      { id: "8-6", question: "1st Amendment", answer: "Reasonable restrictions", explanation: "Added reasonable restrictions to freedom of speech." },
    ],
  },
  {
    id: 9,
    title: "Parts of Constitution",
    description: "Match parts with their contents",
    type: "puzzle",
    difficulty: "medium",
    timeLimit: 150,
    pointsPerQuestion: 15,
    questions: [
      { id: "9-1", question: "Part III", answer: "Fundamental Rights" },
      { id: "9-2", question: "Part IV", answer: "Directive Principles" },
      { id: "9-3", question: "Part IVA", answer: "Fundamental Duties" },
      { id: "9-4", question: "Part V", answer: "The Union" },
      { id: "9-5", question: "Part VI", answer: "The States" },
    ],
  },
  {
    id: 10,
    title: "Schedules Search",
    description: "Find schedule-related terms",
    type: "wordsearch",
    difficulty: "medium",
    timeLimit: 150,
    pointsPerQuestion: 12,
    questions: [
      { id: "10-1", question: "Find: OATHS", answer: "OATHS" },
      { id: "10-2", question: "Find: LANGUAGES", answer: "LANGUAGES" },
      { id: "10-3", question: "Find: TERRITORIES", answer: "TERRITORIES" },
      { id: "10-4", question: "Find: SEATS", answer: "SEATS" },
      { id: "10-5", question: "Find: UNION", answer: "UNION" },
    ],
  },

  // Hard Levels (11-15)
  {
    id: 11,
    title: "Legal Terms Advanced",
    description: "Unscramble complex constitutional terms",
    type: "scramble",
    difficulty: "hard",
    timeLimit: 90,
    pointsPerQuestion: 20,
    questions: [
      { id: "11-1", question: "RJSIUDCITION", answer: "JURISDICTION", hint: "Area of legal authority" },
      { id: "11-2", question: "RROIGOTPEVA", answer: "PREROGATIVE", hint: "Special right or privilege" },
      { id: "11-3", question: "CSIULTANOITTN", answer: "CONSTITUTION", hint: "Supreme law document" },
      { id: "11-4", question: "DNMEAMNET", answer: "AMENDMENT", hint: "Change to the Constitution" },
      { id: "11-5", question: "IAPELEMRNT", answer: "PARLIAMENT", hint: "Legislative body" },
    ],
  },
  {
    id: 12,
    title: "Expert Constitutional Quiz",
    description: "Advanced questions for experts",
    type: "quiz",
    difficulty: "hard",
    timeLimit: 120,
    pointsPerQuestion: 25,
    questions: [
      { 
        id: "12-1", 
        question: "Which article deals with Emergency provisions?", 
        answer: "Article 352",
        options: ["Article 324", "Article 352", "Article 368", "Article 370"],
        explanation: "Article 352 deals with proclamation of Emergency due to war or external aggression."
      },
      { 
        id: "12-2", 
        question: "Basic Structure doctrine was established in which case?", 
        answer: "Kesavananda Bharati",
        options: ["Golaknath", "Kesavananda Bharati", "Minerva Mills", "Maneka Gandhi"],
        explanation: "In 1973, Kesavananda Bharati case established that Parliament cannot alter basic structure."
      },
      { 
        id: "12-3", 
        question: "Which article allows President's Rule in states?", 
        answer: "Article 356",
        options: ["Article 352", "Article 356", "Article 360", "Article 368"],
        explanation: "Article 356 deals with provisions in case of failure of constitutional machinery in states."
      },
      { 
        id: "12-4", 
        question: "Procedure for Constitutional amendment is in?", 
        answer: "Article 368",
        options: ["Article 352", "Article 356", "Article 360", "Article 368"],
        explanation: "Article 368 deals with the power of Parliament to amend the Constitution."
      },
      { 
        id: "12-5", 
        question: "Right to Privacy was declared fundamental right in which case?", 
        answer: "Puttaswamy",
        options: ["Vishakha", "Puttaswamy", "Navtej Singh", "Shayara Bano"],
        explanation: "In 2017, K.S. Puttaswamy case declared Right to Privacy as a fundamental right under Article 21."
      },
    ],
  },
  {
    id: 13,
    title: "Landmark Cases Memory",
    description: "Match landmark cases with their outcomes",
    type: "memory",
    difficulty: "hard",
    timeLimit: 150,
    pointsPerQuestion: 20,
    questions: [
      { id: "13-1", question: "Vishakha vs State", answer: "Sexual Harassment", explanation: "Established guidelines against workplace sexual harassment." },
      { id: "13-2", question: "Maneka Gandhi", answer: "Personal Liberty", explanation: "Expanded interpretation of Article 21." },
      { id: "13-3", question: "Navtej Singh Johar", answer: "Section 377", explanation: "Decriminalized consensual homosexual acts." },
      { id: "13-4", question: "Shreya Singhal", answer: "Section 66A", explanation: "Struck down Section 66A of IT Act." },
      { id: "13-5", question: "Shah Bano", answer: "Muslim Women", explanation: "Landmark case on maintenance for divorced Muslim women." },
      { id: "13-6", question: "Minerva Mills", answer: "Basic Structure", explanation: "Reaffirmed Basic Structure doctrine." },
    ],
  },
  {
    id: 14,
    title: "Schedules Match",
    description: "Match all 12 schedules with contents",
    type: "puzzle",
    difficulty: "hard",
    timeLimit: 180,
    pointsPerQuestion: 18,
    questions: [
      { id: "14-1", question: "First Schedule", answer: "States & Territories" },
      { id: "14-2", question: "Third Schedule", answer: "Oaths & Affirmations" },
      { id: "14-3", question: "Seventh Schedule", answer: "Union, State, Concurrent" },
      { id: "14-4", question: "Eighth Schedule", answer: "22 Languages" },
      { id: "14-5", question: "Tenth Schedule", answer: "Anti-Defection" },
      { id: "14-6", question: "Twelfth Schedule", answer: "Municipalities" },
    ],
  },
  {
    id: 15,
    title: "Constitution Master",
    description: "Find all constitutional concepts",
    type: "wordsearch",
    difficulty: "hard",
    timeLimit: 200,
    pointsPerQuestion: 15,
    questions: [
      { id: "15-1", question: "Find: FEDERALISM", answer: "FEDERALISM" },
      { id: "15-2", question: "Find: SECULARISM", answer: "SECULARISM" },
      { id: "15-3", question: "Find: SOVEREIGNTY", answer: "SOVEREIGNTY" },
      { id: "15-4", question: "Find: DEMOCRACY", answer: "DEMOCRACY" },
      { id: "15-5", question: "Find: REPUBLIC", answer: "REPUBLIC" },
      { id: "15-6", question: "Find: SOCIALISM", answer: "SOCIALISM" },
    ],
  },
];

export const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-india/10 text-green-india border-green-india/20";
    case "medium":
      return "bg-gold/10 text-gold border-gold/20";
    case "hard":
      return "bg-destructive/10 text-destructive border-destructive/20";
  }
};

export const getGameTypeIcon = (type: GameType) => {
  switch (type) {
    case "scramble":
      return "🔤";
    case "quiz":
      return "❓";
    case "memory":
      return "🧠";
    case "puzzle":
      return "🧩";
    case "wordsearch":
      return "🔍";
    case "truthlie":
      return "🤥";
  }
};
