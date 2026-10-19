export interface SkillElement {
  num: string;
  sym: string;
  name: string;
  family: string;
  note: string;
  usedIn: string[];
  isRecent?: boolean;
}

export interface Project {
  id: string;
  num: string;
  title: string;
  kicker: string;
  desc: string;
  features: string[];
  techStack: string[];
  diagramType: "devagent" | "rag" | "kukufun" | "apimonitor";
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  id: string;
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  kind: "Experience" | "Education";
  bullets: string[];
}

export interface Achievement {
  id: string;
  label: string;
  cap: string;
  detail: string;
  num: string;
  suffix?: string;
}

export const PERSONAL_INFO = {
  name: "Satyam Kumar",
  title: "Software Engineer & AI Engineer",
  avatar: "/my_image.jpeg",
  location: "Delhi, India",
  headline: "Software Engineer · MapmyIndia",
  shortBio:
    "Software Engineer with ~1 year of experience building event-driven, real-time systems in Node.js and TypeScript, now focused on Agentic AI and GenAI engineering. Built RAG pipelines with hybrid search and contextual compression, and multi-agent systems using LangGraph.",
  fullBio:
    "Software Engineer (Backend / Full-Stack) at MapmyIndia with ~1 year of hands-on experience building event-driven, high-concurrency real-time systems. Currently focused on Agentic AI and GenAI engineering — architecting autonomous supervisor-specialist multi-agent workflows using LangGraph and high-precision RAG pipelines with hybrid search, contextual compression, and vector embeddings in Pinecone and ChromaDB. Strong data structures and algorithms foundation with 600+ problems solved across competitive platforms.",
  email: "satyamkmr37@gmail.com",
  phone: "+91 9582906377",
  github: "https://github.com/satyamk001",
  linkedin: "https://linkedin.com/in/satyamk001",
  currentCompany: "MapmyIndia",
  educationDegree: "B.Tech in Electronics & Communication Engineering",
  educationSchool: "Maharaja Surajmal Institute of Technology, Delhi",
  cgpa: "7.9",
  dsaCount: "600+",
};

export const SKILL_FAMILIES = [
  "All",
  "Agentic AI & GenAI",
  "Languages",
  "Backend Systems",
  "Frontend",
  "Databases & Cloud",
] as const;

export const SKILLS_LIST: SkillElement[] = [
  // Agentic AI & GenAI
  {
    num: "01",
    sym: "Lg",
    name: "LangGraph",
    family: "Agentic AI & GenAI",
    note: "Supervisor, Specialists, Map-Reduce & Send API",
    usedIn: ["DevAgent"],
    isRecent: true,
  },
  {
    num: "02",
    sym: "Lc",
    name: "LangChain",
    family: "Agentic AI & GenAI",
    note: "Chains, Ingestion & Document Loaders",
    usedIn: ["Company Docs Assistant"],
    isRecent: true,
  },
  {
    num: "03",
    sym: "Rg",
    name: "RAG Pipelines",
    family: "Agentic AI & GenAI",
    note: "Hybrid search, multi-query & contextual compression",
    usedIn: ["Company Docs Assistant"],
    isRecent: true,
  },
  {
    num: "04",
    sym: "Ma",
    name: "Multi-Agent Systems",
    family: "Agentic AI & GenAI",
    note: "Supervisor-worker, parallel fan-out & state reduction",
    usedIn: ["DevAgent"],
    isRecent: true,
  },
  {
    num: "05",
    sym: "Tc",
    name: "Tool Calling (ReAct)",
    family: "Agentic AI & GenAI",
    note: "File ops, pytest runner, bash execution & linting",
    usedIn: ["DevAgent"],
    isRecent: true,
  },
  {
    num: "06",
    sym: "Pc",
    name: "Pinecone",
    family: "Agentic AI & GenAI",
    note: "Managed vector index & top-k similarity search",
    usedIn: ["Company Docs Assistant"],
  },
  {
    num: "07",
    sym: "Cr",
    name: "ChromaDB",
    family: "Agentic AI & GenAI",
    note: "Embedding storage & nearest neighbor retrieval",
    usedIn: ["DevAgent", "Company Docs Assistant"],
  },
  {
    num: "08",
    sym: "Ls",
    name: "LangSmith",
    family: "Agentic AI & GenAI",
    note: "LLM tracing, observability & run debugging",
    usedIn: ["DevAgent"],
    isRecent: true,
  },
  {
    num: "09",
    sym: "Ev",
    name: "LLM Evals",
    family: "Agentic AI & GenAI",
    note: "Ground truth scoring & automated test sets",
    usedIn: ["DevAgent", "Company Docs Assistant"],
  },

  // Languages
  {
    num: "10",
    sym: "Ts",
    name: "TypeScript",
    family: "Languages",
    note: "Strict typing, generics & backend contracts",
    usedIn: ["MapmyIndia", "KuKu Fun", "DevAgent"],
    isRecent: true,
  },
  {
    num: "11",
    sym: "Js",
    name: "JavaScript",
    family: "Languages",
    note: "ESNext, asynchronous event loops & V8 internals",
    usedIn: ["MapmyIndia", "Comely Enterprises", "KuKu Fun"],
  },
  {
    num: "12",
    sym: "Py",
    name: "Python",
    family: "Languages",
    note: "AsyncIO, LangGraph, FastAPI & pytest",
    usedIn: ["DevAgent"],
    isRecent: true,
  },
  {
    num: "13",
    sym: "Cp",
    name: "C++",
    family: "Languages",
    note: "Data structures, algorithms & memory awareness",
    usedIn: ["600+ DSA Solutions"],
  },
  {
    num: "14",
    sym: "Sq",
    name: "SQL",
    family: "Languages",
    note: "Complex joins, indexing & query plan optimization",
    usedIn: ["MapmyIndia", "Comely Enterprises", "KuKu Fun"],
  },

  // Backend Systems
  {
    num: "15",
    sym: "No",
    name: "Node.js",
    family: "Backend Systems",
    note: "Event loop, streams & microservice workers",
    usedIn: ["MapmyIndia", "KuKu Fun", "API Monitoring Platform"],
    isRecent: true,
  },
  {
    num: "16",
    sym: "Ex",
    name: "Express.js",
    family: "Backend Systems",
    note: "High-throughput RESTful routing & middleware",
    usedIn: ["MapmyIndia", "Comely Enterprises"],
  },
  {
    num: "17",
    sym: "Ns",
    name: "NestJS",
    family: "Backend Systems",
    note: "Enterprise modular architecture & DI",
    usedIn: ["MapmyIndia"],
  },
  {
    num: "18",
    sym: "Fa",
    name: "FastAPI",
    family: "Backend Systems",
    note: "High-speed async Python REST services",
    usedIn: ["DevAgent"],
  },
  {
    num: "19",
    sym: "Ed",
    name: "Event-Driven",
    family: "Backend Systems",
    note: "Publisher-subscriber & async message workers",
    usedIn: ["API Monitoring Platform", "KuKu Fun"],
  },
  {
    num: "20",
    sym: "Ms",
    name: "Microservices",
    family: "Backend Systems",
    note: "Service discovery, decoupled domains & gateway",
    usedIn: ["MapmyIndia", "API Monitoring Platform"],
  },
  {
    num: "21",
    sym: "Ra",
    name: "REST APIs",
    family: "Backend Systems",
    note: "Idempotent endpoints, rate limits & OpenAPI",
    usedIn: ["MapmyIndia", "Comely Enterprises"],
  },

  // Frontend
  {
    num: "22",
    sym: "Ng",
    name: "Angular",
    family: "Frontend",
    note: "Component hierarchy, RxJS streams & services",
    usedIn: ["Comely Enterprises", "API Monitoring Platform"],
  },
  {
    num: "23",
    sym: "Re",
    name: "React.js",
    family: "Frontend",
    note: "Hooks, concurrent rendering & state management",
    usedIn: ["KuKu Fun", "Portfolio"],
  },
  {
    num: "24",
    sym: "Nx",
    name: "Next.js",
    family: "Frontend",
    note: "App router, SSR, server components & edge routes",
    usedIn: ["KuKu Fun", "Portfolio"],
    isRecent: true,
  },

  // Databases & Cloud
  {
    num: "25",
    sym: "Kf",
    name: "Apache Kafka",
    family: "Databases & Cloud",
    note: "SASL/TLS, distributed partitions & consumer groups",
    usedIn: ["KuKu Fun"],
    isRecent: true,
  },
  {
    num: "26",
    sym: "Rm",
    name: "RabbitMQ",
    family: "Databases & Cloud",
    note: "Exchanges, Dead Letter Queues & Circuit Breakers",
    usedIn: ["API Monitoring Platform"],
  },
  {
    num: "27",
    sym: "Rd",
    name: "Redis",
    family: "Databases & Cloud",
    note: "Sliding-window rate limiter, task queue & pub/sub",
    usedIn: ["MapmyIndia", "KuKu Fun", "Comely Enterprises"],
    isRecent: true,
  },
  {
    num: "28",
    sym: "Pg",
    name: "PostgreSQL",
    family: "Databases & Cloud",
    note: "Relational modeling, transactions & indexes",
    usedIn: ["KuKu Fun"],
  },
  {
    num: "29",
    sym: "My",
    name: "MySQL",
    family: "Databases & Cloud",
    note: "Normalized schemas, replication & pooling",
    usedIn: ["Comely Enterprises"],
  },
  {
    num: "30",
    sym: "Mg",
    name: "MongoDB",
    family: "Databases & Cloud",
    note: "Document aggregation pipelines & TTL indexes",
    usedIn: ["API Monitoring Platform"],
  },
  {
    num: "31",
    sym: "Dk",
    name: "Docker",
    family: "Databases & Cloud",
    note: "Multi-stage builds, container networks & compose",
    usedIn: ["API Monitoring Platform", "DevAgent"],
  },
  {
    num: "32",
    sym: "Ws",
    name: "Socket.IO",
    family: "Databases & Cloud",
    note: "WebSockets with Redis adapter for horizontal scale",
    usedIn: ["KuKu Fun"],
  },
];

export const PROJECTS_LIST: Project[] = [
  {
    id: "devagent",
    num: "01",
    title: "DevAgent",
    kicker: "Autonomous Multi-Agent System",
    desc: "Supervisor-based multi-agent coding assistant built on LangGraph. A Supervisor agent dynamically triages programming objectives and orchestrates Planner, Coder, and Reviewer/Tester specialists, handling automatic failure recovery loops until all pytest suites pass.",
    features: [
      "Supervisor orchestrator with dynamic delegation and retry loop back to Coder on test failures",
      "Real tool execution via ReAct pattern: file I/O, automated pytest runners, and AST linting",
      "LangGraph Send API for parallel multi-file fan-out with map-reduce state aggregation",
      "Persistent state checkpointing for resumable runs and human-in-the-loop review checkpoints",
      "Full observability with LangSmith tracing for token usage and latency profiling",
    ],
    techStack: [
      "LangGraph",
      "Python",
      "Tool Calling",
      "pytest",
      "LangSmith",
      "FastAPI",
    ],
    diagramType: "devagent",
    githubUrl: "https://github.com/satyamk001",
  },
  {
    id: "company-docs-assistant",
    num: "02",
    title: "Company Docs Assistant",
    kicker: "Enterprise RAG Chatbot",
    desc: "Production-grade RAG chatbot for internal document synthesis. Features an end-to-end PDF ingestion pipeline with recursive chunking, custom Gemini embedding adapters, and a Pinecone vector index upgraded with hybrid search and contextual compression.",
    features: [
      "Automated PDF document ingestion pipeline using PDFLoader and recursive character chunking",
      "Custom adapter for Google Gemini embeddings indexed directly in Pinecone vector database",
      "Upgraded retrieval accuracy via hybrid search (dense + sparse) and multi-query reformulation",
      "Contextual compression layer eliminating irrelevant passages before model prompting",
      "Grounded source attribution utilizing Groq-hosted Llama 3.3 70B for near-instant inference",
    ],
    techStack: [
      "Node.js",
      "LangChain",
      "Pinecone",
      "Gemini Embeddings",
      "Groq",
      "Llama 3.3 70B",
    ],
    diagramType: "rag",
    githubUrl: "https://github.com/satyamk001",
  },
  {
    id: "kuku-fun",
    num: "03",
    title: "KuKu Fun",
    kicker: "Distributed Real-Time Chat Engine",
    desc: "High-scale real-time communication platform engineered with Next.js, Node.js, and Socket.IO. Powered by a Redis adapter for distributed presence and room routing across clustered server instances, backed by Apache Kafka for asynchronous processing.",
    features: [
      "Horizontally scalable Socket.IO messaging with Redis pub/sub adapter across multiple nodes",
      "Apache Kafka (SASL/TLS) message broker for asynchronous DM pipeline and offline notifications",
      "Graceful degradation pattern: direct socket delivery fallback when Kafka broker is unreachable",
      "Sliding-window rate limiter in Redis enforcing 30 DMs per 10-second window per user",
      "Relational schema in PostgreSQL with 5-minute Redis caching for frequent user profiles",
    ],
    techStack: [
      "Next.js",
      "Node.js",
      "Socket.IO",
      "PostgreSQL",
      "Redis",
      "Apache Kafka",
    ],
    diagramType: "kukufun",
    githubUrl: "https://github.com/satyamk001",
  },
  {
    id: "api-monitoring",
    num: "04",
    title: "API Monitoring & Analytics",
    kicker: "Resilient SaaS Architecture",
    desc: "Event-driven SaaS monitoring infrastructure designed for microservice health analysis. Utilizes RabbitMQ producer-consumer topology with built-in circuit breakers, retry strategies, and Dead Letter Queues delivering 99.9% message durability under peak traffic.",
    features: [
      "Event-driven RabbitMQ producer-consumer topology with topic exchange routing",
      "Circuit Breaker pattern preventing cascade failures during downstream service outages",
      "Dead Letter Queues (DLQ) and exponential backoff retry policy yielding 99.9% message durability",
      "Time-series analytics storage in MongoDB with TTL indexing for automated log expiry",
      "Fully containerized infrastructure orchestrated through multi-container Docker Compose",
    ],
    techStack: [
      "Angular",
      "Node.js",
      "RabbitMQ",
      "MongoDB",
      "Docker",
      "REST APIs",
    ],
    diagramType: "apimonitor",
    githubUrl: "https://github.com/satyamk001",
  },
];

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: "exp-msit",
    year: "2021",
    period: "Dec 2021 — May 2025",
    role: "B.Tech in Electronics & Communication Engineering",
    company: "Maharaja Surajmal Institute of Technology (MSIT)",
    location: "Delhi, India",
    kind: "Education",
    bullets: [
      "Graduated with 7.9 CGPA, focusing on signal processing, embedded systems, and core computer science fundamentals.",
      "Solved 600+ problems across LeetCode and GeeksforGeeks, cultivating deep algorithmic problem-solving capabilities in C++ and Python.",
    ],
  },
  {
    id: "exp-comely",
    year: "2025",
    period: "Jan 2025 — May 2025",
    role: "Full Stack Developer Intern",
    company: "Comely Enterprises Pvt. Ltd.",
    location: "Delhi, India",
    kind: "Experience",
    bullets: [
      "Built and maintained scalable cross-platform web and mobile applications using Angular, AngularJS, React Native, Express.js, Redis, and MySQL.",
      "Improved development team delivery efficiency by 25% through modular, reusable component patterns.",
      "Designed and deployed secure RESTful APIs with Node.js and Express.js, reducing response times by 30% and ensuring high reliability under concurrent load.",
    ],
  },
  {
    id: "exp-mapmyindia",
    year: "2025",
    period: "July 2025 — Present",
    role: "Associate Software Developer",
    company: "MapmyIndia",
    location: "Delhi, India",
    kind: "Experience",
    bullets: [
      "Applied security best practices including input validation, error handling, and modular architecture to improve system resilience and code maintainability.",
      "Optimized frontend and backend pipelines, achieving 40% faster page loads and dramatically reducing server error rates.",
      "Implemented Redis for temporary data caching and asynchronous task queuing, offloading query load from core relational databases.",
    ],
  },
];

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: "ach-1",
    label: "DSA Problems Solved",
    cap: "Algorithmic Foundation",
    detail: "LeetCode & GFG: Graphs, Dynamic Programming, Trees & Systems",
    num: "600",
    suffix: "+",
  },
  {
    id: "ach-2",
    label: "Page Load Speedup",
    cap: "MapmyIndia Pipelines",
    detail: "Optimized frontend & backend pipelines with 40% faster load times",
    num: "40",
    suffix: "%",
  },
  {
    id: "ach-3",
    label: "Message Durability",
    cap: "RabbitMQ Event Architecture",
    detail: "Circuit breakers, retry mechanisms and Dead Letter Queues",
    num: "99.9",
    suffix: "%",
  },
  {
    id: "ach-4",
    label: "Latency Reduction",
    cap: "Comely Enterprises APIs",
    detail: "Optimized RESTful services, Redis caching and query indexing",
    num: "30",
    suffix: "%",
  },
  {
    id: "ach-5",
    label: "Autonomous Agents",
    cap: "DevAgent Architecture",
    detail: "Supervisor, Planner, Coder & Reviewer coordinated via LangGraph",
    num: "4",
  },
  {
    id: "ach-6",
    label: "Sliding-Window Protection",
    cap: "KuKu Fun Messaging Rate Limit",
    detail: "30 DMs per 10-second window Redis limiter with Kafka streaming",
    num: "30",
    suffix: "/10s",
  },
];
