// The long form of each piece of work, shown when its card opens: what it is and how it works,
// the C4 diagrams, the languages and the full stack, and its screenshots. Every sentence traces
// to cv.md or to the work's own repository; numbers are copied from content.ts word for word.

export type C4Kind =
  | "person"
  | "system"
  | "external"
  | "container"
  | "database";
export type C4Node = {
  id: string;
  kind: C4Kind;
  label: string;
  desc?: string;
  tech?: string;
  layer: number;
};
export type C4Edge = {
  from: string;
  to: string;
  label?: string;
  tech?: string;
};
export type C4View = { system?: string; nodes: C4Node[]; edges: C4Edge[] };

export type Shot = {
  src: string;
  alt: string;
  caption?: string;
  position?: string;
};

export type Deep = {
  overview: string[];
  /** share of the code by language, from GitHub's language stats (percent) */
  languages?: { name: string; share?: number }[];
  stack: { group: string; items: string[] }[];
  c4?: { context?: C4View | null; containers?: C4View | null } | null;
  gallery?: Shot[];
};

export const deep: Record<string, Deep> = {
  "adobe-ambassador": {
    overview: [
      "Adobe's Software Engineer Ambassador from Jun to Dec 2025: he trained students on Adobe's AI tools.",
      "In hands-on workshops, he trained students on Firefly, Photoshop and Premiere Pro.",
      "He trained 500+ students across North America. With his Intel ambassador role, that makes 1,500+ students taught.",
    ],
    stack: [
      {
        group: "AI and data",
        items: ["Adobe Firefly", "Photoshop", "Premiere Pro"],
      },
    ],
    c4: null,
  },
  agentgym: {
    overview: [
      "AgentGym is a self-improving layer for AI agents. It sits between an agent and its model provider, learns from the agent's failures, and needs no change to the agent's code.",
      "The agent sends its model calls to AgentGym's proxy, which logs every step of every run. A filter scores each run and sends the useful failures to AgentHER, a hindsight step that asks which goal the run did reach and turns it into a better and a worse answer, and two models from different providers must both approve each pair. Self-hosted models then train on the pairs with DPO, and models behind a closed API get an improved system prompt instead.",
      "Anass designed and built the framework: the proxy, the filter and relabeling pipeline, the training backends, the background workers and a Next.js dashboard. Against the base agent without the loop, task success rose 38% on computer-use and repeated tasks, measured on 24,000 traces, and compute cost fell 98%.",
    ],
    languages: [
      {
        name: "Python",
        share: 88,
      },
      {
        name: "TypeScript",
        share: 12,
      },
    ],
    stack: [
      {
        group: "Front end",
        items: [
          "Next.js 14",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Recharts",
          "Zustand",
        ],
      },
      {
        group: "Back end",
        items: [
          "Python",
          "FastAPI",
          "Uvicorn",
          "Pydantic",
          "SQLAlchemy (async)",
          "Alembic",
          "Celery",
          "Server-Sent Events",
          "OpenTelemetry",
          "httpx",
        ],
      },
      {
        group: "AI and data",
        items: [
          "DPO with TRL",
          "Hindsight Experience Replay (AgentHER)",
          "Automatic prompt optimization",
          "PyTorch",
          "sentence-transformers",
          "NumPy",
          "SciPy (Mantel test)",
          "vLLM (LoRA hot reload)",
          "Atropos",
          "Verl (optional)",
          "Anthropic API",
          "AutoGen",
          "CrewAI",
          "LangChain",
        ],
      },
      {
        group: "Infrastructure",
        items: [
          "PostgreSQL",
          "pgvector",
          "Redis Streams",
          "Docker",
          "Docker Compose",
        ],
      },
      {
        group: "Tooling and testing",
        items: [
          "pytest",
          "pytest-asyncio",
          "Jest",
          "React Testing Library",
          "Ruff",
          "Make",
        ],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "dev",
            kind: "person",
            label: "Agent developer",
            desc: "Builds agents, watches them improve",
            layer: 0,
          },
          {
            id: "agent",
            kind: "external",
            label: "AI agent",
            desc: "AutoGen, CrewAI or LangChain agent",
            layer: 1,
          },
          {
            id: "agentgym",
            kind: "system",
            label: "AgentGym",
            desc: "Turns agent failures into training data",
            layer: 1,
          },
          {
            id: "llm",
            kind: "external",
            label: "Model providers",
            desc: "Answer agent calls, check relabeled pairs",
            layer: 2,
          },
          {
            id: "trainer",
            kind: "external",
            label: "Training servers",
            desc: "Atropos and vLLM for self-hosted models",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "dev",
            to: "agent",
            label: "Builds and runs",
          },
          {
            from: "dev",
            to: "agentgym",
            label: "Watches the dashboard",
          },
          {
            from: "agent",
            to: "agentgym",
            label: "Sends model calls",
          },
          {
            from: "agentgym",
            to: "llm",
            label: "Forwards calls, verifies pairs",
          },
          {
            from: "agentgym",
            to: "trainer",
            label: "Sends DPO jobs",
          },
        ],
      },
      containers: {
        system: "agentgym",
        nodes: [
          {
            id: "dev",
            kind: "person",
            label: "Agent developer",
            desc: "Reviews runs and training jobs",
            layer: 0,
          },
          {
            id: "agent",
            kind: "external",
            label: "AI agent",
            tech: "AutoGen, CrewAI, LangChain",
            desc: "Points its base URL at AgentGym",
            layer: 1,
          },
          {
            id: "api",
            kind: "container",
            label: "Proxy and API",
            tech: "FastAPI",
            desc: "Logs every call, serves REST and SSE",
            layer: 1,
          },
          {
            id: "dashboard",
            kind: "container",
            label: "Dashboard",
            tech: "Next.js",
            desc: "Runs, scores, training jobs, costs",
            layer: 1,
          },
          {
            id: "workers",
            kind: "container",
            label: "Pipeline workers",
            tech: "Celery",
            desc: "Filter, relabel, verify and train",
            layer: 2,
          },
          {
            id: "db",
            kind: "database",
            label: "Trajectory store",
            tech: "Postgres, pgvector",
            desc: "Runs, steps, pairs, policy versions",
            layer: 3,
          },
          {
            id: "redis",
            kind: "database",
            label: "Event streams",
            tech: "Redis Streams",
            desc: "Task queues and live events",
            layer: 3,
          },
          {
            id: "llm",
            kind: "external",
            label: "Model providers",
            tech: "HTTPS",
            desc: "Upstream models and verifier models",
            layer: 3,
          },
          {
            id: "trainer",
            kind: "external",
            label: "Training servers",
            tech: "Atropos, vLLM",
            desc: "DPO on LoRA, hot reload",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "dev",
            to: "dashboard",
            label: "Reviews runs",
          },
          {
            from: "agent",
            to: "api",
            label: "Model calls",
            tech: "HTTP /v1",
          },
          {
            from: "api",
            to: "llm",
            label: "Forwards calls",
            tech: "HTTPS",
          },
          {
            from: "api",
            to: "db",
            label: "Writes spans",
            tech: "asyncpg",
          },
          {
            from: "api",
            to: "redis",
            label: "Publishes events",
            tech: "Redis Streams",
          },
          {
            from: "dashboard",
            to: "api",
            label: "Reads data, live updates",
            tech: "REST, SSE",
          },
          {
            from: "workers",
            to: "redis",
            label: "Takes tasks",
            tech: "Celery",
          },
          {
            from: "workers",
            to: "db",
            label: "Reads runs, writes pairs",
            tech: "asyncpg",
          },
          {
            from: "workers",
            to: "llm",
            label: "Classify, relabel, verify",
            tech: "HTTPS",
          },
          {
            from: "workers",
            to: "trainer",
            label: "DPO jobs, adapter reload",
            tech: "HTTP",
          },
        ],
      },
    },
  },
  "architecture-rag-agent": {
    overview: [
      "An AI agent for an architecture firm that checks building designs against the building code and the Quebec building code.",
      "The architect asks whether a design follows the rules. The agent uses RAG (retrieval-augmented generation: it first finds the relevant rules, then answers from them) to search tens of thousands of rules, and it replies in under 1 second. So the architect knows right away when a design breaks a rule.",
      "He built it for the firm as one of his client projects. He scoped it with them in a design doc, visited their office to see how the architects work, and iterated with them over a week. It runs on the same stack as his Linea project, with the retrieval layer written in Rust so rule lookups come back faster.",
    ],
    languages: [
      {
        name: "Rust",
      },
      {
        name: "Python",
      },
    ],
    stack: [
      {
        group: "Back end",
        items: ["Rust (retrieval layer)"],
      },
      {
        group: "AI and data",
        items: ["RAG", "AI agent"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "architect",
            kind: "person",
            label: "Architect",
            desc: "Checks a design against the code",
            layer: 0,
          },
          {
            id: "agent",
            kind: "system",
            label: "Building-code agent",
            desc: "Answers code questions in under 1 second",
            layer: 1,
          },
          {
            id: "code",
            kind: "external",
            label: "Building code",
            desc: "Rules a design must follow",
            layer: 2,
          },
          {
            id: "qccode",
            kind: "external",
            label: "Quebec building code",
            desc: "Quebec's own building rules",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "architect",
            to: "agent",
            label: "Asks about a design",
          },
          {
            from: "agent",
            to: "code",
            label: "Searches its rules",
          },
          {
            from: "agent",
            to: "qccode",
            label: "Searches its rules",
          },
        ],
      },
      containers: {
        system: "agent",
        nodes: [
          {
            id: "architect",
            kind: "person",
            label: "Architect",
            desc: "Checks a design against the code",
            layer: 0,
          },
          {
            id: "agentc",
            kind: "container",
            label: "AI agent",
            tech: "RAG",
            desc: "Finds rules, then answers",
            layer: 1,
          },
          {
            id: "rules",
            kind: "database",
            label: "Rule index",
            tech: "Rust retrieval",
            desc: "Tens of thousands of code rules",
            layer: 3,
          },
          {
            id: "code",
            kind: "external",
            label: "Building code",
            desc: "Rules a design must follow",
            layer: 3,
          },
          {
            id: "qccode",
            kind: "external",
            label: "Quebec building code",
            desc: "Quebec's own building rules",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "architect",
            to: "agentc",
            label: "Asks about a design",
          },
          {
            from: "agentc",
            to: "rules",
            label: "Retrieves matching rules",
            tech: "RAG",
          },
          {
            from: "code",
            to: "rules",
            label: "Rules taken from",
          },
          {
            from: "qccode",
            to: "rules",
            label: "Rules taken from",
          },
        ],
      },
    },
  },
  "cherry-blossom": {
    overview: [
      "Cherry Blossom is a circuit-board design tool: you describe a board in plain English and Sakura, its AI agent, designs it in the browser or in the desktop app. It is for hardware engineers, makers and students who want a checked board without deep design-tool experience.",
      "Sakura finds real parts, reads datasheets and draws the schematic, then asks before it places and routes the board. Every AI edit is checked, and a Checks panel runs design-rule checks before export. The board exports as Gerbers, drill files, a BOM, pick-and-place files, a STEP model, an editable KiCad project or open Circuit JSON, ready for any board house. Other AI apps, like Claude or Cursor, can use the same design tools through its MCP server.",
      "Cherry Blossom is a project Anass built on the open-source tscircuit stack: he wrote its backend logic in TypeScript on Convex, designed its data schema, and built Sakura's agent harness with LangChain and CrewAI, with a research step that searches embeddings in Pinecone using vector search and GraphRAG. It has 1,500+ monthly users and 10,000+ boards built, and 94% of the boards work on the first manufacturing run.",
    ],
    languages: [
      {
        name: "TypeScript",
      },
    ],
    stack: [
      {
        group: "Front end",
        items: ["Next.js", "React", "TypeScript", "tscircuit", "Circuit JSON"],
      },
      {
        group: "Back end",
        items: [
          "Convex (TypeScript functions and database)",
          "SQL",
          "MCP server (Streamable HTTP, OAuth)",
          "WorkOS sign-in",
        ],
      },
      {
        group: "AI and data",
        items: [
          "Sakura AI agent",
          "LangChain",
          "CrewAI",
          "Pinecone (embeddings, vector search)",
          "GraphRAG",
          "Claude models via the Anthropic API",
          "Supplier part data (LCSC and EasyEDA records)",
          "KiCad symbol and footprint libraries",
          "Design-rule checks",
        ],
      },
      {
        group: "Infrastructure",
        items: [
          "Vercel",
          "Convex Cloud",
          "AWS",
          "Azure",
          "Tauri desktop app with signed auto-updates",
          "GitHub Releases",
        ],
      },
      {
        group: "Tooling and testing",
        items: ["PostHog analytics", "Vercel Analytics"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "designer",
            kind: "person",
            label: "Board designer",
            desc: "Describes a board, edits, exports files",
            layer: 0,
          },
          {
            id: "aiapps",
            kind: "external",
            label: "Other AI apps",
            desc: "Claude, Cursor and other MCP clients",
            layer: 1,
          },
          {
            id: "cb",
            kind: "system",
            label: "Cherry Blossom",
            desc: "Designs and checks circuit boards from prompts",
            layer: 1,
          },
          {
            id: "claude",
            kind: "external",
            label: "Claude API",
            desc: "Model behind Sakura, the agent",
            layer: 2,
          },
          {
            id: "suppliers",
            kind: "external",
            label: "Part suppliers",
            desc: "Real part data, footprints, models",
            layer: 2,
          },
          {
            id: "fabs",
            kind: "external",
            label: "Board houses",
            desc: "PCBWay, JLCPCB or any fab",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "designer",
            to: "cb",
            label: "Describes and edits board",
          },
          {
            from: "aiapps",
            to: "cb",
            label: "Use design tools",
          },
          {
            from: "cb",
            to: "claude",
            label: "Agent model calls",
          },
          {
            from: "cb",
            to: "suppliers",
            label: "Looks up parts",
          },
          {
            from: "designer",
            to: "fabs",
            label: "Uploads exported files",
          },
        ],
      },
      containers: {
        system: "cb",
        nodes: [
          {
            id: "designer",
            kind: "person",
            label: "Board designer",
            desc: "Prompts, edits and exports boards",
            layer: 0,
          },
          {
            id: "aiapps",
            kind: "external",
            label: "Other AI apps",
            tech: "MCP client",
            desc: "Claude, Cursor and similar apps",
            layer: 0,
          },
          {
            id: "web",
            kind: "container",
            label: "Web editor",
            tech: "Next.js, tscircuit",
            desc: "Schematic, PCB, 3D, chat with Sakura",
            layer: 1,
          },
          {
            id: "desktop",
            kind: "container",
            label: "Desktop app",
            tech: "Tauri",
            desc: "Same editor, signed auto-updates",
            layer: 1,
          },
          {
            id: "mcp",
            kind: "container",
            label: "MCP server",
            tech: "Next.js route",
            desc: "Gives outside AI apps Sakura's tools",
            layer: 1,
          },
          {
            id: "backend",
            kind: "container",
            label: "Convex backend",
            tech: "TypeScript on Convex",
            desc: "Projects, live sync, agent actions",
            layer: 2,
          },
          {
            id: "db",
            kind: "database",
            label: "Project data",
            tech: "Convex database",
            desc: "Projects, version history, part records",
            layer: 3,
          },
          {
            id: "claude",
            kind: "external",
            label: "Claude API",
            tech: "Anthropic API",
            desc: "Model behind Sakura",
            layer: 3,
          },
          {
            id: "suppliers",
            kind: "external",
            label: "Part suppliers",
            tech: "LCSC, EasyEDA records",
            desc: "Pins, footprints, 3D models",
            layer: 3,
          },
          {
            id: "harness",
            kind: "container",
            label: "Agent harness",
            tech: "LangChain, CrewAI",
            desc: "Runs Sakura's design steps",
            layer: 2,
          },
          {
            id: "pinecone",
            kind: "database",
            label: "Research index",
            tech: "Pinecone",
            desc: "Embedded datasheets and docs",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "designer",
            to: "web",
            label: "Prompts, edits, exports",
          },
          {
            from: "designer",
            to: "desktop",
            label: "Same work, installed app",
          },
          {
            from: "aiapps",
            to: "mcp",
            label: "Calls design tools",
            tech: "MCP, OAuth",
          },
          {
            from: "web",
            to: "backend",
            label: "Reads, writes projects",
            tech: "Convex client",
          },
          {
            from: "desktop",
            to: "backend",
            label: "Account sign-in",
            tech: "HTTPS",
          },
          {
            from: "desktop",
            to: "claude",
            label: "Agent model calls",
            tech: "Anthropic API",
          },
          {
            from: "mcp",
            to: "backend",
            label: "Runs Sakura's tools",
          },
          {
            from: "backend",
            to: "db",
            label: "Stores projects",
            tech: "Convex",
          },
          {
            from: "backend",
            to: "suppliers",
            label: "Looks up parts",
            tech: "HTTPS",
          },
          {
            from: "backend",
            to: "harness",
            label: "Starts agent runs",
          },
          {
            from: "harness",
            to: "pinecone",
            label: "Vector and graph search",
            tech: "GraphRAG",
          },
          {
            from: "harness",
            to: "claude",
            label: "Agent model calls",
            tech: "HTTPS",
          },
        ],
      },
    },
    gallery: [
      {
        src: "/work/cherry-blossom/og.webp",
        alt: "Cherry Blossom's title card: plain English in, an editable board out, every AI edit checked",
        caption:
          "Cherry Blossom's title card: plain English in, an editable board out, every AI edit checked",
      },
      {
        src: "/work/cherry-blossom/community-hades-flight-controller.webp",
        alt: "A fixed-wing flight controller, designed by a Cherry Blossom user",
        caption:
          "A fixed-wing flight controller, designed by a Cherry Blossom user",
      },
      {
        src: "/work/cherry-blossom/community-esp32-s3-plc.webp",
        alt: "An ESP32-S3 PLC board, designed by a Cherry Blossom user",
        caption: "An ESP32-S3 PLC board, designed by a Cherry Blossom user",
      },
      {
        src: "/work/cherry-blossom/community-usb-c-power-bank.webp",
        alt: "A USB-C power bank board, designed by a Cherry Blossom user",
        caption: "A USB-C power bank board, designed by a Cherry Blossom user",
      },
      {
        src: "/work/cherry-blossom/community-coffee-alarm-clock.webp",
        alt: "A coffee-maker alarm clock board, designed by a Cherry Blossom user",
        caption:
          "A coffee-maker alarm clock board, designed by a Cherry Blossom user",
      },
      {
        src: "/work/cherry-blossom/editor.webp",
        alt: "The Cherry Blossom editor showing an ESP32 robot controller board in PCB view, with parts on the left and project details on the right",
        caption:
          "The editor: an ESP32 robot controller in PCB view, with the parts list and project checks",
      },
      {
        src: "/work/cherry-blossom/home.webp",
        alt: "The Cherry Blossom home page: Build PCBs with a prompt, and a prompt box",
        caption: "The home page: describe a board in plain English",
      },
    ],
  },
  "cherry-hardware-agent": {
    overview: [
      "Cherry Hardware Agent is the board agent inside Cherry Blossom: it edits, simulates and checks a circuit board before anyone pays to manufacture it.",
      "It started from kicad-happy, an open-source (MIT) set of KiCad review scripts by Andrew Klofas that read schematics and layouts, trace every net and run detectors for common mistakes. On top of that base, the agent can now edit everything KiCad can, including multi-layer boards, buses and vias, and design on other materials such as glass, following the physical rules of each material. It runs Falstad circuit simulations and electrical, design-rule, thermal and EMC checks built on real-world data and PCB research papers from arXiv. Before it designs or fixes a board, it searches a vector database of 15,000 past circuits to see how similar boards were built. It also compares part prices, so a designer can ask it for cheaper or better parts, or parts with the right license.",
      "Anass built these additions for Cherry Blossom, where the agent runs for its 1,500+ monthly users. That version is private, so there is no public code to link.",
    ],
    languages: [
      {
        name: "Python",
      },
    ],
    stack: [
      {
        group: "Back end",
        items: ["Python", "KiCad file parsing (S-expressions)"],
      },
      {
        group: "AI and data",
        items: [
          "AI agent with tool use",
          "Vector database of 15,000 circuits",
          "Falstad circuit simulation",
          "ERC, DRC, thermal (TRC) and EMC checks",
          "PCB research papers (arXiv)",
          "Multi-material boards (glass and others)",
          "Part price comparison",
        ],
      },
      {
        group: "Infrastructure",
        items: ["Runs inside Cherry Blossom"],
      },
      {
        group: "Tooling and testing",
        items: ["KiCad", "kicad-happy (MIT) as the base"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "designer",
            kind: "person",
            label: "Board designer",
            desc: "Designs a board in Cherry Blossom",
            layer: 0,
          },
          {
            id: "cherry",
            kind: "external",
            label: "Cherry Blossom",
            desc: "Editor where boards are designed",
            layer: 1,
          },
          {
            id: "agent",
            kind: "system",
            label: "Cherry Hardware Agent",
            desc: "Edits, simulates and checks boards",
            layer: 2,
          },
          {
            id: "parts",
            kind: "external",
            label: "Part distributors",
            desc: "Parts and datasheets",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "designer",
            to: "cherry",
            label: "Describes and edits",
          },
          {
            from: "cherry",
            to: "agent",
            label: "Edit and check requests",
          },
          {
            from: "agent",
            to: "parts",
            label: "Looks up parts",
          },
        ],
      },
      containers: {
        system: "agent",
        nodes: [
          {
            id: "cherry",
            kind: "external",
            label: "Cherry Blossom",
            desc: "Sends the board and requests",
            layer: 1,
          },
          {
            id: "editing",
            kind: "container",
            label: "Board editing",
            tech: "Python",
            desc: "Layers, buses, vias, materials",
            layer: 1,
          },
          {
            id: "analyzers",
            kind: "container",
            label: "Board analyzers",
            tech: "Python",
            desc: "Read files, trace every net",
            layer: 1,
          },
          {
            id: "sim",
            kind: "container",
            label: "Simulation",
            tech: "Falstad",
            desc: "Simulates the circuits it finds",
            layer: 2,
          },
          {
            id: "checks",
            kind: "container",
            label: "Rule checks",
            tech: "ERC, DRC, TRC, EMC",
            desc: "Rules from real data and papers",
            layer: 2,
          },
          {
            id: "circuits",
            kind: "database",
            label: "Circuit library",
            tech: "Vector database",
            desc: "15,000 past circuits",
            layer: 3,
          },
          {
            id: "parts",
            kind: "external",
            label: "Part distributors",
            desc: "Parts and datasheets",
            layer: 3,
          },
          {
            id: "sourcing",
            kind: "container",
            label: "Parts and prices",
            tech: "Python",
            desc: "Cheaper, better or licensed parts",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "cherry",
            to: "editing",
            label: "Edit requests",
          },
          {
            from: "editing",
            to: "analyzers",
            label: "Updated board",
          },
          {
            from: "analyzers",
            to: "sim",
            label: "Circuits to test",
          },
          {
            from: "analyzers",
            to: "checks",
            label: "Nets and layout",
          },
          {
            from: "editing",
            to: "circuits",
            label: "Similar past designs",
            tech: "Vector search",
          },
          {
            from: "analyzers",
            to: "sourcing",
            label: "Bill of materials",
          },
          {
            from: "sourcing",
            to: "parts",
            label: "Prices and stock",
          },
        ],
      },
    },
  },
  flighto: {
    overview: [
      "FlightO finds the cheapest set of flights for a trip through several cities. You give it your home airport, the cities you want to visit with how many nights to stay in each, and a date window. It picks the visit order and the flight dates that cost the least, and shows the next cheapest trips too.",
      "It walks forward through the days of the window and, for every mix of cities already visited, current city and landing day, keeps the cheapest way to get there. That is Held-Karp dynamic programming for the traveling salesman problem, with a day axis and the stay lengths as constraints, so the answer is exact for the fares it is given. Trips that can no longer fit the remaining stays are dropped before their fares are fetched, and each fare is asked for once. For 8 cities over a 90-day window, the search takes about 20 ms and 9 MB.",
      "Fares come from a CSV file or from the Travelpayouts API, and live answers are saved to a JSON cache for 24 hours. It is a C++17 command line program built with CMake and tested with CTest. It began as a university C++ project that planned bus trips across Quebec City.",
    ],
    languages: [
      {
        name: "C++",
      },
      {
        name: "CMake",
      },
    ],
    stack: [
      {
        group: "Back end",
        items: ["C++17", "C++ standard library", "Command line interface"],
      },
      {
        group: "AI and data",
        items: [
          "Held-Karp dynamic programming",
          "Travelpayouts Data API (real fares)",
          "CSV fare files",
          "JSON fare cache",
        ],
      },
      {
        group: "Infrastructure",
        items: ["curl for HTTPS requests"],
      },
      {
        group: "Tooling and testing",
        items: ["CMake", "CTest", "GCC (MinGW-w64)"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "traveler",
            kind: "person",
            label: "Traveler",
            desc: "Plans a trip through several cities",
            layer: 0,
          },
          {
            id: "flighto",
            kind: "system",
            label: "FlightO",
            desc: "Finds the cheapest order and dates",
            layer: 1,
          },
          {
            id: "api",
            kind: "external",
            label: "Travelpayouts Data API",
            desc: "Real cached flight prices",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "traveler",
            to: "flighto",
            label: "Gives cities, stays and dates",
          },
          {
            from: "flighto",
            to: "traveler",
            label: "Prints the cheapest trips",
          },
          {
            from: "flighto",
            to: "api",
            label: "Asks for one-way fares",
          },
        ],
      },
      containers: {
        system: "flighto",
        nodes: [
          {
            id: "traveler",
            kind: "person",
            label: "Traveler",
            desc: "Runs flighto in a terminal",
            layer: 0,
          },
          {
            id: "cli",
            kind: "container",
            label: "CLI",
            tech: "C++17, main.cpp",
            desc: "Reads options, prints the trips",
            layer: 1,
          },
          {
            id: "optimizer",
            kind: "container",
            label: "Optimizer",
            tech: "C++17, optimizer.cpp",
            desc: "Searches cities, current city and day",
            layer: 2,
          },
          {
            id: "providers",
            kind: "container",
            label: "Fare providers",
            tech: "C++17 interface",
            desc: "Cheapest fare for a route and day",
            layer: 2,
          },
          {
            id: "cache",
            kind: "database",
            label: "Fare cache",
            tech: "JSON file",
            desc: "Live answers reused for 24 hours",
            layer: 3,
          },
          {
            id: "csv",
            kind: "database",
            label: "Fares CSV file",
            tech: "CSV",
            desc: "Sample or your own fares",
            layer: 3,
          },
          {
            id: "api",
            kind: "external",
            label: "Travelpayouts Data API",
            desc: "Real cached flight prices",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "traveler",
            to: "cli",
            label: "Runs a trip request",
          },
          {
            from: "cli",
            to: "optimizer",
            label: "Trip request",
          },
          {
            from: "optimizer",
            to: "providers",
            label: "Asks for fares",
          },
          {
            from: "providers",
            to: "csv",
            label: "Reads",
          },
          {
            from: "providers",
            to: "cache",
            label: "Reads and writes",
          },
          {
            from: "providers",
            to: "api",
            label: "HTTPS requests",
            tech: "curl",
          },
        ],
      },
    },
  },
  "hotel-jaro-voice": {
    overview: [
      "A voice AI agent that answers guest calls at Hotel Jaro's front desk, built as client work (2025 to 2026).",
      "A guest calls the hotel and Twilio connects the call. Whisper turns the guest's speech into text, the agent works out a reply, and ElevenLabs speaks the reply back. The stack also used AWS and Redis.",
      "He built it, and it has handled 1,000+ guest calls, about 80% of them with no staff involved. Its answers are paced like a real receptionist on purpose, so callers hear a natural conversation. It is closed source, so there is no public code. The picture above is a recreation of its dashboard with sample data, because the real one is private with the hotel.",
    ],
    stack: [
      {
        group: "Back end",
        items: ["Twilio"],
      },
      {
        group: "AI and data",
        items: ["Whisper", "ElevenLabs", "Redis"],
      },
      {
        group: "Infrastructure",
        items: ["AWS"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "guest",
            kind: "person",
            label: "Hotel guest",
            desc: "Calls the front desk",
            layer: 0,
          },
          {
            id: "agent",
            kind: "system",
            label: "Front-desk voice agent",
            desc: "Answers guest calls by voice",
            layer: 1,
          },
          {
            id: "twilio",
            kind: "external",
            label: "Twilio",
            desc: "Phone calls",
            layer: 2,
          },
          {
            id: "eleven",
            kind: "external",
            label: "ElevenLabs",
            desc: "Speaks the agent's replies",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "guest",
            to: "twilio",
            label: "Phones the hotel",
          },
          {
            from: "twilio",
            to: "agent",
            label: "Connects the call",
          },
          {
            from: "agent",
            to: "eleven",
            label: "Turns replies into voice",
          },
        ],
      },
      containers: {
        system: "agent",
        nodes: [
          {
            id: "guest",
            kind: "person",
            label: "Hotel guest",
            desc: "Calls the front desk",
            layer: 0,
          },
          {
            id: "agentc",
            kind: "container",
            label: "Voice agent",
            tech: "",
            desc: "Runs each guest call",
            layer: 1,
          },
          {
            id: "stt",
            kind: "container",
            label: "Speech to text",
            tech: "Whisper",
            desc: "Turns guest speech into text",
            layer: 2,
          },
          {
            id: "redis",
            kind: "database",
            label: "Redis",
            tech: "Redis",
            desc: "In-memory data store",
            layer: 3,
          },
          {
            id: "twilio",
            kind: "external",
            label: "Twilio",
            desc: "Phone line for calls",
            layer: 3,
          },
          {
            id: "eleven",
            kind: "external",
            label: "ElevenLabs",
            desc: "Turns replies into speech",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "guest",
            to: "twilio",
            label: "Phones the hotel",
          },
          {
            from: "twilio",
            to: "agentc",
            label: "Call audio",
          },
          {
            from: "agentc",
            to: "stt",
            label: "Guest speech",
          },
          {
            from: "agentc",
            to: "eleven",
            label: "Reply text",
          },
          {
            from: "agentc",
            to: "redis",
            label: "Reads and writes",
          },
        ],
      },
    },
  },
  "ia-financial": {
    overview: [
      "A software engineering internship at iA Financial Group (May to Sep 2023), on payroll processing and a database review.",
      "He rebuilt payroll processing as an automated pipeline written in Python and C#, working with SQL and MongoDB data. In a separate database review, he caught a critical privacy flaw and helped fix it. He also built CI/CD pipelines with Buildkite and Yarn, so changes were built, tested and shipped automatically.",
      "Payroll processing time dropped 87% for 17,000+ weekly salaries, and the fix protected the personal data of 10,000+ clients.",
    ],
    languages: [
      {
        name: "Python",
      },
      {
        name: "C#",
      },
      {
        name: "SQL",
      },
    ],
    stack: [
      {
        group: "Back end",
        items: ["Python", "C#"],
      },
      {
        group: "AI and data",
        items: ["SQL", "MongoDB"],
      },
      {
        group: "Tooling and testing",
        items: ["Jira", "Microsoft Office", "Buildkite CI/CD", "Yarn"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "payees",
            kind: "person",
            label: "People on payroll",
            desc: "17,000+ weekly salaries",
            layer: 0,
          },
          {
            id: "payroll",
            kind: "system",
            label: "Payroll pipeline",
            desc: "Automated weekly payroll processing",
            layer: 1,
          },
          {
            id: "data",
            kind: "external",
            label: "Databases",
            desc: "SQL and MongoDB data",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "payroll",
            to: "payees",
            label: "Weekly salaries",
          },
          {
            from: "payroll",
            to: "data",
            label: "Uses",
          },
        ],
      },
      containers: {
        system: "payroll",
        nodes: [
          {
            id: "payees",
            kind: "person",
            label: "People on payroll",
            desc: "17,000+ weekly salaries",
            layer: 0,
          },
          {
            id: "pipeline",
            kind: "container",
            label: "Payroll pipeline",
            tech: "Python, C#",
            desc: "Runs payroll processing automatically",
            layer: 1,
          },
          {
            id: "sql",
            kind: "database",
            label: "SQL database",
            tech: "SQL",
            desc: "Data the pipeline works with",
            layer: 3,
          },
          {
            id: "mongo",
            kind: "database",
            label: "MongoDB",
            tech: "MongoDB",
            desc: "Data the pipeline works with",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "pipeline",
            to: "payees",
            label: "Weekly salaries",
          },
          {
            from: "pipeline",
            to: "sql",
            label: "Uses",
            tech: "SQL",
          },
          {
            from: "pipeline",
            to: "mongo",
            label: "Uses",
          },
        ],
      },
    },
  },
  "intel-ambassador": {
    overview: [
      "Intel's oneAPI Software Engineer Ambassador from Feb 2024 to Sep 2025: he taught students how to use Intel's AI tools.",
      "He ran hands-on workshops at 10+ universities and hackathons.",
      "He taught 1,000+ students in this role. With his Adobe ambassador role, that makes 1,500+ students taught.",
    ],
    stack: [
      {
        group: "AI and data",
        items: ["Intel oneAPI", "Intel AI tools"],
      },
    ],
    c4: null,
  },
  "laval-ta": {
    overview: [
      "Teaching assistant at Université Laval for Probability & Statistics and for Theory of Computation, in fall 2023 and fall 2024.",
      "He held office hours, answered student questions, and graded assignments with feedback.",
      "He helped 500+ students and graded 1,000+ assignments.",
    ],
    stack: [],
    c4: null,
  },
  "law-firm-workflow": {
    overview: [
      "An app that helps immigration law firms fill Canadian (IMM) and Quebec immigration forms. He built it as part of his 2025 to 2026 client work with Form.io (formio.ca).",
      "Staff upload the official PDF forms. The app reads each form's built-in field data (the XFA format) and asks Google Gemini to explain every field in context, merge questions that repeat across forms, and turn them into one guided questionnaire in English, French, Spanish, Chinese or Hindi. When a client uploads a document such as a passport, Gemini checks it is the right one and pre-fills the matching answers. The answers are then written into the official PDFs, and browser automation with Puppeteer fills the forms.",
      "He wrote the form-reading and filling code, with FastAPI and asyncio for the services: a Python tool that writes answers straight into an IMM form's data, the Gemini step that explains and auto-fills each field, and the multilingual questionnaire app. Teammates built a desktop app that fills Quebec's online Arrima forms with Playwright. The app is used by 10+ law firms, has processed 10,000+ documents and saves about 8 hours per client.",
    ],
    languages: [
      {
        name: "TypeScript",
        share: 89,
      },
      {
        name: "Python",
        share: 9,
      },
      {
        name: "HTML",
        share: 2,
      },
    ],
    stack: [
      {
        group: "Front end",
        items: ["React", "TypeScript", "Vite", "Tailwind CSS", "i18next"],
      },
      {
        group: "Back end",
        items: [
          "Node.js",
          "Express",
          "Python",
          "Flask",
          "Puppeteer",
          "FastAPI",
          "asyncio",
        ],
      },
      {
        group: "AI and data",
        items: ["Google Gemini", "pdf.js", "pikepdf", "lxml", "SQLite"],
      },
      {
        group: "Tooling and testing",
        items: ["Google AI Studio"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "staff",
            kind: "person",
            label: "Law firm staff",
            desc: "Prepare clients' immigration files",
            layer: 0,
          },
          {
            id: "applicant",
            kind: "person",
            label: "Applicant",
            desc: "Answers questions, uploads documents",
            layer: 0,
          },
          {
            id: "filler",
            kind: "system",
            label: "Immigration form filler",
            desc: "Reads, explains and fills immigration forms",
            layer: 1,
          },
          {
            id: "gemini",
            kind: "external",
            label: "Google Gemini",
            desc: "Reads forms and client documents",
            layer: 2,
          },
          {
            id: "arrima",
            kind: "external",
            label: "Arrima portal",
            desc: "Quebec's online immigration forms",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "staff",
            to: "filler",
            label: "Uploads forms, reviews answers",
          },
          {
            from: "applicant",
            to: "filler",
            label: "Answers, uploads documents",
          },
          {
            from: "filler",
            to: "gemini",
            label: "Reads forms and documents",
          },
          {
            from: "filler",
            to: "arrima",
            label: "Fills online forms",
          },
        ],
      },
      containers: {
        system: "filler",
        nodes: [
          {
            id: "staff",
            kind: "person",
            label: "Law firm staff",
            desc: "Prepare clients' immigration files",
            layer: 0,
          },
          {
            id: "applicant",
            kind: "person",
            label: "Applicant",
            desc: "Answers questions, uploads documents",
            layer: 0,
          },
          {
            id: "questionnaire",
            kind: "container",
            label: "Questionnaire app",
            tech: "React, Express",
            desc: "Turns forms into guided questions",
            layer: 1,
          },
          {
            id: "explainer",
            kind: "container",
            label: "Field explainer",
            tech: "React, pdf.js",
            desc: "Explains each field, auto-fills the PDF",
            layer: 1,
          },
          {
            id: "xfa",
            kind: "container",
            label: "XFA filler",
            tech: "Python, Flask, pikepdf",
            desc: "Writes answers into IMM form data",
            layer: 1,
          },
          {
            id: "arrimabot",
            kind: "container",
            label: "Arrima filler",
            tech: "Electron, Playwright",
            desc: "Teammates' app for Quebec's portal",
            layer: 1,
          },
          {
            id: "cache",
            kind: "database",
            label: "Questionnaire cache",
            tech: "SQLite",
            desc: "Saved questionnaires per form, language",
            layer: 2,
          },
          {
            id: "gemini",
            kind: "external",
            label: "Google Gemini",
            desc: "Reads forms and client documents",
            layer: 2,
          },
          {
            id: "arrima",
            kind: "external",
            label: "Arrima portal",
            desc: "Quebec's online immigration forms",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "staff",
            to: "questionnaire",
            label: "Uploads blank forms",
          },
          {
            from: "applicant",
            to: "questionnaire",
            label: "Answers, uploads documents",
          },
          {
            from: "staff",
            to: "explainer",
            label: "Loads form and data",
          },
          {
            from: "staff",
            to: "xfa",
            label: "Enters client answers",
          },
          {
            from: "staff",
            to: "arrimabot",
            label: "Manages client cases",
          },
          {
            from: "questionnaire",
            to: "gemini",
            label: "Analyzes forms, checks documents",
            tech: "Gemini API",
          },
          {
            from: "questionnaire",
            to: "cache",
            label: "Caches questionnaires",
            tech: "Express API",
          },
          {
            from: "explainer",
            to: "gemini",
            label: "Explains and fills fields",
            tech: "Gemini API",
          },
          {
            from: "arrimabot",
            to: "arrima",
            label: "Fills the EOI form",
            tech: "Playwright",
          },
        ],
      },
    },
  },
  linea: {
    overview: [
      "Linea (repo name ArchiGen) turns a plain-language description of a house into an editable floor plan checked against Canadian and Quebec building codes. It is for people planning a home in Canada, and it exports files that architects' design tools can open.",
      "A language model first turns the request into a structured spec: the rooms, their target sizes, which rooms must touch, and the lot. A diffusion model on a cloud GPU (HouseDiffusion, GSDiff or ChatHouseDiffusion, with a CPU layout solver as backup) draws the rooms, then geometry code snaps the walls and builds a BIM model. A three-tier checker tests the plan against fixed National Building Code rules, a Neo4j graph of code clauses and Quebec zoning, and an AI reading of the closest clauses found by vector search. Users can also upload a photo, DXF or IFC plan, edit by text or by dragging walls, and export DXF, SVG or IFC files.",
      "Anass built the pipeline, the compliance engine and the editor. He also built an MCP server that combines GraphRAG and vector search over 500K+ building-code and permit nodes, and the generation step turns natural language into structured output 98% of the time.",
    ],
    languages: [
      {
        name: "Python",
        share: 81,
      },
      {
        name: "TypeScript",
        share: 17,
      },
      {
        name: "Shell",
        share: 1,
      },
      {
        name: "CSS",
        share: 1,
      },
    ],
    stack: [
      {
        group: "Front end",
        items: [
          "Next.js 14",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "shadcn/ui",
          "Konva (2D plan canvas)",
          "Three.js with React Three Fiber (3D view)",
          "Zustand",
          "TanStack Query",
        ],
      },
      {
        group: "Back end",
        items: [
          "Python",
          "FastAPI",
          "Uvicorn",
          "Pydantic",
          "structlog",
          "Shapely",
          "pyclipper",
          "trimesh",
          "IfcOpenShell (BIM)",
          "ezdxf (CAD)",
          "Matplotlib (SVG export)",
        ],
      },
      {
        group: "AI and data",
        items: [
          "Gemini API (spec parsing, embeddings, code reading)",
          "Ollama or SGLang with Qwen3 (local option)",
          "HouseDiffusion",
          "GSDiff",
          "ChatHouseDiffusion",
          "CubiCasa5k (reads plan images)",
          "OpenCV",
          "PyTorch",
          "GraphRAG-style clause extraction",
          "Neo4j",
          "LanceDB",
          "pdfplumber",
          "pikepdf",
        ],
      },
      {
        group: "Infrastructure",
        items: ["Modal (serverless GPUs)", "Docker", "Docker Compose"],
      },
      {
        group: "Tooling and testing",
        items: ["pytest", "pytest-asyncio", "Ruff", "mypy", "ESLint"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "planner",
            kind: "person",
            label: "Home planner",
            desc: "Describes a house or uploads plans",
            layer: 0,
          },
          {
            id: "linea",
            kind: "system",
            label: "Linea",
            desc: "Turns requests into code-checked floor plans",
            layer: 1,
          },
          {
            id: "gemini",
            kind: "external",
            label: "Gemini API",
            desc: "Parses requests, embeds and reads code",
            layer: 2,
          },
          {
            id: "modal",
            kind: "external",
            label: "Modal GPUs",
            desc: "Host the floor-plan diffusion models",
            layer: 2,
          },
          {
            id: "codes",
            kind: "external",
            label: "Code documents",
            desc: "National code and Quebec zoning PDFs",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "planner",
            to: "linea",
            label: "Describes the home",
          },
          {
            from: "linea",
            to: "gemini",
            label: "Parse, embed, interpret",
          },
          {
            from: "linea",
            to: "modal",
            label: "Generate room layouts",
          },
          {
            from: "linea",
            to: "codes",
            label: "Reads and indexes",
          },
        ],
      },
      containers: {
        system: "linea",
        nodes: [
          {
            id: "planner",
            kind: "person",
            label: "Home planner",
            desc: "Describes, edits and exports plans",
            layer: 0,
          },
          {
            id: "web",
            kind: "container",
            label: "Plan editor",
            tech: "Next.js, Konva",
            desc: "2D editing and 3D preview",
            layer: 1,
          },
          {
            id: "api",
            kind: "container",
            label: "Plan API",
            tech: "FastAPI",
            desc: "Generates, edits, checks and exports plans",
            layer: 1,
          },
          {
            id: "gpu",
            kind: "container",
            label: "Diffusion workers",
            tech: "Modal, PyTorch",
            desc: "HouseDiffusion, GSDiff, ChatHouseDiffusion, CubiCasa",
            layer: 2,
          },
          {
            id: "indexer",
            kind: "container",
            label: "Code indexer",
            tech: "Python scripts",
            desc: "Turns code PDFs into graph, vectors",
            layer: 2,
          },
          {
            id: "neo4j",
            kind: "database",
            label: "Code graph",
            tech: "Neo4j",
            desc: "Clauses, zones, jurisdictions, cross-references",
            layer: 3,
          },
          {
            id: "lancedb",
            kind: "database",
            label: "Clause vectors",
            tech: "LanceDB",
            desc: "Embedded clauses for semantic search",
            layer: 3,
          },
          {
            id: "gemini",
            kind: "external",
            label: "Gemini API",
            tech: "HTTPS",
            desc: "Parses requests, embeds, interprets code",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "planner",
            to: "web",
            label: "Describes, edits, exports",
          },
          {
            from: "web",
            to: "api",
            label: "Plan requests",
            tech: "REST, JSON",
          },
          {
            from: "api",
            to: "gpu",
            label: "Generate or read plans",
            tech: "Modal SDK",
          },
          {
            from: "api",
            to: "neo4j",
            label: "Zone and clause queries",
            tech: "Bolt",
          },
          {
            from: "api",
            to: "lancedb",
            label: "Nearest clauses",
            tech: "Vector search",
          },
          {
            from: "api",
            to: "gemini",
            label: "Parse request, interpret code",
            tech: "HTTPS",
          },
          {
            from: "indexer",
            to: "neo4j",
            label: "Loads clauses, zones",
            tech: "Bolt",
          },
          {
            from: "indexer",
            to: "lancedb",
            label: "Writes embeddings",
            tech: "LanceDB",
          },
          {
            from: "indexer",
            to: "gemini",
            label: "Extract and embed",
            tech: "HTTPS",
          },
        ],
      },
    },
  },
  neurovision: {
    overview: [
      "NeuroVision is a web app for content creators: it predicts how a viewer's brain responds to a short video, voiceover or script, and suggests what to change. The outputs are model predictions, not real brain scans.",
      "It trims the upload and splits it into short chunks with ffmpeg (a script is first turned into speech), then runs Meta's TRIBE v2 brain-encoding model on each chunk. The predicted activity is grouped into brain networks such as attention, emotion, vision and language, and turned into heatmaps, GIFs and a JSON summary. Claude, called through OpenRouter, reads the summary and heatmaps and writes a plain-English report with fixes, which can be exported as HTML, PDF or ZIP.",
      "He built the multimodal PyTorch pipeline and the Gradio app around Meta's model: chunking, network mapping, visuals, the report step, a compare view, and crash-safe saving that resumes a run by file hash. It turns video and audio into 20,000+ neural response signals per second and ran on a 48GB VRAM GPU.",
    ],
    languages: [
      {
        name: "Python",
        share: 97,
      },
      {
        name: "Shell",
        share: 3,
      },
    ],
    stack: [
      {
        group: "Front end",
        items: ["Gradio"],
      },
      {
        group: "Back end",
        items: ["Python", "ffmpeg", "WeasyPrint (PDF export)"],
      },
      {
        group: "AI and data",
        items: [
          "Meta TRIBE v2",
          "PyTorch",
          "CUDA",
          "Hugging Face Hub",
          "Chatterbox TTS",
          "Claude via OpenRouter",
          "NumPy",
          "pandas",
          "matplotlib",
          "imageio",
        ],
      },
      {
        group: "Infrastructure",
        items: ["RunPod cloud GPU", "Local JSON results store"],
      },
      {
        group: "Tooling and testing",
        items: ["Bash setup script"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "creator",
            kind: "person",
            label: "Content creator",
            desc: "Wants more engaging short videos",
            layer: 0,
          },
          {
            id: "neurovision",
            kind: "system",
            label: "NeuroVision",
            desc: "Predicts brain response, writes a report",
            layer: 1,
          },
          {
            id: "hf",
            kind: "external",
            label: "Hugging Face",
            desc: "Hosts the TRIBE v2 weights",
            layer: 2,
          },
          {
            id: "openrouter",
            kind: "external",
            label: "OpenRouter (Claude)",
            desc: "Writes the plain-English report",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "creator",
            to: "neurovision",
            label: "Uploads video or script",
          },
          {
            from: "neurovision",
            to: "hf",
            label: "Downloads model weights",
          },
          {
            from: "neurovision",
            to: "openrouter",
            label: "Sends data, heatmaps",
          },
          {
            from: "neurovision",
            to: "creator",
            label: "Returns report, heatmaps",
          },
        ],
      },
      containers: {
        system: "neurovision",
        nodes: [
          {
            id: "creator",
            kind: "person",
            label: "Content creator",
            desc: "Uploads media, reads the report",
            layer: 0,
          },
          {
            id: "app",
            kind: "container",
            label: "Gradio web app",
            tech: "Gradio, Python",
            desc: "Script, voiceover, video, history, compare tabs",
            layer: 1,
          },
          {
            id: "media",
            kind: "container",
            label: "Media prep",
            tech: "ffmpeg, Chatterbox TTS",
            desc: "Trims, splits; script to speech",
            layer: 2,
          },
          {
            id: "brain",
            kind: "container",
            label: "Brain model",
            tech: "TRIBE v2, PyTorch",
            desc: "Predicts brain activity per second",
            layer: 2,
          },
          {
            id: "analysis",
            kind: "container",
            label: "Analysis and visuals",
            tech: "NumPy, matplotlib",
            desc: "Brain networks, peaks, heatmaps, GIFs",
            layer: 2,
          },
          {
            id: "report",
            kind: "container",
            label: "Report builder",
            tech: "Python, WeasyPrint",
            desc: "AI report, HTML, PDF, ZIP",
            layer: 2,
          },
          {
            id: "results",
            kind: "database",
            label: "Results folder",
            tech: "JSON files",
            desc: "Checkpoints, history, hash dedup",
            layer: 3,
          },
          {
            id: "hf",
            kind: "external",
            label: "Hugging Face",
            desc: "TRIBE v2 model weights",
            layer: 3,
          },
          {
            id: "openrouter",
            kind: "external",
            label: "OpenRouter (Claude)",
            desc: "Writes the report text",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "creator",
            to: "app",
            label: "Uploads media or script",
          },
          {
            from: "app",
            to: "media",
            label: "Splits uploads",
            tech: "ffmpeg",
          },
          {
            from: "app",
            to: "brain",
            label: "Runs each chunk",
            tech: "GPU, CUDA",
          },
          {
            from: "brain",
            to: "hf",
            label: "Downloads weights",
            tech: "HF Hub",
          },
          {
            from: "app",
            to: "analysis",
            label: "Builds summary, heatmaps",
          },
          {
            from: "app",
            to: "report",
            label: "Requests the report",
          },
          {
            from: "report",
            to: "openrouter",
            label: "JSON plus heatmaps",
            tech: "HTTPS",
          },
          {
            from: "app",
            to: "results",
            label: "Saves checkpoints",
            tech: "JSON on disk",
          },
        ],
      },
    },
  },
  "scale-ai": {
    overview: [
      "Contract work for Scale AI (Feb to Apr 2026) as a Full Stack Software Engineer Expert, making coding data used to train AI models.",
      "He wrote coding problems and ranked the answers AI models gave to them. He also audited AI-written code in Python, JavaScript/React, Java and C++, flagging bugs, code quality, tests and Git issues.",
      "He authored 200+ AI training tasks and reviewed AI-written code in 4 languages.",
    ],
    languages: [
      {
        name: "Python",
      },
      {
        name: "JavaScript",
      },
      {
        name: "Java",
      },
      {
        name: "C++",
      },
    ],
    stack: [
      {
        group: "Front end",
        items: ["React"],
      },
      {
        group: "AI and data",
        items: ["AI training tasks", "Ranking model answers"],
      },
      {
        group: "Tooling and testing",
        items: ["Git", "Code review", "Tests"],
      },
    ],
    c4: null,
  },
  "shopify-infra-security": {
    overview: [
      "Four months on Shopify's Infrastructure Security team (Jan to Apr 2025), working on how internal services call each other, Google Cloud firewall rules, and security in a data-streaming tool.",
      "He moved internal services from HTTP/1 to gRPC (a faster way for services to call each other), which cut internal request latency 10x and infrastructure cost 90%. He diagnosed and fixed a major Google Cloud firewall misconfiguration affecting 75+ resources. He wrote Terraform to manage infrastructure as code. Day to day he worked in Linux and Bash: finding files, writing scripts, and using kubectl to get into Kubernetes pods.",
      "He shipped a security feature into Redpanda's open-source C++ code (Redpanda is a data-streaming tool), which unblocked Shopify's data-streaming rollout.",
    ],
    languages: [
      {
        name: "C++",
      },
      {
        name: "Bash",
      },
    ],
    stack: [
      {
        group: "Back end",
        items: ["gRPC", "HTTP/1 (migrated from)", "C++"],
      },
      {
        group: "AI and data",
        items: ["Redpanda"],
      },
      {
        group: "Infrastructure",
        items: ["Google Cloud", "Kubernetes", "Terraform", "AWS Lambda"],
      },
      {
        group: "Tooling and testing",
        items: [
          "Datadog",
          "Playwright",
          "DAST security tests",
          "Buildkite CI/CD",
          "Linux",
          "Bash",
          "kubectl",
          "vim",
        ],
      },
    ],
    c4: null,
  },
  "shopify-visual-search": {
    overview: [
      "Photo search in Shopify's Shop App: a shopper snaps a photo and sees products that look like it. It shipped on iOS and Android to 20M+ Shop App users, and it is also on the shop.com front page.",
      'The photo is turned into an image embedding (a list of numbers that describes what it looks like), and vector search finds the most similar products across 55M+ images in under 3 seconds. A self-hosted LLM also looks at the photo and writes 7 search queries, from very precise to very broad (as broad as just "book"). To hit the speed target, the team accepted a 5% drop in matching precision and split the image library by category and color with a first AI pass.',
      "It began as his Shopify hackathon win: he and another intern co-led a 10-person team, wrote the design docs at the start, and shipped it in 6 weeks, behind feature flags with an A/B test, rolling it out to millions of users step by step while watching for problems. He built the image-matching engine and the AI query step, and ran a team of AI agents that tested approaches overnight in a sandbox, which hit the under-3-second target in 1 week instead of the expected 3. He also built the observability: 300+ telemetry signals wired through Prometheus into 9 Grafana dashboards and 50+ alerts across 10 Shop App products, with runbooks for on-call engineers.",
    ],
    languages: [
      {
        name: "Swift",
      },
      {
        name: "Kotlin",
      },
      {
        name: "Ruby",
      },
      {
        name: "TypeScript",
      },
    ],
    stack: [
      {
        group: "Front end",
        items: ["SwiftUI", "Xcode", "Android Studio", "React", "TypeScript"],
      },
      {
        group: "Back end",
        items: ["Ruby on Rails", "GraphQL", "Node.js"],
      },
      {
        group: "AI and data",
        items: [
          "Image embeddings",
          "Vector search",
          "Self-hosted LLM",
          "Elasticsearch",
          "Postgres",
        ],
      },
      {
        group: "Infrastructure",
        items: [
          "Google Cloud",
          "Docker",
          "Kubernetes",
          "Grafana",
          "Prometheus",
        ],
      },
      {
        group: "Tooling and testing",
        items: [
          "Jest",
          "Buildkite CI/CD",
          "Canary deployments",
          "Claude Code",
          "Feature flags",
          "A/B testing",
        ],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "shopper",
            kind: "person",
            label: "Shopper",
            desc: "Snaps a photo of a product",
            layer: 0,
          },
          {
            id: "oncall",
            kind: "person",
            label: "On-call engineer",
            desc: "Acts on alerts using runbooks",
            layer: 0,
          },
          {
            id: "photosearch",
            kind: "system",
            label: "Photo search",
            desc: "Finds products that look like the photo",
            layer: 1,
          },
          {
            id: "catalog",
            kind: "external",
            label: "Product catalog",
            desc: "55M+ product images to match",
            layer: 2,
          },
          {
            id: "grafana",
            kind: "external",
            label: "Grafana",
            desc: "Dashboards and alerts on GCP",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "shopper",
            to: "photosearch",
            label: "Searches with a photo",
          },
          {
            from: "photosearch",
            to: "catalog",
            label: "Matches against images",
          },
          {
            from: "photosearch",
            to: "grafana",
            label: "Telemetry signals",
          },
          {
            from: "grafana",
            to: "oncall",
            label: "Alerts",
          },
        ],
      },
      containers: {
        system: "photosearch",
        nodes: [
          {
            id: "shopper",
            kind: "person",
            label: "Shopper",
            desc: "Snaps a photo of a product",
            layer: 0,
          },
          {
            id: "shopapp",
            kind: "container",
            label: "Shop App",
            tech: "Swift, Kotlin",
            desc: "iOS and Android camera search",
            layer: 1,
          },
          {
            id: "web",
            kind: "container",
            label: "shop.com",
            tech: "",
            desc: "Photo button in the search bar",
            layer: 1,
          },
          {
            id: "api",
            kind: "container",
            label: "Search service",
            tech: "Rails, GraphQL",
            desc: "Takes the photo, returns matches",
            layer: 2,
          },
          {
            id: "embed",
            kind: "container",
            label: "Image embedder",
            tech: "Image embeddings",
            desc: "Turns the photo into a vector",
            layer: 2,
          },
          {
            id: "llm",
            kind: "container",
            label: "Query writer",
            tech: "Self-hosted LLM",
            desc: "Writes 7 queries, precise to broad",
            layer: 2,
          },
          {
            id: "index",
            kind: "database",
            label: "Search index",
            tech: "Elasticsearch",
            desc: "55M+ images split by category, color",
            layer: 3,
          },
          {
            id: "grafana",
            kind: "external",
            label: "Grafana",
            desc: "Dashboards and alerts",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "shopper",
            to: "shopapp",
            label: "Snaps a photo",
          },
          {
            from: "shopper",
            to: "web",
            label: "Searches with a photo",
          },
          {
            from: "shopapp",
            to: "api",
            label: "Sends the photo",
          },
          {
            from: "web",
            to: "api",
            label: "Sends the photo",
          },
          {
            from: "api",
            to: "embed",
            label: "Photo",
          },
          {
            from: "embed",
            to: "index",
            label: "Nearest vectors",
            tech: "Vector search",
          },
          {
            from: "api",
            to: "llm",
            label: "Photo",
          },
          {
            from: "llm",
            to: "index",
            label: "7 search queries",
          },
          {
            from: "api",
            to: "grafana",
            label: "Telemetry signals",
          },
        ],
      },
    },
  },
  "translator-ai": {
    overview: [
      "Translator-AI reads the text in a photo, works out which language it is written in, and translates it. He built it at a 2022 hackathon as a simple Google Translate clone.",
      "OpenCV cleans up the photo (grayscale and thresholding) and Tesseract OCR reads the words. The text is then cleaned up (lowercase, no URLs, numbers, emojis or punctuation), and a scikit-learn model, word counts plus a decision tree trained on a labeled language dataset, predicts the language. The googletrans library sends the text to Google Translate, and a Kivy/KivyMD app holds the login, camera and translation screens.",
      "He wrote it in Python: the OCR step, the text-cleaning helpers, the language classifier and the Kivy interface.",
      "In 2026 he rebuilt it as an Android app in Kotlin, with Jetpack Compose screens and CameraX. Google's ML Kit reads the text, detects the language and translates on the phone, and the app draws each translation over the photo where the original words were. The Python version is kept under the v0-python tag, and the stack and diagrams here describe it.",
    ],
    languages: [
      {
        name: "Python",
        share: 62,
      },
      {
        name: "Kivy KV",
        share: 38,
      },
    ],
    stack: [
      {
        group: "Front end",
        items: ["Kivy", "KivyMD", "KV layout language"],
      },
      {
        group: "Back end",
        items: ["Python"],
      },
      {
        group: "AI and data",
        items: [
          "Tesseract OCR (pytesseract)",
          "OpenCV",
          "Pillow",
          "scikit-learn",
          "pandas",
          "googletrans (Google Translate)",
        ],
      },
      {
        group: "Tooling and testing",
        items: ["PyCharm"],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "user",
            kind: "person",
            label: "User",
            desc: "Has a photo with foreign text",
            layer: 0,
          },
          {
            id: "translator",
            kind: "system",
            label: "Translator-AI",
            desc: "Reads, identifies and translates photo text",
            layer: 1,
          },
          {
            id: "google",
            kind: "external",
            label: "Google Translate",
            desc: "Translates to the chosen language",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "user",
            to: "translator",
            label: "Gives a photo",
          },
          {
            from: "translator",
            to: "google",
            label: "Sends text to translate",
          },
          {
            from: "translator",
            to: "user",
            label: "Shows language, translation",
          },
        ],
      },
      containers: {
        system: "translator",
        nodes: [
          {
            id: "user",
            kind: "person",
            label: "User",
            desc: "Has a photo with foreign text",
            layer: 0,
          },
          {
            id: "cli",
            kind: "container",
            label: "Pipeline script",
            tech: "Python (main.py)",
            desc: "Runs OCR, detection, then translation",
            layer: 1,
          },
          {
            id: "gui",
            kind: "container",
            label: "Kivy app",
            tech: "Kivy, KivyMD",
            desc: "Login, camera and translate screens",
            layer: 1,
          },
          {
            id: "ocr",
            kind: "container",
            label: "OCR step",
            tech: "OpenCV, Tesseract",
            desc: "Cleans the photo, reads words",
            layer: 2,
          },
          {
            id: "clean",
            kind: "container",
            label: "Text cleaners",
            tech: "Python",
            desc: "Lowercase, strip URLs, numbers, emojis",
            layer: 2,
          },
          {
            id: "model",
            kind: "container",
            label: "Language model",
            tech: "scikit-learn",
            desc: "Word counts plus decision tree",
            layer: 2,
          },
          {
            id: "dataset",
            kind: "database",
            label: "Language dataset",
            tech: "CSV file",
            desc: "Sample text labeled by language",
            layer: 3,
          },
          {
            id: "google",
            kind: "external",
            label: "Google Translate",
            desc: "Translates to the chosen language",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "user",
            to: "cli",
            label: "Gives photo, target language",
          },
          {
            from: "user",
            to: "gui",
            label: "Uses the screens",
          },
          {
            from: "cli",
            to: "ocr",
            label: "Extracts the text",
            tech: "pytesseract",
          },
          {
            from: "cli",
            to: "clean",
            label: "Cleans the text",
          },
          {
            from: "cli",
            to: "model",
            label: "Detects the language",
          },
          {
            from: "model",
            to: "dataset",
            label: "Trains on samples",
            tech: "pandas",
          },
          {
            from: "cli",
            to: "google",
            label: "Translates the text",
            tech: "googletrans",
          },
        ],
      },
    },
  },
  "used-car-deal-finder": {
    overview: [
      "Used-Car Deal Finder spots used cars listed well under their market price, so a car flipper hears about them before anyone else.",
      "A Go crawler reads new ads from AutoHebdo, Kijiji, LesPAC, Facebook Marketplace, Craigslist and CarGurus every 5 minutes, started by a GitHub Actions schedule. A Rust price engine compares each car with similar local listings (same model, close year, close mileage) to find its usual price. A Rust Cloudflare Worker, compiled to WebAssembly, stores every car and price change in D1 and raises a snipe alert when a car is 15% or more under that price. Alerts show on a dashboard behind Cloudflare Access and can go to Telegram, after an AI model looks at the photos for rust or dents.",
      "He built the first version solo at Hack the North 2026 in Node.js and SQLite, and the project reached 2,000+ users. He then rebuilt it as this Go crawler and Rust price engine on Cloudflare, with C4 architecture docs and tests in Go and Rust. He used it himself to buy a 2021 RAV4 for $18,000 and sold it a week later for $24,500.",
    ],
    languages: [
      {
        name: "Go",
        share: 65,
      },
      {
        name: "Rust",
        share: 28,
      },
      {
        name: "JavaScript",
        share: 6,
      },
      {
        name: "PowerShell",
        share: 1,
      },
    ],
    stack: [
      {
        group: "Front end",
        items: [
          "HTML",
          "CSS",
          "JavaScript",
          "Cloudflare Pages",
          "Pages Functions",
        ],
      },
      {
        group: "Back end",
        items: [
          "Go",
          "Rust",
          "WebAssembly",
          "Cloudflare Workers (workers-rs)",
          "REST API",
        ],
      },
      {
        group: "AI and data",
        items: [
          "Baseten vision model API",
          "Cloudflare D1",
          "SQLite (pure Go driver)",
          "YAML search plans",
        ],
      },
      {
        group: "Infrastructure",
        items: [
          "Cloudflare Workers",
          "Cron Triggers",
          "Cloudflare Access",
          "GitHub Actions",
          "Windows Task Scheduler",
          "Telegram via Composio",
        ],
      },
      {
        group: "Tooling and testing",
        items: [
          "go test",
          "go vet",
          "cargo test",
          "Clippy",
          "Wrangler",
          "Node.js parity checks",
        ],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "flipper",
            kind: "person",
            label: "Car flipper",
            desc: "Wants underpriced cars before anyone else",
            layer: 0,
          },
          {
            id: "carbuyer",
            kind: "system",
            label: "Used-Car Deal Finder",
            desc: "Finds cars priced under their market",
            layer: 1,
          },
          {
            id: "gha",
            kind: "external",
            label: "GitHub Actions",
            desc: "Starts a crawl every 5 minutes",
            layer: 2,
          },
          {
            id: "sites",
            kind: "external",
            label: "Car listing sites",
            desc: "AutoHebdo, Kijiji, LesPAC, Facebook, Craigslist, CarGurus",
            layer: 2,
          },
          {
            id: "baseten",
            kind: "external",
            label: "Baseten AI",
            desc: "Looks at the car photos",
            layer: 2,
          },
          {
            id: "telegram",
            kind: "external",
            label: "Telegram via Composio",
            desc: "Carries alerts to the phone",
            layer: 3,
          },
          {
            id: "access",
            kind: "external",
            label: "Cloudflare Access",
            desc: "Login in front of the dashboard",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "gha",
            to: "carbuyer",
            label: "Runs every 5 minutes",
          },
          {
            from: "carbuyer",
            to: "sites",
            label: "Reads car ads",
          },
          {
            from: "carbuyer",
            to: "baseten",
            label: "Checks the photos",
          },
          {
            from: "carbuyer",
            to: "telegram",
            label: "Sends snipe alerts",
          },
          {
            from: "telegram",
            to: "flipper",
            label: "Buzzes the phone",
          },
          {
            from: "flipper",
            to: "access",
            label: "Opens the dashboard",
          },
          {
            from: "access",
            to: "carbuyer",
            label: "Lets the owner in",
          },
        ],
      },
      containers: {
        system: "carbuyer",
        nodes: [
          {
            id: "flipper",
            kind: "person",
            label: "Car flipper",
            desc: "Checks deals, gets alerts",
            layer: 0,
          },
          {
            id: "crawler",
            kind: "container",
            label: "Go crawler",
            tech: "Go CLI",
            desc: "Fetches pages, parses ads, pushes cars",
            layer: 1,
          },
          {
            id: "dashboard",
            kind: "container",
            label: "Dashboard",
            tech: "Cloudflare Pages",
            desc: "New deals and the deals table",
            layer: 1,
          },
          {
            id: "scorer",
            kind: "container",
            label: "Price engine",
            tech: "Rust",
            desc: "Prices each car against look-alikes",
            layer: 2,
          },
          {
            id: "worker",
            kind: "container",
            label: "API Worker",
            tech: "Rust to WebAssembly",
            desc: "Stores, scores, alerts; daily re-score",
            layer: 2,
          },
          {
            id: "d1",
            kind: "database",
            label: "Cloud database",
            tech: "Cloudflare D1",
            desc: "Cars, price history, alerts, snapshots",
            layer: 3,
          },
          {
            id: "sites",
            kind: "external",
            label: "Car listing sites",
            desc: "Public used-car ad pages",
            layer: 3,
          },
          {
            id: "baseten",
            kind: "external",
            label: "Baseten AI",
            desc: "Vision model checks car photos",
            layer: 3,
          },
          {
            id: "telegram",
            kind: "external",
            label: "Telegram via Composio",
            desc: "Delivers snipe alerts",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "crawler",
            to: "sites",
            label: "Reads ad pages",
            tech: "HTTPS, throttled",
          },
          {
            from: "crawler",
            to: "scorer",
            label: "Asks for prices",
            tech: "JSON over stdin",
          },
          {
            from: "crawler",
            to: "worker",
            label: "Pushes new listings",
            tech: "HTTPS, bearer token",
          },
          {
            from: "worker",
            to: "scorer",
            label: "Scores listings",
            tech: "Shared Rust crate",
          },
          {
            from: "worker",
            to: "d1",
            label: "Saves cars, alerts",
            tech: "D1 binding",
          },
          {
            from: "worker",
            to: "baseten",
            label: "Checks the photos",
            tech: "HTTPS API",
          },
          {
            from: "worker",
            to: "telegram",
            label: "Sends snipe alert",
            tech: "Composio API",
          },
          {
            from: "dashboard",
            to: "worker",
            label: "Reads deals, alerts",
            tech: "Service binding",
          },
          {
            from: "flipper",
            to: "dashboard",
            label: "Checks new deals",
            tech: "Cloudflare Access",
          },
          {
            from: "telegram",
            to: "flipper",
            label: "Buzzes the phone",
          },
        ],
      },
    },
    gallery: [
      {
        src: "/work/used-car-deal-finder/demo-rav4-18000.webp",
        alt: "From the project's demo: the 2021 RAV4 it found, the car he bought",
        caption:
          "From the project's demo: the 2021 RAV4 it found, the car he bought",
      },
      {
        src: "/work/used-car-deal-finder/dashboard.webp",
        alt: "The live Used-Car Deal Finder dashboard listing cars priced under the local market",
        caption:
          "The live demo dashboard: every listing priced against similar local cars",
      },
    ],
  },
  "valorant-spike-predictor": {
    overview: [
      "Valorant Spike Predictor guesses which site the attacking team will plant the spike on next round. A player or coach types in the rounds so far and gets a probability for each site.",
      "A Python collector pulls high-rank match data from the HenrikDev Valorant API with async httpx and turns every round into a row, including where the attackers planted, the score, their economy and both teams' agents. Feature scripts add round-history signals such as the last sites hit, rounds since each site and site streaks. One XGBoost model is trained per map and scored with accuracy and log-loss against a most-common-site baseline. A FastAPI backend loads the models, and a React, Vite and Tailwind page sends the rounds and shows the odds.",
      "He built the whole pipeline himself: data collection, feature engineering, per-map training, the API and the web page. On a separate research branch, an autoresearch-style loop tuned the per-map models with Optuna, using log-loss as the main metric.",
    ],
    languages: [
      {
        name: "Python",
        share: 74,
      },
      {
        name: "JavaScript",
        share: 25,
      },
      {
        name: "HTML",
        share: 1,
      },
    ],
    stack: [
      {
        group: "Front end",
        items: ["React", "Vite", "Tailwind CSS"],
      },
      {
        group: "Back end",
        items: ["Python", "FastAPI", "Uvicorn", "Pydantic"],
      },
      {
        group: "AI and data",
        items: [
          "XGBoost",
          "scikit-learn",
          "Optuna (research branch)",
          "pandas",
          "NumPy",
          "joblib",
          "httpx (async)",
          "HenrikDev Valorant API",
        ],
      },
      {
        group: "Infrastructure",
        items: ["Local CSV data files", "Saved model file (joblib)"],
      },
      {
        group: "Tooling and testing",
        items: [
          "Accuracy and log-loss evaluation",
          "Most-common-site baseline",
          "matplotlib",
          "tenacity",
          "tqdm",
          "python-dotenv",
        ],
      },
    ],
    c4: {
      context: {
        nodes: [
          {
            id: "player",
            kind: "person",
            label: "Player or coach",
            desc: "Enters rounds as the match goes",
            layer: 0,
          },
          {
            id: "predictor",
            kind: "system",
            label: "Spike Predictor",
            desc: "Predicts the next plant site",
            layer: 1,
          },
          {
            id: "henrik",
            kind: "external",
            label: "HenrikDev API",
            desc: "High-rank Valorant match data",
            layer: 2,
          },
        ],
        edges: [
          {
            from: "player",
            to: "predictor",
            label: "Enters round history",
          },
          {
            from: "predictor",
            to: "player",
            label: "Shows site odds",
          },
          {
            from: "predictor",
            to: "henrik",
            label: "Collects past matches",
          },
        ],
      },
      containers: {
        system: "predictor",
        nodes: [
          {
            id: "player",
            kind: "person",
            label: "Player or coach",
            desc: "Enters rounds, reads site odds",
            layer: 0,
          },
          {
            id: "web",
            kind: "container",
            label: "Web page",
            tech: "React, Vite, Tailwind",
            desc: "Map picker, round input, odds bars",
            layer: 1,
          },
          {
            id: "api",
            kind: "container",
            label: "Prediction API",
            tech: "FastAPI",
            desc: "Builds features, runs the map model",
            layer: 2,
          },
          {
            id: "collector",
            kind: "container",
            label: "Data collector",
            tech: "Python, async httpx",
            desc: "Pulls matches, parses every round",
            layer: 2,
          },
          {
            id: "trainer",
            kind: "container",
            label: "Training scripts",
            tech: "XGBoost, scikit-learn",
            desc: "Features, per-map training, evaluation",
            layer: 2,
          },
          {
            id: "rounds",
            kind: "database",
            label: "Round data",
            tech: "CSV files",
            desc: "Rounds and engineered features",
            layer: 3,
          },
          {
            id: "models",
            kind: "database",
            label: "Model file",
            tech: "joblib pickle",
            desc: "One XGBoost model per map",
            layer: 3,
          },
          {
            id: "henrik",
            kind: "external",
            label: "HenrikDev API",
            desc: "High-rank Valorant match data",
            layer: 3,
          },
        ],
        edges: [
          {
            from: "player",
            to: "web",
            label: "Enters round history",
          },
          {
            from: "web",
            to: "api",
            label: "Asks for site odds",
            tech: "POST /predict",
          },
          {
            from: "api",
            to: "models",
            label: "Loads map models",
            tech: "joblib",
          },
          {
            from: "collector",
            to: "henrik",
            label: "Fetches matches",
            tech: "async httpx",
          },
          {
            from: "collector",
            to: "rounds",
            label: "Writes round rows",
            tech: "CSV",
          },
          {
            from: "trainer",
            to: "rounds",
            label: "Reads features",
            tech: "pandas",
          },
          {
            from: "trainer",
            to: "models",
            label: "Saves trained models",
            tech: "joblib",
          },
        ],
      },
    },
    gallery: [
      {
        src: "/work/valorant-spike-predictor/odds.webp",
        alt: "The Valorant Spike Predictor web app showing the odds for each site, from a sample round history.",
        caption: "The web app, with a sample round history",
      },
    ],
  },
};
