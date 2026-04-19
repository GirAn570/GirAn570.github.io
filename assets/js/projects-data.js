// ================================================================
// PROJECTS DATA — this is the only file you need to edit
// to add or update projects.
// ================================================================
//
// HOW TO ADD A PROJECT:
//   1. Copy the template block below
//   2. Fill in the fields
//   3. Paste it into the array (order matters — displayed as listed)
//   4. (Optional) Add a thumbnail:
//        assets/images/projects/YOUR-PROJECT-ID.jpg
//   5. (Optional) Add a PDF:
//        assets/docs/projects/YOUR-PROJECT-ID.pdf
//      Then reference it in the documents array below, with ../../ prefix:
//        { label: 'Report', path: '../../assets/docs/projects/YOUR-PROJECT-ID.pdf' }
//
// TEMPLATE — copy from here:
// ─────────────────────────────────────────────────────────────────
// {
//   id: 'my-project',            // kebab-case, must be unique
//   title: 'My Project',
//   type: 'school',              // 'school' | 'personal'
//   status: 'completed',         // 'completed' | 'in-progress'
//   image: null,                 // null = placeholder image
//                                // or 'assets/images/projects/my-project.jpg'
//   shortDescription: 'One sentence shown on the card.',
//   longDescription: 'Full description shown in the modal. Can be as long as needed.',
//   documents: [
//     { label: 'Report', path: '../../assets/docs/projects/my-project.pdf' }
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
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Applied structured project management — personas, user stories, MoSCoW — to plan a grade management web app using Python, SQL, and Docker.',
    longDescription: 'The primary goal of this project was not to build the application, but to practise rigorous planning before writing a single line of code. Working as a team, we defined personas for Students and Professors, wrote more than 12 user stories with acceptance criteria, and applied MoSCoW prioritisation to scope the work realistically. We also researched the technology stack: Python web frameworks, database integration, secure password hashing, and Docker Compose. Deliverables included a planning document, a research document, and a team reflection on collaboration and time management.',
    documents: [
      { label: 'Project Description', path: '../../assets/docs/projects/grading-management-system/PM-Project - Python and Docker.pdf' },
      { label: 'Planning Document',   path: '../../assets/docs/projects/grading-management-system/planning.pdf' },
      { label: 'Research Document',   path: '../../assets/docs/projects/grading-management-system/research.pdf' },
      { label: 'Reflection',          path: '../../assets/docs/projects/grading-management-system/reflection.pdf' }
    ],
    video: null,
    tags: ['Python', 'Docker', 'SQL', 'System Design']
  },
  {
    id: 'food-event-project-management',
    title: 'Food Event Project Management',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Organised the full logistics, scheduling, and budgeting for a two-day food stand at a sports festival.',
    longDescription: 'Managed the complete logistics of a pulled chicken and pulled jackfruit sandwich stand over two days of a sports festival. Planning covered quantity estimation (including a vegetarian ratio and free meals for referees), smoker load scheduling and wood consumption, manpower allocation, and setup/cleanup timing. An Excel cost sheet was built to estimate pricing and break-even points. Personas were created to model visitor needs and service constraints. Task tracking was handled in MS Planner from Backlog to Finished.',
    documents: [],
    video: null,
    tags: ['Project Management', 'MS Planner', 'Excel']
  },
  {
    id: 'remote-desktop-services-rds',
    title: 'Remote Desktop Services (RDS) Implementation',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Deployed a Windows Server 2022 lab with Active Directory and Remote Desktop Services for centralised student access.',
    longDescription: 'Set up a complete Remote Desktop Services environment using Windows Server 2022. The lab covered domain setup with Active Directory Domain Services and DNS, user and group creation, RDS deployment with session collection configuration, RD Web Access with certificate setup, and client connection testing. The report documents each step from VM build to troubleshooting, and serves as a repeatable deployment guide.',
    documents: [
      { label: 'Lab Report',      path: '../../assets/docs/projects/remote-desktop-services-rds/rds-implementation.pdf' },
      { label: 'Windows RDS',     path: '../../assets/docs/projects/remote-desktop-services-rds/Windows RDS.pdf' },
      { label: 'Lab 08 Slides',   path: '../../assets/docs/projects/remote-desktop-services-rds/Windows - Lab08 - Presentations.pdf' }
    ],
    video: null,
    tags: ['Windows Server', 'Active Directory', 'Microsoft']
  },
  {
    id: 'power-platform',
    title: 'Power Platform',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Built a medication reminder workflow in Power Automate and a Publication Manager app in Power Apps.',
    longDescription: 'Designed and built two end-to-end low-code solutions on Microsoft Power Platform. In Power Automate, created a flow that tracks medication stock and sends a reminder when a refill is due. In Power Apps, built a Publication Manager app to handle monthly orders, inventory, and special orders. Both projects focused on the full design cycle: defining the data structure, implementing the business logic, and producing a usable interface that supports a clear process from input to output.',
    documents: [
      { label: 'Power Apps Project',  path: '../../assets/docs/projects/power-platform/Powerapps_Project.pdf' },
      { label: 'Publication Manager', path: '../../assets/docs/projects/power-platform/Publication Manager.pdf' }
    ],
    video: null,
    tags: ['Power Platform', 'Power Automate', 'Power Apps', 'Low-code']
  },
  {
    id: 'unraid',
    title: 'UnRAID Server Setup',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Prepared and implemented a server running UnRAID OS, covering hardware setup, configuration, and documentation.',
    longDescription: 'Planned and implemented a server using UnRAID OS as part of the cloud infrastructure course. The work covered hardware preparation, OS installation, storage pool configuration, and service setup. The project was carried out as a team and produced both a full technical documentation and a presentation summarising the implementation.',
    documents: [
      { label: 'Documentation',  path: '../../assets/docs/projects/unraid/Unraid_CLOIF2_Team6_MR3S04_Documentation.pdf' },
      { label: 'Presentation',   path: '../../assets/docs/projects/unraid/Unraid_CLOIF2_Team6_MR3S04_Presentation_2.pdf' }
    ],
    video: null,
    tags: ['UnRAID', 'Server Administration', 'Hardware', 'Cloud Infrastructure']
  },
  {
    id: 'scrum-tales',
    title: 'Scrum Tales',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Practised Scrum in a creative exercise: writing a constrained murder mystery story in timed sprints with a full Sprint Review.',
    longDescription: 'A hands-on introduction to Scrum through a creative team exercise. The class was split into two teams, each tasked with writing a murder mystery story under mandatory constraints: an IKEA advertisement had to appear somewhere, and the story had to include at least two bad puns. With only three minutes to prepare and five minutes to write, the first sprint forced rapid prioritisation and communication under pressure. Afterwards, the Sprint Review gave both teams time to reflect — what went well, what slowed us down, and what to change for the next sprint. The key takeaway: in project management, the process and the team dynamic matter as much as the end result.',
    documents: [],
    video: null,
    tags: ['Scrum', 'Agile', 'Project Management', 'Teamwork']
  },
  {
    id: 'battery-technology',
    title: 'Battery Technology',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Researched and presented battery technology as part of a cloud infrastructure hardware study.',
    longDescription: 'Prepared and delivered a hardware presentation on battery technology as part of the cloud infrastructure course. The presentation covered the underlying principles of battery operation, different battery chemistries and their trade-offs, and the relevance of battery technology in modern infrastructure (e.g. UPS systems, data centre power backup). The goal was to develop the ability to research a hardware topic independently and communicate it clearly to a technical audience.',
    documents: [
      { label: 'Presentation', path: '../../assets/docs/projects/battery-technology/Battery Technology.pdf' }
    ],
    video: null,
    tags: ['Hardware', 'Research', 'Presentation']
  },
  {
    id: 'redm',
    title: 'RedM Server',
    type: 'personal',
    status: 'in-progress',
    image: null,
    shortDescription: 'Building and running a multiplayer RedM server, handling configuration, resources, and community management.',
    longDescription: 'Setting up and operating a multiplayer server built on RedM. Responsibilities include server configuration, installing and maintaining resources (scripts, maps, game modes), iterating on gameplay features based on player feedback, and keeping the server stable under load. The project covers server administration, scripting, and community management, and is currently in active development.',
    documents: [],
    video: null,
    tags: ['Game Server', 'Server Administration', 'Community Management']
  }
];
