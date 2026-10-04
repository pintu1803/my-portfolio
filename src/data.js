const githubUsername = "pintu1803";
const linkedinuser = "pinsaini-in";
const xuser = "okpintuok";
const yourName = "Pintu Saini";
const title = "AI/ML Engineer | Backend Developer | Distributed Systems";
const location = "Bangalore, India";

export const profile = {
  name: yourName, // TODO: replace with your name
  title: title,
  location: location,
  tagline:
    "I build backend systems that hold up under load — and lately, the AI pipelines that sit on top of them.",
  email: "pintusaininch2018@gmail.com", // TODO
  githubUsername,
  github: `https://github.com/${githubUsername}`,
  linkedin: `https://linkedin.com/in/${linkedinuser}`, 
  x: `https://x.com/${xuser}`
};

export const stats = [
  { label: "Years Experience", value: "4+" },
  { label: "Companies", value: "3" },
  { label: "Based In", value: "Bangalore" },
];

export const projects = [
  {
    name: "Prism - Java Interview Assistant",
    category: "Gen AI",
    status: "Live | AWS Hosted",
    link: "https://senylabs.vercel.app/",
    tagline:
      "Ask it a Java interview question. Get an answer, a follow-up and get the QnA transcript shared over mail.",
    description:
      "A retrieval-augmented generation pipeline built for Java interview prep. Documents are chunked, embedded, and indexed for hybrid retrieval; incoming questions run through a query rewriter, vector search, and a cross-encoder reranker before the top candidates reach the LLM, which returns an answer, and a follow-up question.",
    tech: [
      "Python",
      "pytorch",
      "embeddings",
      "chromaDB",
      "Vector Search (HNSW)",
      "Cross-Encoder Reranking",
      "Gemini",
      "Groq",
      "fastapi",
      "react",
      "aws"
    ],
    why: "Built to go deeper than flashcards — every answer is grounded in real source material, not model memory alone.",
  },
  {
    name: "Mahārāj - Indian Food Image Classifier",
    category: "Computer Vision",
    status: "Live | Render Hosted",
    link: "https://foodplateai.vercel.app/",
    tagline:
      "Upload an image of an Indian dish and instantly identify it with AI.",
    description:
      "An end-to-end computer vision application that classifies Indian food images using a fine-tuned ResNet18 model trained with transfer learning. The system exposes a FastAPI inference backend, serves predictions through a React frontend, and returns the predicted dish along with confidence scores and Top-K results. Optimized for CPU deployment and hosted on Render with a Vercel frontend.",
    tech: [
      "Python",
      "PyTorch",
      "Transfer Learning",
      "ResNet18",
      "Computer Vision",
      "FastAPI",
      "React",
      "Vite",
      "Render",
      "Vercel"
    ],
    why:
      "Built to demonstrate practical deep learning by solving a real image classification problem—from data preprocessing and model training to production deployment with a scalable inference API.",
  },
{
  name: "Damyanti",
  category: "Voice AI",
  status: "Planned",
  link: "",
  tagline: "A real-time multimodal AI companion that listens, understands, and responds naturally.",
  description:
    "A voice-first AI assistant designed for natural conversations. Damyanti will help users with interview preparation, technology, health guidance, and everyday conversations through low-latency, human-like interactions.",
  tech: [
    "Python",
    "Speech AI",
    "Automatic Speech Recognition (ASR)",
    "Text-to-Speech (TTS)",
    "Large Language Models",
    "FastAPI",
    "WebSockets",
    "React",
    "AWS"
  ],
  why:
    "Built to explore real-time conversational AI by combining speech, reasoning, and retrieval into a single intelligent assistant capable of natural, context-aware dialogue.",
},
];

export const experience = [
  {
    company: "Ethera Diamonds",
    link: "https://etheradiamonds.com/",
    logo: "/logo/ethera.jpg",
    role: "Senior Backend Developer",
    dates: "Sept 2026 — Active",
    blurb: "Lab grown diamonds jewellery.",
    tech: ["Go", "Python", "Java"],
    bullets: [
      "Shipping production features at very high pace",
      "Engineering Dev Testing framework for feature testing",
      "Building QA Testing framework for assuring the production quality"
    ],
  },
  {
    company: "Oracle",
    link: "https://www.oracle.com",
    logo: "/logo/oracle.svg", // put the file in public/logos/ (falls back to an initial tile if missing)
    role: "Senior Member of Technical Staff (IC-3)",
    dates: "Jun 2022 — Apr 2026",
    blurb: "Enterprise software and cloud infrastructure at global scale.",
    tech: ["Java", "Restful API", "Microservices", "Distributed Systems", "CI/CD", "Automation"],
    // First bullet is always visible; the rest expand on click. Add your measurable wins here.
    bullets: [
      "Designed client side exascale cloud APIs for managing storage resources",
      "Redesigned the volume backup composite API to eliminate redundant double data-copy",
      "Designed and implemented idempotency for create and update APIs using client-supplied idempotency tokens",
      "Spearheaded the design and implementation of the multi-tenant ACFS Mount API, enabling cross-tenancy mounting.",
      " Participated in on-call (SRE/DevOps) rotations to support production systems",
      "Led onboarding of new engineers by conducting knowledge transfer (KT) sessions on system architecture."
    ],
  },
  {
    company: "GEP Solutions",
    link: "https://www.gep.com/",
    logo: "/logo/gep.png",
    role: "Software Engineer Intern",
    dates: "May 2021 — Jul 2021",
    blurb: "Procurement and supply chain software.",
    tech: ["Java", "Python"],
    bullets: [
      "Optimized high-traffic REST APIs using pagination and response filtering",
      "Improved database query performance by implementing strategic indexing and query optimization",
      "Received a pre-placement offer (PPO).",
    ],
  },
];

export const exploring = [
  {
    title: "Progressively Arriving At",
    keywords: ["Tool calling", "ReAct agents", "LangGraph", "Memory systems", "Agentic RAG", "MCP"],
  },
  {
    title: "Speech AI",
    keywords: ["ASR", "Spectrogram", "Fourier Transform", "Nyquist theorem", "Streaming ASR"],
  },
  {
    title: "Advance Vision AI",
    keywords: ["Object detection", "Image segmentation", "OCR", "Image captioning", "VQA", "VLM", "Image Generation"],
  },
  {
    title: "Retrieval-Augmented Generation",
    keywords: ["Better chunking", "Hybrid search", "Rerankers", "Grounded LLM answers"],
  },
  {
    title: "LLM-Backed Tooling",
    keywords: ["Gen AI as an engineering tool"],
  },
  {
    title: "Distributed Systems",
    keywords: ["Microservices", "Kafka event pipelines", "Redis"],
  },
  {
    title: "Test Automation at Scale",
    keywords: ["Selenium", "CI pipelines", "Regression testing"],
  },
];