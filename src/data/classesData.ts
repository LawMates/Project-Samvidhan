export interface DetailedTopic {
  id: string;
  title: string;
  icon: string;
  difficulty: "Basic" | "Intermediate" | "Advanced";
  sections: {
    heading: string;
    content: string;
    keyPoints?: string[];
    example?: string;
  }[];
}

export const detailedTopics: DetailedTopic[] = [
  {
    id: "introduction",
    title: "Introduction to the Constitution",
    icon: "📖",
    difficulty: "Basic",
    sections: [
      {
        heading: "What is a Constitution?",
        content: "A Constitution is the supreme law of a country. It lays down the framework defining fundamental political principles, establishes the structure, procedures, powers, and duties of government institutions, and sets out fundamental rights, directive principles, and duties of citizens. The Indian Constitution is the longest written constitution of any sovereign country in the world.",
        keyPoints: [
          "Supreme law of the land",
          "Defines the structure of government",
          "Establishes rights and duties of citizens",
          "Provides a framework for governance"
        ]
      },
      {
        heading: "Historical Background",
        content: "The demand for a Constituent Assembly was first made by M.N. Roy in 1934. The idea was taken up by the Indian National Congress in 1935. The British government accepted the demand through the Cabinet Mission Plan of 1946. The Constituent Assembly first met on December 9, 1946, and Dr. Rajendra Prasad was elected as its President. The Assembly took 2 years, 11 months, and 18 days to complete the drafting of the Constitution.",
        keyPoints: [
          "M.N. Roy first proposed the idea in 1934",
          "Cabinet Mission Plan of 1946 accepted the demand",
          "First meeting: December 9, 1946",
          "Dr. Rajendra Prasad was the President of the Constituent Assembly",
          "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee"
        ]
      },
      {
        heading: "Key Dates",
        content: "The Constitution was adopted on November 26, 1949, which is celebrated as Constitution Day (National Law Day). It came into effect on January 26, 1950, which is celebrated as Republic Day. This date was chosen because the Indian National Congress declared Purna Swaraj (complete independence) on January 26, 1930.",
        keyPoints: [
          "November 26, 1949 — Constitution adopted (Constitution Day)",
          "January 26, 1950 — Constitution came into effect (Republic Day)",
          "January 26, 1930 — Purna Swaraj declaration by INC"
        ]
      },
      {
        heading: "Sources of the Indian Constitution",
        content: "The Indian Constitution borrowed features from several constitutions around the world. The makers of the Constitution studied constitutions of about 60 countries before drafting ours. This is why the Indian Constitution is sometimes called a 'bag of borrowings', though it is adapted to Indian conditions.",
        keyPoints: [
          "UK — Parliamentary system, Rule of Law, Legislative procedure",
          "USA — Fundamental Rights, Judicial Review, Independence of Judiciary",
          "Ireland — Directive Principles, Method of Presidential election",
          "Canada — Federation with strong Centre, Residuary powers",
          "Australia — Concurrent List, Joint Sitting of Parliament",
          "Germany — Suspension of Fundamental Rights during Emergency",
          "South Africa — Amendment procedure",
          "Japan — Procedure established by law"
        ]
      }
    ]
  },
  {
    id: "preamble",
    title: "The Preamble",
    icon: "📜",
    difficulty: "Basic",
    sections: [
      {
        heading: "Understanding the Preamble",
        content: "The Preamble is the introduction to the Indian Constitution. It contains the summary or essence of the Constitution and reflects the ideals and aspirations of the people of India. The Preamble is based on the 'Objectives Resolution' drafted by Jawaharlal Nehru and adopted by the Constituent Assembly on January 22, 1947. The Supreme Court in the Kesavananda Bharati case (1973) held that the Preamble is a part of the Constitution.",
        keyPoints: [
          "Based on Nehru's Objectives Resolution",
          "Adopted on January 22, 1947",
          "Part of the Constitution (Kesavananda Bharati case, 1973)",
          "Can be amended under Article 368"
        ]
      },
      {
        heading: "Key Words and Their Meaning",
        content: "The Preamble declares India as a Sovereign, Socialist, Secular, Democratic, Republic. 'Socialist' and 'Secular' were added by the 42nd Amendment Act of 1976. Each word carries deep significance and defines the character of the Indian state.",
        keyPoints: [
          "Sovereign — India is internally and externally supreme, not dependent on any outside authority",
          "Socialist — The state aims to eliminate inequality in income, status, and standard of living (democratic socialism, not communism)",
          "Secular — All religions are treated equally; there is no state religion",
          "Democratic — The government derives its authority from the will of the people through elections",
          "Republic — The head of state (President) is elected, not hereditary (unlike the UK monarchy)"
        ]
      },
      {
        heading: "Objectives of the Preamble",
        content: "The Preamble secures to all citizens Justice (social, economic, and political), Liberty (of thought, expression, belief, faith, and worship), Equality (of status and opportunity), and Fraternity (assuring the dignity of the individual and unity and integrity of the nation). The word 'integrity' was added by the 42nd Amendment.",
        keyPoints: [
          "Justice — Social, economic, and political",
          "Liberty — Of thought, expression, belief, faith, and worship",
          "Equality — Of status and of opportunity",
          "Fraternity — Dignity of individual + Unity and integrity of the nation"
        ]
      },
      {
        heading: "Amendment of the Preamble",
        content: "The Preamble has been amended only once through the 42nd Constitutional Amendment Act of 1976. Three new words were added — Socialist, Secular, and Integrity. The Supreme Court held in the Kesavananda Bharati case that the Preamble can be amended but the basic structure of the Constitution as reflected in the Preamble cannot be altered.",
        example: "Original: 'Sovereign Democratic Republic' → Amended: 'Sovereign Socialist Secular Democratic Republic'"
      }
    ]
  },
  {
    id: "fundamental-rights",
    title: "Fundamental Rights",
    icon: "⚖️",
    difficulty: "Basic",
    sections: [
      {
        heading: "Overview of Fundamental Rights",
        content: "Fundamental Rights are enshrined in Part III (Articles 12-35) of the Indian Constitution. Originally, there were seven Fundamental Rights, but the Right to Property (Article 31) was removed by the 44th Amendment Act of 1978 and made a legal right under Article 300A. Now there are six Fundamental Rights. These rights are justiciable, meaning they can be enforced through courts.",
        keyPoints: [
          "Part III of the Constitution (Articles 12-35)",
          "Six Fundamental Rights currently",
          "Inspired by the US Bill of Rights",
          "Justiciable — can be enforced by courts",
          "Available against the State (Article 12 defines 'State')",
          "Can be suspended during Emergency (except Articles 20 and 21)"
        ]
      },
      {
        heading: "Right to Equality (Articles 14-18)",
        content: "The Right to Equality is the cornerstone of Indian democracy. Article 14 guarantees equality before law and equal protection of laws. Article 15 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth. Article 16 ensures equality of opportunity in public employment. Article 17 abolishes untouchability. Article 18 abolishes titles except military and academic distinctions.",
        keyPoints: [
          "Article 14 — Equality before law (negative concept from UK) + Equal protection of laws (positive concept from USA)",
          "Article 15 — No discrimination; but special provisions for women, children, and backward classes allowed",
          "Article 16 — Equal opportunity in government jobs; reservation for backward classes permitted",
          "Article 17 — Untouchability abolished; its practice is a punishable offense",
          "Article 18 — No titles; citizens cannot accept foreign titles without President's consent"
        ]
      },
      {
        heading: "Right to Freedom (Articles 19-22)",
        content: "Article 19 guarantees six freedoms to Indian citizens: freedom of speech and expression, freedom to assemble peacefully, freedom to form associations, freedom to move freely throughout India, freedom to reside and settle in any part of India, and freedom to practice any profession or carry on any trade or business. These freedoms are not absolute and can be restricted by the State on reasonable grounds.",
        keyPoints: [
          "Article 19 — Six freedoms (speech, assembly, association, movement, residence, profession)",
          "Article 20 — Protection against ex-post-facto laws, double jeopardy, and self-incrimination",
          "Article 21 — Right to life and personal liberty (most expanded right through judicial interpretation)",
          "Article 21A — Right to education for children aged 6-14 (added by 86th Amendment, 2002)",
          "Article 22 — Protection against arbitrary arrest and detention"
        ]
      },
      {
        heading: "Right Against Exploitation (Articles 23-24)",
        content: "Article 23 prohibits human trafficking, begar (forced labor), and other similar forms of forced labor. Any contravention of this is an offense punishable by law. Article 24 prohibits the employment of children below 14 years in factories, mines, or any hazardous employment. The Child Labour (Prohibition and Regulation) Amendment Act, 2016 further strengthened these protections.",
        keyPoints: [
          "Article 23 — Prohibits trafficking, begar, and forced labor",
          "Article 24 — No child labor below 14 years in hazardous occupations",
          "These rights are available against both the State and private individuals"
        ]
      },
      {
        heading: "Right to Freedom of Religion (Articles 25-28)",
        content: "These articles establish India's secular character. Article 25 gives freedom of conscience and right to freely profess, practice, and propagate religion. Article 26 gives religious denominations the right to manage their affairs. Article 27 ensures no tax can be levied for promotion of any religion. Article 28 prohibits religious instruction in state-funded educational institutions.",
        keyPoints: [
          "Article 25 — Freedom of conscience; right to profess, practice, propagate religion",
          "Article 26 — Freedom to manage religious affairs and own property",
          "Article 27 — No religious tax",
          "Article 28 — No religious instruction in state-funded institutions"
        ]
      },
      {
        heading: "Cultural & Educational Rights and Right to Constitutional Remedies",
        content: "Articles 29-30 protect minority interests. Article 29 protects the interests of minorities by allowing them to conserve their language, script, and culture. Article 30 gives minorities the right to establish and administer educational institutions. Article 32 is the most important — it gives the right to move the Supreme Court directly for enforcement of Fundamental Rights. Dr. Ambedkar called Article 32 the 'heart and soul of the Constitution'.",
        keyPoints: [
          "Article 29 — Protection of minority interests (language, script, culture)",
          "Article 30 — Right of minorities to establish educational institutions",
          "Article 32 — Right to Constitutional Remedies (Heart and Soul of Constitution)",
          "Five Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto"
        ]
      }
    ]
  },
  {
    id: "fundamental-duties",
    title: "Fundamental Duties",
    icon: "🤝",
    difficulty: "Basic",
    sections: [
      {
        heading: "Introduction to Fundamental Duties",
        content: "Fundamental Duties were not part of the original Constitution. They were added by the 42nd Constitutional Amendment Act of 1976, on the recommendation of the Swaran Singh Committee. They are listed in Article 51A under Part IVA of the Constitution. Originally there were 10 duties; the 11th duty was added by the 86th Amendment Act of 2002. These duties are inspired by the Constitution of the erstwhile Soviet Union (USSR).",
        keyPoints: [
          "Added by 42nd Amendment (1976)",
          "Swaran Singh Committee recommended them",
          "Part IVA, Article 51A",
          "Non-justiciable (cannot be enforced by courts)",
          "Apply only to citizens, not to foreigners",
          "Inspired by the USSR Constitution"
        ]
      },
      {
        heading: "The 11 Fundamental Duties",
        content: "Every citizen of India has the following duties: (a) To abide by the Constitution and respect its ideals, the National Flag and the National Anthem; (b) To cherish and follow the noble ideals that inspired our national freedom struggle; (c) To uphold and protect the sovereignty, unity, and integrity of India; (d) To defend the country and render national service when called upon; (e) To promote harmony and the spirit of common brotherhood amongst all the people of India, transcending religious, linguistic, and regional or sectional diversities, and to renounce practices derogatory to the dignity of women.",
        keyPoints: [
          "(f) Value and preserve the rich heritage of composite culture",
          "(g) Protect and improve the natural environment",
          "(h) Develop scientific temper, humanism, and spirit of inquiry",
          "(i) Safeguard public property and abjure violence",
          "(j) Strive towards excellence in individual and collective activity",
          "(k) Provide education to children aged 6-14 (added 2002, 86th Amendment)"
        ]
      },
      {
        heading: "Significance and Criticism",
        content: "Although non-justiciable, Fundamental Duties serve as a reminder to citizens that while enjoying rights, they must also be conscious of their duties. Courts have used Fundamental Duties for interpreting ambiguous laws. In the M.C. Mehta case (1988), the Supreme Court emphasized the duty to protect the environment. However, critics argue that without legal enforceability, these duties remain mere moral precepts.",
        keyPoints: [
          "Serve as a constant reminder of civic responsibility",
          "Help courts interpret laws",
          "No legal penalty for non-compliance",
          "Verma Committee (1999) recommended ways to operationalize them"
        ]
      }
    ]
  },
  {
    id: "directive-principles",
    title: "Directive Principles of State Policy",
    icon: "🎯",
    difficulty: "Basic",
    sections: [
      {
        heading: "What are DPSPs?",
        content: "Directive Principles of State Policy (DPSPs) are guidelines for the central and state governments to keep in mind while framing laws and policies. They are contained in Part IV (Articles 36-51) of the Constitution. Borrowed from the Irish Constitution, DPSPs aim to establish a welfare state in India. They are non-justiciable, meaning they cannot be enforced by courts, but they are fundamental in governance of the country.",
        keyPoints: [
          "Part IV, Articles 36-51",
          "Borrowed from Irish Constitution",
          "Non-justiciable but fundamental in governance",
          "Aim: Establish social and economic democracy",
          "Supplement Fundamental Rights"
        ]
      },
      {
        heading: "Classification of DPSPs",
        content: "DPSPs can be classified into three categories: Socialist Principles (Articles 38, 39, 39A, 41, 42, 43, 43A, 47), Gandhian Principles (Articles 40, 43, 46, 47, 48), and Liberal-Intellectual Principles (Articles 44, 45, 48, 48A, 49, 50, 51). This classification helps understand the diverse ideological inspirations behind the Constitution.",
        keyPoints: [
          "Socialist: Equal pay, living wage, right to work, maternity relief",
          "Gandhian: Village panchayats, cottage industries, prohibition, cow protection",
          "Liberal-Intellectual: Uniform civil code, separation of judiciary, international peace"
        ]
      },
      {
        heading: "Conflict Between DPSPs and Fundamental Rights",
        content: "The relationship between DPSPs and Fundamental Rights has been debated extensively. In the Champakam Dorairajan case (1951), the Supreme Court held that Fundamental Rights prevail over DPSPs. However, the Parliament responded with the 1st Amendment. In the Minerva Mills case (1980), the Supreme Court held that there should be a balance between the two — neither should be given absolute primacy over the other.",
        keyPoints: [
          "Champakam Dorairajan (1951): Fundamental Rights prevail",
          "Golaknath case (1967): Parliament cannot amend Fundamental Rights",
          "Kesavananda Bharati (1973): Basic structure doctrine",
          "Minerva Mills (1980): Balance between DPSPs and Fundamental Rights"
        ]
      },
      {
        heading: "Implementation of DPSPs",
        content: "Several DPSPs have been implemented through legislation and policy. Land reform laws were enacted to implement Article 39(b). The Minimum Wages Act implements Article 43. MGNREGA (2005) implements Article 41 (right to work). The Right to Education Act (2009) implements Article 45. The Legal Services Authorities Act (1987) implements Article 39A (free legal aid).",
        keyPoints: [
          "Land Reform Laws — Article 39(b)",
          "Minimum Wages Act — Article 43",
          "MGNREGA — Article 41",
          "Right to Education Act — Article 45",
          "Legal Services Authorities Act — Article 39A",
          "73rd and 74th Amendments — Article 40 (Panchayati Raj)"
        ]
      }
    ]
  },
  {
    id: "union-executive",
    title: "Union Executive",
    icon: "🏛️",
    difficulty: "Intermediate",
    sections: [
      {
        heading: "The President of India",
        content: "The President of India is the head of state and the first citizen of India. The executive power of the Union is vested in the President (Article 53). However, the President acts as a nominal or constitutional head, exercising powers on the advice of the Council of Ministers headed by the Prime Minister (Article 74). The President is elected by an electoral college consisting of elected members of both Houses of Parliament and elected members of State Legislative Assemblies.",
        keyPoints: [
          "Article 52 — There shall be a President of India",
          "Article 53 — Executive power vested in President",
          "Article 74 — Council of Ministers to aid and advise President",
          "Elected indirectly by electoral college",
          "Term: 5 years; eligible for re-election",
          "Qualifications: Indian citizen, 35+ years, qualified for Lok Sabha membership"
        ]
      },
      {
        heading: "Powers of the President",
        content: "The President exercises executive, legislative, judicial, military, diplomatic, and emergency powers. Executive powers include appointing the PM, Council of Ministers, Governors, judges of Supreme Court and High Courts. Legislative powers include summoning and proroguing Parliament, dissolving Lok Sabha, and giving assent to bills. The President can promulgate ordinances when Parliament is not in session (Article 123).",
        keyPoints: [
          "Executive: Appointments of PM, Governors, Judges, Attorney General",
          "Legislative: Summoning/proroguing Parliament, assent to bills, ordinances",
          "Judicial: Pardoning power under Article 72 (pardon, reprieve, respite, remission, commutation)",
          "Emergency: Can declare National, State, and Financial Emergency",
          "Veto powers: Absolute veto, Suspensive veto, Pocket veto"
        ]
      },
      {
        heading: "The Prime Minister and Council of Ministers",
        content: "The Prime Minister is the head of government and the real executive authority. The President appoints the leader of the majority party in Lok Sabha as PM (Article 75). The Council of Ministers is collectively responsible to Lok Sabha. There are three categories of ministers: Cabinet Ministers, Ministers of State, and Deputy Ministers. The PM chairs Cabinet meetings and coordinates the work of different ministries.",
        keyPoints: [
          "Article 74 — Council of Ministers with PM at the head",
          "Article 75 — PM appointed by President; ministers appointed on PM's advice",
          "Collective responsibility to Lok Sabha",
          "Individual responsibility to President",
          "PM is the link between President and Council of Ministers"
        ]
      }
    ]
  },
  {
    id: "parliament",
    title: "Parliament of India",
    icon: "🏗️",
    difficulty: "Intermediate",
    sections: [
      {
        heading: "Structure of Parliament",
        content: "The Indian Parliament consists of three parts: the President, the Rajya Sabha (Council of States), and the Lok Sabha (House of the People). This is established under Article 79 of the Constitution. The Rajya Sabha has a maximum of 250 members (238 elected + 12 nominated by President). The Lok Sabha has a maximum of 552 members (530 from states + 20 from UTs + 2 Anglo-Indians nominated, though the Anglo-Indian provision was discontinued in 2020).",
        keyPoints: [
          "Article 79 — Parliament = President + Rajya Sabha + Lok Sabha",
          "Rajya Sabha — Upper House, permanent body (1/3 members retire every 2 years)",
          "Lok Sabha — Lower House, term of 5 years (can be dissolved earlier)",
          "Rajya Sabha members elected by state legislature MLAs",
          "Lok Sabha members directly elected by people"
        ]
      },
      {
        heading: "Legislative Procedure",
        content: "A bill must pass through both Houses of Parliament and receive Presidential assent to become law. There are different types of bills: Ordinary Bills, Money Bills (Article 110), Financial Bills, and Constitutional Amendment Bills (Article 368). Money Bills can only be introduced in Lok Sabha and Rajya Sabha can only recommend changes within 14 days. In case of a deadlock on an Ordinary Bill, the President can call a Joint Sitting (Article 108).",
        keyPoints: [
          "First Reading — Introduction of the bill",
          "Second Reading — Discussion and committee examination",
          "Third Reading — Voting on the bill",
          "Money Bills — Exclusive jurisdiction of Lok Sabha",
          "Joint Sitting (Article 108) — Presided by Lok Sabha Speaker",
          "Constitutional Amendment Bills cannot go to Joint Sitting"
        ]
      },
      {
        heading: "Parliamentary Privileges and Committees",
        content: "Members of Parliament enjoy certain privileges under Articles 105 and 122. These include freedom of speech in Parliament (no court proceedings for anything said in Parliament), freedom from arrest in civil cases during session, and the right to publish proceedings. Important Parliamentary Committees include the Public Accounts Committee, Estimates Committee, Committee on Public Undertakings, and the Committee on Subordinate Legislation.",
        keyPoints: [
          "Article 105 — Parliamentary privileges",
          "Freedom of speech in Parliament",
          "Public Accounts Committee — Examines government expenditure",
          "Estimates Committee — Reviews budget estimates",
          "Question Hour and Zero Hour — Tools of accountability"
        ]
      }
    ]
  },
  {
    id: "judiciary",
    title: "The Judiciary",
    icon: "⚔️",
    difficulty: "Intermediate",
    sections: [
      {
        heading: "Supreme Court of India",
        content: "The Supreme Court is the highest court in India and the guardian of the Constitution. It was established on January 28, 1950. Article 124 deals with the establishment and constitution of the Supreme Court. It consists of the Chief Justice of India and other judges (currently 33 + CJI = 34). The Supreme Court has original, appellate, and advisory jurisdiction. It also has the power of judicial review.",
        keyPoints: [
          "Article 124 — Establishment of Supreme Court",
          "Guardian and final interpreter of the Constitution",
          "Original Jurisdiction — Disputes between Union and States (Article 131)",
          "Appellate Jurisdiction — Appeals in civil, criminal, and constitutional matters",
          "Advisory Jurisdiction — President can seek opinion (Article 143)",
          "Court of Record (Article 129) — Decisions are binding precedents"
        ]
      },
      {
        heading: "High Courts and Subordinate Courts",
        content: "Each state has a High Court, which is the highest court at the state level (Article 214). High Courts exercise original, appellate, and supervisory jurisdiction. They have the power to issue writs under Article 226 for enforcement of Fundamental Rights AND other legal rights (wider than Supreme Court's Article 32 power). Below the High Courts are subordinate courts — District Courts, Sessions Courts, and various tribunals.",
        keyPoints: [
          "Article 214 — High Court for every state",
          "Article 226 — Writ jurisdiction (wider than Article 32)",
          "Article 227 — Superintendence over subordinate courts",
          "District Courts — Principal civil court at district level",
          "Sessions Courts — Criminal courts at district level"
        ]
      },
      {
        heading: "Judicial Review and Landmark Judgments",
        content: "Judicial Review is the power of the judiciary to examine the constitutionality of legislative acts and executive orders. It is considered a basic feature of the Constitution. Key landmark judgments include Kesavananda Bharati v. State of Kerala (1973) which established the Basic Structure Doctrine, Maneka Gandhi v. Union of India (1978) which expanded the scope of Article 21, and S.R. Bommai v. Union of India (1994) which laid down guidelines for President's Rule.",
        keyPoints: [
          "Kesavananda Bharati (1973) — Basic Structure Doctrine",
          "Maneka Gandhi (1978) — Due process of law",
          "S.R. Bommai (1994) — President's Rule guidelines",
          "Vishakha (1997) — Sexual harassment at workplace",
          "Navtej Singh Johar (2018) — Decriminalized homosexuality"
        ]
      }
    ]
  },
  {
    id: "federalism",
    title: "Indian Federalism",
    icon: "🗺️",
    difficulty: "Intermediate",
    sections: [
      {
        heading: "Federal Structure of India",
        content: "India has a federal system with a unitary bias. The Constitution does not use the word 'federation'; Article 1 describes India as a 'Union of States.' The framers deliberately used this term to emphasize that India's federation is not the result of an agreement between states and that states have no right to secede. India's federalism features a dual polity (Centre and States), written Constitution, division of powers, supremacy of the Constitution, and independent judiciary.",
        keyPoints: [
          "Article 1 — India is a 'Union of States'",
          "Strong Centre — unitary features in federation",
          "Division of powers — Union List, State List, Concurrent List (Seventh Schedule)",
          "Union List: 100 subjects (Defence, Foreign Affairs, Banking)",
          "State List: 61 subjects (Police, Health, Agriculture)",
          "Concurrent List: 52 subjects (Education, Marriage, Forests)"
        ]
      },
      {
        heading: "Centre-State Relations",
        content: "Centre-State relations are governed by Articles 245-263. Legislative relations deal with the distribution of legislative powers between Centre and States. Administrative relations deal with the executive power and its distribution. Financial relations deal with the distribution of revenues and grants-in-aid. Key institutions include the Inter-State Council (Article 263), Finance Commission (Article 280), and NITI Aayog (replaced Planning Commission in 2015).",
        keyPoints: [
          "Legislative Relations — Articles 245-255",
          "Administrative Relations — Articles 256-263",
          "Financial Relations — Articles 268-293",
          "Finance Commission — Article 280 (recommends revenue distribution)",
          "GST Council — Article 279A (added by 101st Amendment)"
        ]
      },
      {
        heading: "Special Provisions for Some States",
        content: "The Constitution provides special provisions for certain states. Article 370 (now abrogated) gave special status to Jammu & Kashmir. Article 371 provides special provisions for Maharashtra and Gujarat. Article 371A-371J provide special provisions for Nagaland, Assam, Manipur, Andhra Pradesh, Sikkim, Mizoram, Arunachal Pradesh, Goa, and Karnataka respectively. The Fifth and Sixth Schedules deal with administration of tribal areas.",
        keyPoints: [
          "Article 370 — Special status to J&K (abrogated in 2019)",
          "Article 371 — Special provisions for various states",
          "Fifth Schedule — Administration of Scheduled Areas",
          "Sixth Schedule — Tribal areas in Assam, Meghalaya, Tripura, Mizoram",
          "Article 371J — Special status to Hyderabad-Karnataka region"
        ]
      }
    ]
  },
  {
    id: "local-governance",
    title: "Local Self-Government",
    icon: "🏘️",
    difficulty: "Intermediate",
    sections: [
      {
        heading: "Panchayati Raj System",
        content: "The 73rd Constitutional Amendment Act of 1992 gave constitutional status to Panchayati Raj Institutions (PRIs). It added Part IX and the Eleventh Schedule to the Constitution. The Panchayati Raj system has a three-tier structure: Gram Panchayat at the village level, Panchayat Samiti (Block Panchayat) at the intermediate level, and Zila Parishad at the district level. States with population below 20 lakhs may not have the intermediate level.",
        keyPoints: [
          "73rd Amendment (1992) — Constitutional status to PRIs",
          "Part IX, Articles 243-243O",
          "Three-tier system: Village → Block → District",
          "Gram Sabha — Foundation of Panchayati Raj",
          "Reservation: 1/3 seats for women; SC/ST reservation based on population",
          "Eleventh Schedule — 29 subjects devolved to Panchayats"
        ]
      },
      {
        heading: "Municipal Bodies",
        content: "The 74th Constitutional Amendment Act of 1992 gave constitutional status to urban local bodies. It added Part IXA and the Twelfth Schedule. Three types of municipalities were established: Nagar Panchayat (for transitional areas), Municipal Council (for smaller urban areas), and Municipal Corporation (for larger urban areas). The Amendment provides for reservation, regular elections, and devolution of powers to municipalities.",
        keyPoints: [
          "74th Amendment (1992) — Constitutional status to municipalities",
          "Part IXA, Articles 243P-243ZG",
          "Three types: Nagar Panchayat, Municipal Council, Municipal Corporation",
          "Twelfth Schedule — 18 functions of municipalities",
          "Ward Committees in municipalities with 3 lakh+ population",
          "State Election Commission conducts municipal elections"
        ]
      }
    ]
  },
  {
    id: "emergency-provisions",
    title: "Emergency Provisions",
    icon: "🚨",
    difficulty: "Advanced",
    sections: [
      {
        heading: "Types of Emergency",
        content: "The Indian Constitution provides for three types of emergencies: National Emergency (Article 352), State Emergency or President's Rule (Article 356), and Financial Emergency (Article 360). These provisions are borrowed from the Weimar Constitution of Germany. Emergency provisions convert the federal structure into a unitary one, giving extraordinary powers to the Centre.",
        keyPoints: [
          "National Emergency (Article 352) — War, external aggression, armed rebellion",
          "State Emergency (Article 356) — Failure of constitutional machinery in states",
          "Financial Emergency (Article 360) — Threat to financial stability",
          "Borrowed from Weimar Constitution of Germany",
          "Only National Emergency and President's Rule have been proclaimed so far"
        ]
      },
      {
        heading: "National Emergency in Detail",
        content: "National Emergency can be proclaimed by the President when the security of India or any part thereof is threatened by war, external aggression, or armed rebellion (originally 'internal disturbance', changed by 44th Amendment). It must be approved by Parliament within one month by a special majority. Once approved, it continues for 6 months and can be extended indefinitely with Parliament's approval every 6 months.",
        keyPoints: [
          "Proclaimed 3 times: 1962 (Chinese aggression), 1971 (Pakistan war), 1975 (internal disturbance)",
          "44th Amendment: 'Internal disturbance' changed to 'armed rebellion'",
          "Written recommendation of Cabinet required (44th Amendment)",
          "Article 19 freedoms automatically suspended",
          "Articles 20 and 21 cannot be suspended (44th Amendment)",
          "Lok Sabha life can be extended by 1 year during Emergency"
        ]
      },
      {
        heading: "President's Rule (Article 356)",
        content: "President's Rule is imposed when a state government cannot function according to constitutional provisions. The Governor reports to the President, who then takes over the state administration. It must be approved by Parliament within 2 months. Initially valid for 6 months, it can be extended up to a maximum of 3 years with Parliament's approval every 6 months. After 1 year, extension requires either a National Emergency or Election Commission certification.",
        keyPoints: [
          "Governor's report triggers Article 356",
          "State legislature suspended or dissolved",
          "President governs through the Governor",
          "Maximum duration: 3 years",
          "S.R. Bommai case (1994) — Judicial review of President's Rule",
          "Used over 100 times since Independence"
        ]
      },
      {
        heading: "Safeguards Against Misuse",
        content: "The 44th Amendment Act of 1978 introduced several safeguards against misuse of emergency provisions. These include requiring Cabinet's written recommendation, changing 'internal disturbance' to 'armed rebellion', making Articles 20 and 21 non-suspendable, allowing judicial review of emergency proclamation, and requiring special majority for approval. The S.R. Bommai judgment further strengthened these safeguards.",
        keyPoints: [
          "Cabinet's written recommendation mandatory",
          "Judicial review of proclamation allowed",
          "Special majority for Parliamentary approval",
          "Articles 20 and 21 cannot be suspended",
          "Lok Sabha can revoke Emergency by simple majority"
        ]
      }
    ]
  },
  {
    id: "amendment-process",
    title: "Constitutional Amendments",
    icon: "📝",
    difficulty: "Advanced",
    sections: [
      {
        heading: "Amendment Procedure (Article 368)",
        content: "The Constitution of India can be amended by Parliament under Article 368. The amendment procedure is neither as rigid as the American Constitution nor as flexible as the British Constitution. A Constitutional Amendment Bill can be introduced in either House of Parliament (not in state legislatures) and must be passed by each House by a special majority (majority of total membership + 2/3 of members present and voting).",
        keyPoints: [
          "Article 368 — Power of Parliament to amend the Constitution",
          "Bill can be introduced in either House",
          "No prior permission of President required for introduction",
          "Special majority required in each House",
          "No provision for Joint Sitting for Amendment Bills",
          "President must give assent (cannot return the bill)"
        ]
      },
      {
        heading: "Types of Amendments",
        content: "There are three ways to amend the Constitution: (1) By simple majority of Parliament (like ordinary legislation) — e.g., admission of new states, creation of Legislative Councils; (2) By special majority of Parliament — most provisions; (3) By special majority of Parliament + ratification by at least half of state legislatures — e.g., election of President, distribution of legislative powers, representation of states in Parliament.",
        keyPoints: [
          "Simple majority — Articles outside Article 368",
          "Special majority — Most provisions under Article 368",
          "Special majority + State ratification — Federal provisions",
          "State ratification by simple majority of state legislature"
        ]
      },
      {
        heading: "Important Amendments",
        content: "Some key amendments include: 1st Amendment (1951) — Added reasonable restrictions to freedom of speech; 42nd Amendment (1976) — The 'Mini Constitution' that made sweeping changes; 44th Amendment (1978) — Reversed many changes of the 42nd Amendment; 73rd and 74th Amendments (1992) — Panchayati Raj and Municipalities; 86th Amendment (2002) — Right to Education; 101st Amendment (2016) — Goods and Services Tax (GST).",
        keyPoints: [
          "1st Amendment — Reasonable restrictions on Article 19",
          "42nd Amendment — Mini Constitution (Socialist, Secular, Integrity added to Preamble)",
          "44th Amendment — Reversed 42nd Amendment changes; removed Right to Property as FR",
          "73rd & 74th — Local self-government",
          "86th — Right to Education (Article 21A)",
          "101st — GST",
          "Over 105 amendments made so far"
        ]
      }
    ]
  },
  {
    id: "womens-rights",
    title: "Women's Constitutional Rights",
    icon: "👩",
    difficulty: "Advanced",
    sections: [
      {
        heading: "Constitutional Provisions for Women",
        content: "The Indian Constitution provides several provisions for the protection and empowerment of women. The framers were conscious of the need to ensure gender equality and included specific provisions to address historical discrimination. Article 14 guarantees equality before law, Article 15(1) prohibits discrimination on grounds of sex, and Article 15(3) specifically empowers the State to make special provisions for women and children.",
        keyPoints: [
          "Article 14 — Equality before law",
          "Article 15(1) — No discrimination on ground of sex",
          "Article 15(3) — Special provisions for women and children",
          "Article 16 — Equal opportunity in public employment",
          "Article 39(a) — Equal right to adequate means of livelihood",
          "Article 39(d) — Equal pay for equal work",
          "Article 42 — Just and humane conditions of work; maternity relief"
        ]
      },
      {
        heading: "Key Legislation for Women",
        content: "Parliament has enacted several laws for the protection of women's rights. The Dowry Prohibition Act (1961) prohibits giving or taking dowry. The Protection of Women from Domestic Violence Act (2005) provides civil remedies for domestic violence. The Sexual Harassment of Women at Workplace Act (2013) implements the Vishakha Guidelines. The Criminal Law Amendment Act (2013), passed after the Nirbhaya case, strengthened laws against sexual offenses.",
        keyPoints: [
          "Dowry Prohibition Act, 1961",
          "Protection of Women from Domestic Violence Act, 2005",
          "Sexual Harassment at Workplace Act, 2013",
          "Criminal Law (Amendment) Act, 2013 (Nirbhaya Act)",
          "Maternity Benefit (Amendment) Act, 2017 — 26 weeks maternity leave",
          "Muslim Women (Protection of Rights on Marriage) Act, 2019 — Triple Talaq criminalized"
        ]
      },
      {
        heading: "Landmark Judgments on Women's Rights",
        content: "Indian courts have played a crucial role in advancing women's rights. The Vishakha case (1997) laid down guidelines against sexual harassment at workplace. The Shayara Bano case (2017) declared Triple Talaq unconstitutional. The Joseph Shine case (2018) struck down adultery as a criminal offense, holding it violated women's dignity. The Babita Puniya case (2020) granted permanent commission to women officers in the Army.",
        keyPoints: [
          "Vishakha v. State of Rajasthan (1997) — Workplace harassment guidelines",
          "Shayara Bano v. Union of India (2017) — Triple Talaq unconstitutional",
          "Joseph Shine v. Union of India (2018) — Adultery law struck down",
          "Babita Puniya (2020) — Permanent commission for women in Army",
          "Indian Young Lawyers Association (2018) — Sabarimala Temple entry"
        ]
      }
    ]
  },
  {
    id: "election-process",
    title: "Elections and Voting",
    icon: "🗳️",
    difficulty: "Advanced",
    sections: [
      {
        heading: "Election Commission of India",
        content: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India. It was established on January 25, 1950, under Article 324 of the Constitution. Originally a single-member body, it became multi-member in 1989 and has been a three-member body since 1993 (Chief Election Commissioner + two Election Commissioners). The CEC can be removed only through impeachment.",
        keyPoints: [
          "Article 324 — Superintendence, direction, and control of elections",
          "Established: January 25, 1950 (National Voters' Day)",
          "Three-member body since 1993",
          "CEC has security of tenure (removable like a Supreme Court judge)",
          "Other ECs can be removed on CEC's recommendation",
          "Conducts elections for President, VP, Parliament, and State Legislatures"
        ]
      },
      {
        heading: "Electoral System",
        content: "India follows the First-Past-The-Post (FPTP) system for Lok Sabha and State Assembly elections. The candidate who gets the most votes wins, even without a majority. For Rajya Sabha and Presidential elections, the system of proportional representation with single transferable vote is used. Universal Adult Suffrage (Article 326) means every Indian citizen above 18 years has the right to vote (voting age reduced from 21 to 18 by the 61st Amendment, 1988).",
        keyPoints: [
          "FPTP system for Lok Sabha and State Assemblies",
          "Proportional Representation for Rajya Sabha and President",
          "Article 326 — Universal Adult Suffrage",
          "61st Amendment (1988) — Voting age reduced from 21 to 18",
          "Anti-defection law — Tenth Schedule (52nd Amendment, 1985)",
          "NOTA option introduced in 2013 (PUCL v. Union of India)"
        ]
      },
      {
        heading: "Electoral Reforms",
        content: "Several electoral reforms have been introduced to make the election process fairer and more transparent. These include introduction of EVMs (Electronic Voting Machines) which were first used in 1982, VVPATs (Voter Verified Paper Audit Trail) for verification, ceiling on election expenditure, model code of conduct, and disclosure of criminal cases and assets by candidates. The Supreme Court's judgment in Association for Democratic Reforms (2002) made disclosure of criminal background, assets, and educational qualifications mandatory.",
        keyPoints: [
          "EVMs introduced: First used in 1982 Kerala by-election",
          "VVPAT — Paper trail for voter verification",
          "Model Code of Conduct — Comes into effect from announcement of elections",
          "Ceiling on election expenditure for candidates",
          "Criminalization of politics remains a concern",
          "One Nation One Election debate"
        ]
      }
    ]
  },
  {
    id: "basic-structure",
    title: "Basic Structure Doctrine",
    icon: "🏗️",
    difficulty: "Advanced",
    sections: [
      {
        heading: "Evolution of the Basic Structure Doctrine",
        content: "The Basic Structure Doctrine is one of the most important contributions of the Indian judiciary to constitutional law. It was established in the landmark Kesavananda Bharati v. State of Kerala case (1973). The Supreme Court, by a 7-6 majority, held that while Parliament has wide powers to amend the Constitution under Article 368, it cannot alter the 'basic structure' or framework of the Constitution. This doctrine limits the amending power of Parliament.",
        keyPoints: [
          "Kesavananda Bharati v. State of Kerala (1973)",
          "13-judge bench, 7-6 majority decision",
          "Parliament can amend any provision but not destroy basic structure",
          "Not explicitly mentioned in the Constitution",
          "Evolved through judicial interpretation",
          "Unique to Indian constitutional jurisprudence"
        ]
      },
      {
        heading: "Elements of Basic Structure",
        content: "The Supreme Court has identified several features as part of the basic structure through various judgments. These include supremacy of the Constitution, republican and democratic form of government, secular character, separation of powers, federal character, unity and sovereignty of India, individual freedom, rule of law, judicial review, balance between Fundamental Rights and DPSPs, free and fair elections, and limited power of Parliament to amend.",
        keyPoints: [
          "Supremacy of the Constitution",
          "Republican and democratic form of government",
          "Secular character of the Constitution",
          "Separation of powers between legislature, executive, and judiciary",
          "Federal character of the Constitution",
          "Judicial review (L. Chandra Kumar case, 1997)",
          "Rule of law",
          "Harmony between Fundamental Rights and DPSPs"
        ]
      },
      {
        heading: "Significance and Impact",
        content: "The Basic Structure Doctrine has been reaffirmed in several subsequent cases including Indira Nehru Gandhi v. Raj Narain (1975), Minerva Mills v. Union of India (1980), Waman Rao v. Union of India (1981), and I.R. Coelho v. State of Tamil Nadu (2007). It prevents the Parliament from misusing its amending power to establish an authoritarian regime. It ensures that the fundamental identity and character of the Constitution is preserved while allowing flexibility for necessary changes.",
        keyPoints: [
          "Prevents authoritarian misuse of amending power",
          "Preserves constitutional identity",
          "Reaffirmed in Minerva Mills (1980) and I.R. Coelho (2007)",
          "Acts as a check on Parliamentary sovereignty",
          "Ensures judicial supremacy in constitutional interpretation",
          "Has been exported to other countries (Bangladesh, Pakistan, Malaysia)"
        ]
      }
    ]
  }
];

export const groupedTopics = {
  Basic: detailedTopics.filter(t => t.difficulty === "Basic"),
  Intermediate: detailedTopics.filter(t => t.difficulty === "Intermediate"),
  Advanced: detailedTopics.filter(t => t.difficulty === "Advanced"),
};