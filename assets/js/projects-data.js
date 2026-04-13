// ================================================================
// PROJECTS DATA — this is the only file you need to edit
// to add or update projects.
// ================================================================
//
// HOW TO ADD A PROJECT:
//   1. Copy the template block below
//   2. Fill in the fields
//   3. Paste it into the array (order doesn't matter — sorted by date)
//   4. (Optional) Add a thumbnail:
//        assets/images/projects/YOUR-PROJECT-ID.jpg
//   5. (Optional) Add a PDF:
//        assets/docs/projects/YOUR-PROJECT-ID.pdf
//      Then reference it in the documents array below.
//
// TEMPLATE — copy from here:
// ─────────────────────────────────────────────────────────────────
// {
//   id: 'my-project',            // kebab-case, must be unique
//   title: 'My Project',
//   date: '2025-01-15',          // YYYY-MM-DD  (use '' if unknown)
//   type: 'school',              // 'school' | 'personal'
//   status: 'completed',         // 'completed' | 'in-progress'
//   image: null,                 // null = placeholder image
//                                // or 'assets/images/projects/my-project.jpg'
//   shortDescription: 'One sentence shown on the card.',
//   longDescription: 'Full description shown in the modal. Can be as long as needed.',
//   documents: [
//     { label: 'Report', path: 'assets/docs/projects/my-project.pdf' }
//   ],
//   video: null,                 // or { type: 'embed', src: 'https://youtube.com/embed/...' }
//                                // or { type: 'file',  src: 'assets/docs/projects/demo.mp4' }
//   tags: ['Python', 'Docker']
// },
// ─────────────────────────────────────────────────────────────────

window.PROJECTS_DATA = [
  {
    id: 'grading-management-system',
    title: 'Grading Management System',
    date: '2025-11-17',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Planned a grade management web app (Python + SQL + Docker) with personas, user stories, and MoSCoW prioritization.',
    longDescription: 'Planned a grade management web application where Students can view grades and Professors can create/update grades. The project emphasises structured planning before coding: personas, at least 12 user stories with acceptance criteria, MoSCoW prioritisation, a Planner board workflow, and research on Python frameworks, database integration, secure password hashing, and Docker/Docker Compose. Deliverables include planning and research documents plus a team reflection on collaboration and time management. The main objective was not the grading system itself, but to understand how important project management is.',
    documents: [
      { label: 'Planning Document', path: 'assets/docs/projects/grading-management-system-planning.pdf' },
      { label: 'Research Document', path: 'assets/docs/projects/grading-management-system-research.pdf' },
      { label: 'Reflection',        path: 'assets/docs/projects/grading-management-system-reflection.pdf' }
    ],
    video: null,
    tags: ['Python', 'Docker', 'SQL', 'System Design']
  },
  {
    id: 'food-event-project-management',
    title: 'Food Event Project Management',
    date: '2025-10-05',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Planned logistics, prep schedule, and budgeting for a two-day food sale during a sports festival.',
    longDescription: 'Planned the logistics, preparation schedule, and budgeting for a two-day food sale (Pulled Chicken / Pulled Jackfruit sandwiches) during a sports festival. Work included building an MS Planner board (Backlog → Finished), calculating quantities (vegetarian ratio, free meals for referees), defining smoker load scheduling and wood consumption, estimating manpower and setup/cleanup timing, and preparing a clear Excel cost sheet to estimate pricing and profitability. Personas were created to model different visitor needs and service constraints.',
    documents: [],
    video: null,
    tags: ['Project Management', 'MS Planner', 'Excel']
  },
  {
    id: 'remote-desktop-services-rds',
    title: 'Remote Desktop Services (RDS) Implementation',
    date: '',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Implemented a Windows Server 2022 lab with AD DS, DNS, and Remote Desktop Services for centralised student access.',
    longDescription: 'Implemented a Remote Desktop Services (RDS) lab environment using Windows Server 2022 with Active Directory Domain Services (AD DS) and DNS. The goal was to provide secure, centralised desktop access for students via a session-based RDS deployment. The documentation covers prerequisites, VM/server build steps, domain setup, user/group creation, RDS deployment and collection validation, certificate configuration for RD Web Access, client configuration, and troubleshooting notes.',
    documents: [
      { label: 'Lab Report', path: 'assets/docs/projects/rds-implementation.pdf' }
    ],
    video: null,
    tags: ['Windows Server', 'Active Directory', 'Microsoft']
  },
  {
    id: 'power-platform',
    title: 'Power Platform',
    date: '',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Built projects using Microsoft Power Platform to design end-to-end low-code workflows.',
    longDescription: 'Built several projects using Microsoft Power Platform. The focus was on designing end-to-end low-code workflows: data structure, app/flow logic, and a usable interface that supports a clear process from input to output. Using Power Automate, created a workflow that sets a reminder when to buy new medication and tracks current stock. Using Power Apps, built a Publication Manager app to track monthly orders, inventory, and special orders.',
    documents: [],
    video: null,
    tags: ['Power Platform', 'Power Automate', 'Power Apps', 'Low-code']
  },
  {
    id: 'redm',
    title: 'RedM Server',
    date: '',
    type: 'personal',
    status: 'in-progress',
    image: null,
    shortDescription: 'Building and managing an online multiplayer server based on RedM.',
    longDescription: 'Building and managing an online multiplayer server based on RedM. Work includes server configuration, maintaining resources, and iterating on gameplay and stability based on testing and player feedback. Currently at early development stage.',
    documents: [],
    video: null,
    tags: ['Cloud', 'Server Administration', 'Project Management']
  }
];
