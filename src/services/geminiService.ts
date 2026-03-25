// Keywords for law and constitutional topics
const LAW_KEYWORDS = [
  'constitution', 'article', 'fundamental', 'rights', 'duties', 'directive', 'principles',
  'preamble', 'amendment', 'parliament', 'lok sabha', 'rajya sabha', 'president', 'governor',
  'supreme court', 'high court', 'judiciary', 'legislature', 'executive', 'law', 'legal',
  'act', 'bill', 'ordinance', 'citizenship', 'election', 'voting', 'democracy', 'republic',
  'secular', 'socialist', 'sovereign', 'federal', 'union', 'state', 'territory', 'schedule',
  'ambedkar', 'constituent assembly', 'emergency', 'martial law', 'habeas corpus', 'writ',
  'mandamus', 'certiorari', 'prohibition', 'quo warranto', 'justice', 'equality', 'liberty',
  'fraternity', 'minority', 'reservation', 'caste', 'discrimination', 'untouchability',
  'freedom', 'speech', 'expression', 'religion', 'education', 'property', 'exploitation',
  'child labor', 'trafficking', 'bonded labor', 'petition', 'appeal', 'verdict', 'judgment',
  'constitutional', 'unconstitutional', 'veto', 'assent', 'prorogation', 'dissolution',
  'cabinet', 'minister', 'chief minister', 'prime minister', 'governor', 'speaker',
  'impeachment', 'no confidence', 'money bill', 'finance bill', 'budget', 'appropriation',
  'comptroller', 'auditor', 'election commission', 'upsc', 'attorney general', 'advocate',
  'solicitor general', 'public interest litigation', 'pil', 'suo moto', 'contempt',
  'ipc', 'crpc', 'evidence act', 'contract act', 'tort', 'criminal', 'civil', 'penal',
  'bail', 'arrest', 'detention', 'custody', 'trial', 'accused', 'plaintiff', 'defendant'
];

export const isLegalQuestion = (query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  return LAW_KEYWORDS.some(keyword => lowerQuery.includes(keyword));
};

export const askGemini = async (query: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  const systemPrompt = `You are a Constitutional and Basic Legal Awareness Expert AI specializing in the Indian Constitution and everyday legal rights. Your role is to:

1. Answer questions related to:
   - Indian Constitution and its articles
   - Fundamental Rights and Duties
   - Directive Principles of State Policy
   - Government structure and functioning
   - Legal rights of citizens
   - Basic criminal and civil law concepts
   - Everyday law scenarios (accidents, theft, harassment, property issues, police complaints, FIR, consumer issues, etc.)
   - Landmark judgments and legal principles

2. For scenario-based questions:
   - Identify the legal issues involved
   - Explain which rights, laws, or constitutional principles apply
   - Give general guidance such as what steps a person is allowed to take
   - DO NOT give professional or actionable legal advice
   - DO NOT recommend filing/ drafting legal documents
   - Always add a disclaimer: “This is general legal awareness, not legal advice.”

3. If a question is completely unrelated to law, constitution, rights, government, crime, or legal scenarios, politely decline.

4. Provide answers that are:
   - Simple and easy to understand
   - Structured using bullet points
   - Educational and beginner-friendly
   - Rich with article numbers, IPC/CrPC sections, or key legal terms when relevant

5. Keep responses concise but comprehensive.
dont give any highlighted or bold text, just give plain text and dont give stars next to points.if there are any point give it in numbers`; 

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('Gemini API error:', error);
    throw new Error('API_ERROR');
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('NO_RESPONSE');
  }

  return text;
};

const usedFacts: string[] = [];

const topics = [
  "fundamental rights",
  "amendments",
  "history",
  "articles",
  "judiciary",
  "parliament",
  "preamble",
  "emergency provisions",
  "directive principles",
  "citizenship"
];

export const getFunFactFromGemini = async (): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) throw new Error("API_KEY_MISSING");

  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const recentFacts = usedFacts.slice(-3).join(" | ");

  const prompt = `
Give one short fact about the Indian Constitution related to ${randomTopic} in under 20 words and don't think much.
Avoid repeating similar facts.
Recent facts: ${recentFacts}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.9,           
          maxOutputTokens: 1024,       
          topP: 0.9,
          responseMimeType: "text/plain",
        },
      }),
    }
  );

  if (!response.ok) throw new Error("API_ERROR");

  const data = await response.json();

  let text = "";

  if (data?.candidates?.length) {
    const parts = data.candidates[0]?.content?.parts;

    if (parts && parts.length) {
      text = parts.map((p: any) => p.text || "").join(" ").trim();
    }
  }

  console.log("EXTRACTED TEXT:", text);

  text = text
    .replace(/\n/g, " ")
    .replace(/[*#]/g, "")
    .replace(/Sure.*?:/i, "")
    .trim();

  if (text.includes("(") && !text.includes(")")) {
    text += ")";
  }

  if (!text.endsWith(".")) {
    text += ".";
  }

  if (text.includes(".")) {
    text = text.split(".")[0] + ".";
  }

  const words = text.split(" ").filter(Boolean);
  if (words.length > 50) {
    text = words.slice(0, 50).join(" ") + ".";
  }

  if (usedFacts.includes(text)) {
    console.warn("Duplicate detected");

    return "Article 368 empowers Parliament to amend the Constitution.";
  }

  usedFacts.push(text);

  if (usedFacts.length > 10) {
    usedFacts.shift();
  }

  if (!text || words.length < 5) {
    return "The Constitution of India came into effect on 26 January 1950.";
  }

  return text;
};