export const profile = {
  name: "Pintu Saini", // TODO: replace with your name
  title: "Backend Engineer — Distributed Systems & AI Infrastructure",
  location: "Bangalore, India",
  tagline:
    "I build backend systems that hold up under load — and lately, the AI pipelines that sit on top of them.",
  email: "pintusaininch2018@gmail.com", // TODO
  github: "https://github.com/pintu1803", // TODO
  linkedin: "https://linkedin.com/in/pinsaini-in", // TODO
  githubUsername: "pintu1803", // TODO — used for the GitHub stats card
};

export const stats = [
  { label: "Years Experience", value: "4+" },
  { label: "Companies", value: "2" },
  { label: "Based In", value: "Bangalore" },
];

export const projects = [
  {
    name: "Interview Assist — Java RAG Prep Tool",
    status: "In Progress",
    link: "", // TODO: repo/live link
    tagline:
      "Ask it a Java interview question. Get an answer, references, and a follow-up.",
    description:
      "A retrieval-augmented generation pipeline built for Java interview prep. Documents are chunked, embedded, and indexed for hybrid retrieval; incoming questions run through a query rewriter, parallel BM25 + vector search, and a cross-encoder reranker before the top candidates reach the LLM, which returns an answer, source references, and a follow-up question.",
    tech: [
      "Python",
      "BM25",
      "Vector Search (HNSW)",
      "Cross-Encoder Reranking",
      "Gemini",
      "Groq",
    ],
    why: "Built to go deeper than flashcards — every answer is grounded in real source material, not model memory alone.",
  },
  {
    name: "Your Next Project",
    status: "Planned",
    link: "",
    tagline: "",
    description: "// TODO: add your next project here.",
    tech: [],
    why: "",
  },
];

export const experience = [
  {
    company: "Oracle",
    link: "https://www.oracle.com",
    role: "Senior Member of Technical Staff (IC-3)",
    dates: "Jun 2022 — Apr 2026",
    blurb: "Enterprise software and cloud infrastructure at global scale.",
    tech: ["Java", "Microservices", "Distributed Systems", "Jenkins", "Selenium"],
    achievement: "// TODO: add a specific, measurable achievement from this role",
  },
  {
    company: "GEP Solutions",
    link: "",
    role: "Software Engineer Intern",
    dates: "May 2021 — Jul 2021",
    blurb: "Procurement and supply chain software.",
    tech: ["Java", "Python"],
    achievement: "// TODO: add a specific achievement from this internship",
  },
];

export const exploring = [
  {
    title: "Retrieval-Augmented Generation",
    blurb:
      "Hybrid search, rerankers, and grounding LLM answers in real source documents.",
  },
  {
    title: "Distributed Systems",
    blurb:
      "Microservices, Kafka-based event pipelines, and Redis for fast, consistent state.",
  },
  {
    title: "Test Automation at Scale",
    blurb:
      "Selenium and CI pipelines that catch regressions before they reach production.",
  },
  {
    title: "LLM-Backed Tooling",
    blurb: "Using Gen AI as an engineering tool, not just a chat interface.",
  },
];
