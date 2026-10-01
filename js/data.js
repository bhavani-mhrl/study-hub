/* ============================================================
   STUDY HUB — DATA LAYER
   All subject, topic and PYQ data lives here as plain objects,
   so the app logic in app.js never has to know where data
   comes from. Swap this file for an API call later if needed.
   ============================================================ */

// A YouTube "search as playlist" embed — no fixed video IDs to go stale.
function ytEmbed(query) {
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`;
}
function ytSearchLink(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function subj(id, name, icon, topics, ytQuery) {
  return { id, name, icon, topics, ytQuery: ytQuery || `${name} full course`, };
}

const DATA = {
  /* ---------------------------------------------------------- 10th CLASS */
  tenth: {
    label: "10th Class",
    groups: null,
    subjects: [
      subj("t-maths", "Mathematics", "📐",
        ["Real Numbers", "Polynomials", "Linear Equations", "Quadratic Equations", "Trigonometry", "Coordinate Geometry", "Circles", "Statistics & Probability"],
        "class 10 maths full chapter explanation"),
      subj("t-phy", "Physical Science", "⚗️",
        ["Chemical Reactions", "Acids Bases Salts", "Electricity", "Magnetism", "Light — Reflection & Refraction", "Periodic Table"],
        "class 10 physical science full chapter"),
      subj("t-bio", "Biological Science", "🧬",
        ["Life Processes", "Control & Coordination", "Reproduction", "Heredity & Evolution", "Our Environment", "Natural Resource Management"],
        "class 10 biology full chapter explanation"),
      subj("t-social", "Social Studies", "🌍",
        ["Nationalism in India", "Resources & Development", "Federalism", "Democracy & Diversity", "Money & Credit", "Globalisation"],
        "class 10 social studies full chapter"),
      subj("t-eng", "English", "📖",
        ["Prose & Poetry Analysis", "Grammar — Tenses & Voice", "Letter Writing", "Essay Writing", "Comprehension Skills"],
        "class 10 english grammar and literature"),
      subj("t-2lang", "Second Language (Hindi/Telugu/Sanskrit)", "🗣️",
        ["Prose Lessons", "Poetry", "Grammar Rules", "Composition Writing"],
        "class 10 second language telugu hindi grammar"),
      subj("t-cs", "Computer Applications", "💻",
        ["Fundamentals of Computers", "HTML Basics", "MS Office", "Intro to Programming"],
        "class 10 computer applications basics"),
    ],
  },

  /* ---------------------------------------------------------- INTERMEDIATE */
  inter: {
    label: "Intermediate (11th & 12th)",
    groups: {
      MPC: {
        label: "MPC — Maths, Physics, Chemistry",
        subjects: [
          subj("i-mpc-maths1a", "Mathematics I-A", "📐", ["Functions", "Matrices", "Vector Algebra", "Trigonometric Equations", "Hyperbolic Functions", "Properties of Triangles"], "intermediate maths 1A full chapters"),
          subj("i-mpc-maths1b", "Mathematics I-B", "📐", ["Coordinate Geometry (Locus, Straight Lines)", "3D Geometry", "Differentiation", "Applications of Derivatives"], "intermediate maths 1B full chapters"),
          subj("i-mpc-maths2a", "Mathematics II-A", "📊", ["Complex Numbers", "De Moivre's Theorem", "Quadratic Expressions", "Theory of Equations", "Permutations & Combinations", "Binomial Theorem", "Partial Fractions"], "intermediate maths 2A full chapters"),
          subj("i-mpc-maths2b", "Mathematics II-B", "📊", ["Circles", "Parabola, Ellipse, Hyperbola", "Integration", "Definite Integrals", "Differential Equations"], "intermediate maths 2B full chapters"),
          subj("i-mpc-phy", "Physics", "🔭", ["Units & Measurements", "Motion in a Plane", "Laws of Motion", "Work Energy Power", "Thermodynamics", "Waves", "Electrostatics", "Current Electricity", "Optics", "Modern Physics"], "intermediate physics full chapters"),
          subj("i-mpc-chem", "Chemistry", "⚗️", ["Atomic Structure", "Chemical Bonding", "States of Matter", "Thermodynamics", "Equilibrium", "Electrochemistry", "Organic Chemistry Basics", "Polymers"], "intermediate chemistry full chapters"),
          subj("i-mpc-eng", "English", "📖", ["Prose & Poetry", "Grammar", "Vocabulary", "Writing Skills"], "intermediate english full chapters"),
        ],
      },
      BiPC: {
        label: "BiPC — Biology, Physics, Chemistry",
        subjects: [
          subj("i-bipc-bot", "Botany", "🌿", ["Diversity in Plant World", "Cell Biology", "Plant Anatomy", "Plant Physiology", "Genetics", "Ecology"], "intermediate botany full chapters"),
          subj("i-bipc-zoo", "Zoology", "🐾", ["Animal Diversity", "Human Anatomy", "Human Physiology", "Genetics & Evolution", "Applied Biology", "Ecology"], "intermediate zoology full chapters"),
          subj("i-bipc-phy", "Physics", "🔭", ["Units & Measurements", "Motion", "Laws of Motion", "Thermodynamics", "Optics", "Electrostatics", "Modern Physics"], "intermediate physics full chapters"),
          subj("i-bipc-chem", "Chemistry", "⚗️", ["Atomic Structure", "Chemical Bonding", "Equilibrium", "Organic Chemistry", "Biomolecules"], "intermediate chemistry full chapters"),
          subj("i-bipc-eng", "English", "📖", ["Prose & Poetry", "Grammar", "Vocabulary", "Writing Skills"], "intermediate english full chapters"),
        ],
      },
      HEC: {
        label: "HEC — History, Economics, Commerce",
        subjects: [
          subj("i-hec-hist", "History", "🏛️", ["Ancient India", "Medieval India", "Modern India", "World History Overview"], "intermediate history full chapters"),
          subj("i-hec-eco", "Economics", "📈", ["Micro Economics Basics", "Macro Economics Basics", "Indian Economy", "Money & Banking"], "intermediate economics full chapters"),
          subj("i-hec-com", "Commerce", "💼", ["Business Organisation", "Accounting Basics", "Banking", "Trade & Commerce"], "intermediate commerce full chapters"),
          subj("i-hec-eng", "English", "📖", ["Prose & Poetry", "Grammar", "Writing Skills"], "intermediate english full chapters"),
        ],
      },
      CEC: {
        label: "CEC — Civics, Economics, Commerce",
        subjects: [
          subj("i-cec-civ", "Civics", "⚖️", ["Indian Constitution", "Political Systems", "Local Self Government", "Rights & Duties"], "intermediate civics full chapters"),
          subj("i-cec-eco", "Economics", "📈", ["Micro Economics", "Macro Economics", "Indian Economy", "Public Finance"], "intermediate economics full chapters"),
          subj("i-cec-com", "Commerce", "💼", ["Business Organisation", "Accountancy Basics", "Banking & Insurance", "Marketing"], "intermediate commerce full chapters"),
          subj("i-cec-eng", "English", "📖", ["Prose & Poetry", "Grammar", "Writing Skills"], "intermediate english full chapters"),
        ],
      },
      MEC: {
        label: "MEC — Maths, Economics, Commerce",
        subjects: [
          subj("i-mec-maths", "Mathematics", "📐", ["Algebra", "Calculus Basics", "Statistics", "Matrices"], "intermediate maths for commerce full chapters"),
          subj("i-mec-eco", "Economics", "📈", ["Micro Economics", "Macro Economics", "Indian Economy"], "intermediate economics full chapters"),
          subj("i-mec-com", "Commerce", "💼", ["Business Organisation", "Accountancy Basics", "Banking"], "intermediate commerce full chapters"),
          subj("i-mec-eng", "English", "📖", ["Prose & Poetry", "Grammar", "Writing Skills"], "intermediate english full chapters"),
        ],
      },
    },
    subjects: [],
  },

  /* ---------------------------------------------------------- BTECH */
  btech: {
    label: "B.Tech",
    groups: {
      "Common 1st Year": {
        label: "Common 1st Year (All Branches)",
        subjects: [
          subj("b-c-m1", "Engineering Mathematics I & II", "📐", ["Matrices", "Differential Equations", "Multivariable Calculus", "Laplace Transforms", "Vector Calculus"], "engineering mathematics full course"),
          subj("b-c-phy", "Engineering Physics", "🔭", ["Quantum Mechanics Basics", "Semiconductor Physics", "Optics & Lasers", "Waves & Oscillations"], "engineering physics full course"),
          subj("b-c-chem", "Engineering Chemistry", "⚗️", ["Water Technology", "Electrochemistry", "Polymers", "Fuel Chemistry"], "engineering chemistry full course"),
          subj("b-c-c", "Programming in C", "💻", ["Basics & Data Types", "Control Statements", "Arrays & Strings", "Functions & Recursion", "Pointers", "Structures"], "programming in c full course"),
          subj("b-c-bee", "Basic Electrical & Electronics", "🔌", ["Circuit Laws", "AC/DC Circuits", "Diodes & Transistors", "Digital Logic Basics"], "basic electrical and electronics engineering full course"),
          subj("b-c-eg", "Engineering Graphics", "📏", ["Projections", "Orthographic Views", "Isometric Views", "AutoCAD Basics"], "engineering graphics full course"),
          subj("b-c-env", "Environmental Science", "🌱", ["Ecosystems", "Pollution Control", "Natural Resources", "Sustainability"], "environmental science engineering full course"),
        ],
      },
      CSE: {
        label: "Computer Science Engineering",
        subjects: [
          subj("b-cse-ds", "Data Structures", "🧱", ["Arrays & Linked Lists", "Stacks & Queues", "Trees", "Graphs", "Hashing", "Sorting & Searching"], "data structures full course"),
          subj("b-cse-oop", "Object Oriented Programming (Java)", "☕", ["Classes & Objects", "Inheritance", "Polymorphism", "Exception Handling", "Collections"], "java oop full course"),
          subj("b-cse-dbms", "Database Management Systems", "🗄️", ["ER Model", "Relational Algebra", "SQL", "Normalization", "Transactions & Concurrency"], "dbms full course"),
          subj("b-cse-os", "Operating Systems", "🖥️", ["Process Management", "CPU Scheduling", "Memory Management", "Deadlocks", "File Systems"], "operating systems full course"),
          subj("b-cse-cn", "Computer Networks", "🌐", ["OSI & TCP/IP Model", "Routing", "Transport Layer", "Network Security Basics"], "computer networks full course"),
          subj("b-cse-daa", "Design & Analysis of Algorithms", "🧮", ["Complexity Analysis", "Divide & Conquer", "Greedy Algorithms", "Dynamic Programming", "NP-Completeness"], "design and analysis of algorithms full course"),
          subj("b-cse-se", "Software Engineering", "🛠️", ["SDLC Models", "Requirements Engineering", "Design & Testing", "Agile & Scrum"], "software engineering full course"),
          subj("b-cse-web", "Web Technologies", "🕸️", ["HTML/CSS", "JavaScript", "React Basics", "Node & Express", "REST APIs"], "web development full course"),
          subj("b-cse-ml", "Machine Learning", "🤖", ["Regression", "Classification", "Clustering", "Neural Networks Basics", "Model Evaluation"], "machine learning full course"),
        ],
      },
      IT: {
        label: "Information Technology",
        subjects: [
          subj("b-it-ds", "Data Structures", "🧱", ["Arrays & Linked Lists", "Stacks & Queues", "Trees", "Graphs"], "data structures full course"),
          subj("b-it-dbms", "Database Management Systems", "🗄️", ["ER Model", "SQL", "Normalization", "Transactions"], "dbms full course"),
          subj("b-it-os", "Operating Systems", "🖥️", ["Process Management", "Scheduling", "Memory Management"], "operating systems full course"),
          subj("b-it-cn", "Computer Networks", "🌐", ["OSI Model", "Routing", "Network Security"], "computer networks full course"),
          subj("b-it-cc", "Cloud Computing", "☁️", ["Virtualization", "IaaS/PaaS/SaaS", "AWS Basics", "Cloud Security"], "cloud computing full course"),
          subj("b-it-cs", "Cyber Security", "🛡️", ["Cryptography Basics", "Network Security", "Ethical Hacking Basics", "Security Protocols"], "cyber security full course"),
        ],
      },
      ECE: {
        label: "Electronics & Communication Engineering",
        subjects: [
          subj("b-ece-ede", "Electronic Devices & Circuits", "🔩", ["Diodes", "Transistors (BJT/FET)", "Amplifiers", "Oscillators"], "electronic devices and circuits full course"),
          subj("b-ece-dsp", "Digital Signal Processing", "📶", ["Signals & Systems", "Fourier Transform", "Z-Transform", "Digital Filters"], "digital signal processing full course"),
          subj("b-ece-cs", "Communication Systems", "📡", ["Analog Modulation (AM/FM)", "Digital Modulation", "Information Theory", "Antennas"], "communication systems full course"),
          subj("b-ece-mp", "Microprocessors & Microcontrollers", "🧠", ["8085/8086 Architecture", "Assembly Programming", "8051 Microcontroller", "Interfacing"], "microprocessors and microcontrollers full course"),
          subj("b-ece-vlsi", "VLSI Design", "🔬", ["CMOS Basics", "Logic Design", "Fabrication Process", "Layout Design"], "vlsi design full course"),
          subj("b-ece-cont", "Control Systems", "🎛️", ["Transfer Functions", "Block Diagrams", "Stability Analysis", "PID Controllers"], "control systems full course"),
          subj("b-ece-emt", "Electromagnetic Theory", "🧲", ["Vector Calculus", "Maxwell's Equations", "Wave Propagation", "Transmission Lines"], "electromagnetic theory full course"),
        ],
      },
      EEE: {
        label: "Electrical & Electronics Engineering",
        subjects: [
          subj("b-eee-circ", "Electrical Circuits", "🔌", ["Network Theorems", "AC/DC Analysis", "Resonance", "Two-Port Networks"], "electrical circuits full course"),
          subj("b-eee-mach", "Electrical Machines", "⚙️", ["DC Machines", "Transformers", "Induction Motors", "Synchronous Machines"], "electrical machines full course"),
          subj("b-eee-ps", "Power Systems", "🏭", ["Generation & Transmission", "Distribution Systems", "Fault Analysis", "Protection Systems"], "power systems full course"),
          subj("b-eee-pe", "Power Electronics", "🔋", ["Diodes & Thyristors", "Rectifiers", "Inverters", "Choppers"], "power electronics full course"),
          subj("b-eee-cont", "Control Systems", "🎛️", ["Transfer Functions", "Stability Analysis", "Root Locus", "PID Controllers"], "control systems full course"),
          subj("b-eee-mp", "Microprocessors", "🧠", ["8085 Architecture", "Assembly Programming", "Interfacing"], "microprocessors full course"),
        ],
      },
      MECH: {
        label: "Mechanical Engineering",
        subjects: [
          subj("b-mech-thermo", "Thermodynamics", "🔥", ["Laws of Thermodynamics", "Entropy", "Power Cycles", "Refrigeration Cycles"], "engineering thermodynamics full course"),
          subj("b-mech-fm", "Fluid Mechanics", "🌊", ["Fluid Statics", "Bernoulli's Equation", "Flow Through Pipes", "Boundary Layer Theory"], "fluid mechanics full course"),
          subj("b-mech-som", "Strength of Materials", "🏗️", ["Stress & Strain", "Bending Moment & Shear Force", "Torsion", "Columns & Struts"], "strength of materials full course"),
          subj("b-mech-mp", "Manufacturing Processes", "🔧", ["Casting", "Welding", "Machining", "Forming Processes"], "manufacturing processes full course"),
          subj("b-mech-md", "Machine Design", "⚙️", ["Design Against Static Load", "Fatigue Design", "Design of Shafts & Keys", "Gears & Bearings"], "machine design full course"),
          subj("b-mech-ht", "Heat Transfer", "🌡️", ["Conduction", "Convection", "Radiation", "Heat Exchangers"], "heat transfer full course"),
          subj("b-mech-cad", "CAD/CAM", "🖥️", ["Computer Aided Design Basics", "CNC Programming", "CAM Software Tools"], "cad cam full course"),
        ],
      },
      CIVIL: {
        label: "Civil Engineering",
        subjects: [
          subj("b-civ-sa", "Structural Analysis", "🏛️", ["Determinate Structures", "Indeterminate Structures", "Influence Lines", "Matrix Methods"], "structural analysis full course"),
          subj("b-civ-surv", "Surveying", "📐", ["Chain Surveying", "Compass Surveying", "Levelling", "Total Station & GPS"], "surveying full course"),
          subj("b-civ-ct", "Concrete Technology", "🧱", ["Cement & Aggregates", "Mix Design", "Properties of Concrete", "Durability"], "concrete technology full course"),
          subj("b-civ-geo", "Geotechnical Engineering", "🪨", ["Soil Classification", "Soil Mechanics", "Bearing Capacity", "Foundations"], "geotechnical engineering full course"),
          subj("b-civ-te", "Transportation Engineering", "🛣️", ["Highway Planning", "Pavement Design", "Traffic Engineering", "Railways Basics"], "transportation engineering full course"),
          subj("b-civ-ee", "Environmental Engineering", "🌱", ["Water Supply Systems", "Wastewater Treatment", "Air Pollution Control", "Solid Waste Management"], "environmental engineering full course"),
          subj("b-civ-fm", "Fluid Mechanics", "🌊", ["Fluid Statics", "Flow Measurement", "Open Channel Flow"], "fluid mechanics for civil engineering full course"),
        ],
      },
    },
    subjects: [],
  },
};

/* ============================================================
   PYQ (Previous Year Questions) DATA
   Each entry links to a live, always-fresh search for that
   exact paper set (so links never go dead) plus a short note.
   ============================================================ */
const PYQ_DATA = {
  tenth: {
    label: "10th Class",
    papers: [
      { title: "10th Class Mathematics — Previous Papers", query: "class 10 maths previous year question papers pdf" },
      { title: "10th Class Science — Previous Papers", query: "class 10 science previous year question papers pdf" },
      { title: "10th Class Social Studies — Previous Papers", query: "class 10 social studies previous year question papers pdf" },
      { title: "10th Class English — Previous Papers", query: "class 10 english previous year question papers pdf" },
    ],
  },
  inter: {
    label: "Intermediate",
    papers: [
      { title: "Inter 1st Year MPC — Previous Papers", query: "intermediate 1st year MPC previous question papers pdf" },
      { title: "Inter 2nd Year MPC — Previous Papers", query: "intermediate 2nd year MPC previous question papers pdf" },
      { title: "Inter BiPC — Previous Papers", query: "intermediate BiPC previous question papers pdf" },
      { title: "Inter HEC / CEC / MEC — Previous Papers", query: "intermediate commerce group previous question papers pdf" },
      { title: "Inter English — Previous Papers", query: "intermediate english previous question papers pdf" },
    ],
  },
  btech: {
    label: "B.Tech",
    papers: [
      { title: "B.Tech 1st Year — Previous Papers", query: "btech first year previous question papers pdf" },
      { title: "CSE Core Subjects — Previous Papers", query: "btech cse previous question papers pdf" },
      { title: "ECE Core Subjects — Previous Papers", query: "btech ece previous question papers pdf" },
      { title: "EEE Core Subjects — Previous Papers", query: "btech eee previous question papers pdf" },
      { title: "Mechanical Core Subjects — Previous Papers", query: "btech mechanical previous question papers pdf" },
      { title: "Civil Core Subjects — Previous Papers", query: "btech civil previous question papers pdf" },
    ],
  },
};
