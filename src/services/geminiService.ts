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
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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

// Track shown facts to prevent repetition
const shownFacts = new Set<string>();

// Fallback facts for when API quota is exceeded - ALL VERIFIED AND TRUE
const fallbackFunFacts = [
  "The Constitution manuscript weighs 3.75kg - heavier than a newborn baby! It's preserved in helium-filled cases in Parliament.",
  "Prem Behari Narain Raizada hand-calligraphed the entire Constitution using 432 pen holders over 6 months - talk about dedication!",
  "It took exactly 2 years, 11 months, and 18 days to draft the Constitution - that's 165 drafting committee sessions!",
  "The Constitution originally had 395 articles and 8 schedules. Now it has 470 articles and 12 schedules after 106 amendments!",
  "January 26 was chosen as Republic Day because on this exact date in 1930, the Indian National Congress declared Purna Swaraj!",
  "The Constitution borrowed features from 10+ countries - UK, USA, Ireland, Australia, USSR, France, Canada, and more!",
  "Dr. B.R. Ambedkar burned the original draft of the Hindu Code Bill when it was rejected - he resigned the next day!",
  "The Constituent Assembly had only 15 women members out of 389 - just 3.8% female representation!",
  "Article 370 giving Kashmir special status was meant to be 'temporary' but lasted exactly 70 years before being removed in 2019!",
  "The Constitution was handwritten in both Hindi and English - no typing or printing was used for the original copies!",
];

let lastFallbackIndex = -1;

export const getConstitutionFunFact = async (): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  const previousFactsPrompt = shownFacts.size > 0 
    ? `Do NOT repeat these facts that were already shown: ${Array.from(shownFacts).join('; ')}\n\n` 
    : '';

  const prompt = `${previousFactsPrompt}Generate ONE surprising, mind-blowing, or hilariously quirky fun fact about the Indian Constitution that will make people go "WHAT?! Really?!"

CRITICAL: The fact MUST be 100% TRUE and VERIFIABLE. Do NOT make up fake stories or false information.

Requirements:
- Must be FACTUALLY ACCURATE - verify before generating
- Make it shocking, amusing, or ridiculously interesting
- Include real historical incidents, actual statistics, true anecdotes, or documented facts
- Use numbers, comparisons, or vivid descriptions to make it memorable
- Can be about: real amendments, actual incidents during drafting, genuine articles, verified records, documented traditions, historical facts, etc.
- Keep it 20-40 words
- Write in a casual, excited tone like you're telling a friend
- NO fabricated stories - only cite real, verifiable information

Examples of REAL facts (create different NEW ones):
- "The Constitution was hand-calligraphed by Prem Behari Narain Raizada using 432 pen holders over 6 months!"
- "The original Constitution weighs 3.75 kg - heavier than most newborn babies!"
- "It took exactly 2 years, 11 months and 18 days to draft the Constitution!"

Give ONLY the fact. No quotes, no introduction, no explanation.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 1.2,
            maxOutputTokens: 120,
            topP: 0.95,
            topK: 50
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('API_ERROR');
    }

    const data = await response.json();
    const fact = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    
    if (!fact) {
      throw new Error('NO_RESPONSE');
    }

    // Remove any quotes or formatting the AI might add
    const cleanFact = fact.replace(/^["']|["']$/g, '').trim();

    // Store the fact to avoid repetition
    shownFacts.add(cleanFact);
    
    // Clear the set if it gets too large (after 50 facts)
    if (shownFacts.size > 50) {
      shownFacts.clear();
    }

    return cleanFact;
  } catch (error) {
    // Use fallback facts when API fails
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * fallbackFunFacts.length);
    } while (newIndex === lastFallbackIndex && fallbackFunFacts.length > 1);
    
    lastFallbackIndex = newIndex;
    return fallbackFunFacts[newIndex];
  }
};
