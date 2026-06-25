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
//   reflection: 'Personal reflection shown in the modal. Leave null to hide the section.',
//   documents: [
//     { label: 'Report', path: '../../assets/docs/projects/my-project.pdf' }
//   ],
//   video: null,                 // or { type: 'embed', src: 'https://youtube.com/embed/...' }
//                                // or { type: 'file',  src: 'assets/docs/projects/demo.mp4' }
//   videos: [],                  // optional array of videos with { label, type, src }
//   tags: ['Python', 'Docker']
// },
// ─────────────────────────────────────────────────────────────────

window.PROJECTS_DATA = [
  {
    id: 'vircl-esxi-proxmox',
    title: 'VIRCL - ESXi & Proxmox',
    type: 'school',
    status: 'completed',
    image: null,
    shortDescription: 'Built and documented clustered virtualisation environments with VMware ESXi/vCenter and Proxmox VE, including tutorial videos for both platforms.',
    longDescription: 'This project focused on comparing and implementing clustering in two virtualisation platforms: VMware ESXi with vCenter and Proxmox VE. The work covered host preparation, cluster configuration, VM management, backup-related considerations, and clear operational documentation. The final deliverables include a full documentation package, a presentation, and two tutorial videos showing the ESXi/vCenter and Proxmox workflows.',
    reflection: 'Working across both ESXi/vCenter and Proxmox made the differences between enterprise virtualisation platforms much more concrete. It was useful to see how similar infrastructure goals can be reached through very different tooling, interfaces, and operational habits.',
    documents: [
      { label: 'Documentation', path: '../../assets/docs/projects/vircl-esxi-proxmox/VIRCL_Team4_Documentation.pdf' },
      { label: 'Presentation',  path: '../../assets/docs/projects/vircl-esxi-proxmox/VIRCL_Team4_Presentation.pdf' }
    ],
    videos: [
      { label: 'ESXi & vCenter Tutorial', type: 'file', src: '../../assets/docs/projects/vircl-esxi-proxmox/VIRCL_Team4_Clustering_ESXi_vCenter_Tutorial.mp4' },
      { label: 'Proxmox VE Tutorial',     type: 'file', src: '../../assets/docs/projects/vircl-esxi-proxmox/VIRCL_Team4_Clustering_Proxmox_VE_Tutorial.mp4' }
    ],
    tags: ['VMware ESXi', 'vCenter', 'Proxmox VE', 'Clustering']
  },
  {
    id: 'spinning-relais-pour-la-vie',
    title: 'Relais pour la Vie - Spinning Backend',
    type: 'school',
    status: 'in-progress',
    image: null,
    shortDescription: 'Backend work for a class fundraising project where participants spin on bikes and raise money through timed sessions.',
    longDescription: 'This class project supports a fundraising event based around spinning bikes. My work focused on the central backend used by the admin panel. I built a FastAPI service with a SQLite database, Docker Compose setup, health checks, login/logout with bearer tokens, bcrypt password hashing, role-based permissions, student and sponsor management, and bike session endpoints. The backend tracks one active session per bike, supports adding extra time, preserves stopped session history, and exposes the data needed by the admin interface.',
    reflection: 'My part of the project was about making the operational side reliable: admins need to log in, manage students and sponsors, start or stop bike sessions, and trust that the data stays consistent during the event. It was a good exercise in keeping the backend simple while still covering authentication, permissions, persistence, and the workflow the team actually needs.',
    documents: [],
    video: null,
    tags: ['FastAPI', 'SQLite', 'Docker', 'Backend']
  },
  {
    id: 'az-104-meck',
    title: 'AZ-104 - Meck',
    type: 'school',
    status: 'in-progress',
    image: null,
    shortDescription: 'Documentation will be added later.',
    longDescription: '',
    reflection: null,
    documents: [],
    video: null,
    tags: []
  },
  {
    id: 'grading-management-system',
    title: 'Grading Management System',
    type: 'school',
    status: 'completed',
    image: '/assets/docs/projects/grading-management-system/UntisWeb Logo on White Background.png',
    shortDescription: 'Applied structured project management — personas, user stories, MoSCoW — to plan a grade management web app using Python, SQL, and Docker.',
    longDescription: 'The primary goal of this project was not to build the application, but to practise rigorous planning before writing a single line of code. Working as a team, we defined personas for Students and Professors, wrote more than 12 user stories with acceptance criteria, and applied MoSCoW prioritisation to scope the work realistically. We also researched the technology stack: Python web frameworks, database integration, secure password hashing, and Docker Compose. Deliverables included a planning document, a research document, and a team reflection on collaboration and time management.',
    reflection: 'Despite the Python and Docker framing, this was fundamentally a project management exercise — and deliberately so. The goal was to confront us with the consequences of poor planning before a single line of code was written. That experience made the value of structured preparation tangible in a way no lecture could.',
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
    reflection: 'This was our first real-world project, and it taught me more than any classroom exercise could. We built a detailed plan, then compared it against what actually happened over the two days — and the gaps were eye-opening. It reinforced early on that no plan survives contact with reality, and that the ability to adapt matters just as much as the ability to prepare.',
    documents: [],
    video: null,
    tags: ['Project Management', 'MS Planner', 'Excel']
  },
  {
    id: 'remote-desktop-services-rds',
    title: 'Remote Desktop Services (RDS) Implementation',
    type: 'school',
    status: 'completed',
    image: '/assets/docs/projects/remote-desktop-services-rds/download.jpg',
    shortDescription: 'Deployed a Windows Server 2022 lab with Active Directory and Remote Desktop Services for centralised student access.',
    longDescription: 'Set up a complete Remote Desktop Services environment using Windows Server 2022. The lab covered domain setup with Active Directory Domain Services and DNS, user and group creation, RDS deployment with session collection configuration, RD Web Access with certificate setup, and client connection testing. The report documents each step from VM build to troubleshooting, and serves as a repeatable deployment guide.',
    reflection: 'This lab gave me a much clearer picture of the Windows Server environment — particularly how RDS fits into a broader domain infrastructure. Going through each step hands-on, from domain setup to client connection, made the concepts stick in a way that reading documentation alone never would.',
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
    image: '/assets/docs/projects/power-platform/download.jpg',
    shortDescription: 'Built a medication reminder workflow in Power Automate and a Publication Manager app in Power Apps.',
    longDescription: 'Designed and built two end-to-end low-code solutions on Microsoft Power Platform. In Power Automate, created a flow that tracks medication stock and sends a reminder when a refill is due. In Power Apps, built a Publication Manager app to handle monthly orders, inventory, and special orders. Both projects focused on the full design cycle: defining the data structure, implementing the business logic, and producing a usable interface that supports a clear process from input to output.',
    reflection: 'This project opened my eyes to the potential of automation and low-code tools. Building real, functional solutions without writing traditional code was a new experience, and discovering Power Apps in particular made me realise how much can be achieved quickly when you have the right platform.',
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
    image: '/assets/docs/projects/unraid/download.jpg',
    shortDescription: 'Prepared and implemented a server running UnRAID OS, covering hardware setup, configuration, and documentation.',
    longDescription: 'Planned and implemented a server using UnRAID OS as part of the cloud infrastructure course. The work covered hardware preparation, OS installation, storage pool configuration, and service setup. The project was carried out as a team and produced both a full technical documentation and a presentation summarising the implementation.',
    reflection: 'My first hands-on experience with a physical server — from handling the hardware to configuring the OS. There is a big difference between working in a virtualised lab and actually setting up a real machine, and this project made that gap very clear. It gave me a solid foundation for understanding how infrastructure operates at the physical level.',
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
    image: '/assets/docs/projects/scrum-tales/download.jpg',
    shortDescription: 'Practised Scrum in a creative exercise: writing a constrained murder mystery story in timed sprints with a full Sprint Review.',
    longDescription: 'A hands-on introduction to Scrum through a creative team exercise. The class was split into two teams, each tasked with writing a murder mystery story under mandatory constraints: an IKEA advertisement had to appear somewhere, and the story had to include at least two bad puns. With only three minutes to prepare and five minutes to write, the first sprint forced rapid prioritisation and communication under pressure. Afterwards, the Sprint Review gave both teams time to reflect — what went well, what slowed us down, and what to change for the next sprint. The key takeaway: in project management, the process and the team dynamic matter as much as the end result.',
    reflection: 'A deceptively simple exercise that revealed a lot about how teams function under pressure. With only minutes to plan and execute, clear communication and trust became the only real tools available. It was a good reminder that Scrum is not just a framework — it is a way of working together when time is short and uncertainty is high.',
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
    reflection: 'Researching battery technology deepened my understanding of hardware in a way that goes beyond components and specs. It prompted me to think about how physical infrastructure is powered and protected — a perspective that is easy to overlook when working mostly in software and virtualised environments.',
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
    hidden: true,
    image: null,
    shortDescription: 'Building and running a multiplayer RedM server, handling configuration, resources, and community management.',
    longDescription: 'Setting up and operating a multiplayer server built on RedM. Responsibilities include server configuration, installing and maintaining resources (scripts, maps, game modes), iterating on gameplay features based on player feedback, and keeping the server stable under load. The project covers server administration, scripting, and community management, and is currently in active development.',
    reflection: null,
    documents: [],
    video: null,
    tags: ['Game Server', 'Server Administration', 'Community Management']
  }
];
