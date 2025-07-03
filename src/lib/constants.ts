export const PROJECTS_DATA = [
  {
    title: "Mireon",
    type: "full-stack",
    year: 2025,
    overview: "AI-powered code intelligence and meeting analysis platform.",
    description:
      "Mireon is an AI-powered code intelligence and meeting analysis platform. It enables teams to index, understand, and interact with their GitHub repositories and meetings through natural language. Whether it's code review, onboarding, or documentation, Mireon helps you navigate complex projects faster.",
    challenges: [
      {
        title:
          "Struggles with processing big projects on Vercel because of timeout",
      },
      {
        title:
          "Sequential indexing for staying under the rate limit of Gemini's free tier",
      },
      { title: "Vercel's max duration limitation" },
      { title: "Gemini's free tier limitation" },
    ],
    improvements_scope: [
      { title: "Transaction and rollback implementation" },
      { title: "Better error handling" },
      { title: "Caching" },
      { title: "UI improvements" },
    ],
    mainFeatures: [
      { title: "GitHub repo indexing and code summarization" },
      { title: "Natural Language Q&A" },
      { title: "Meeting Recording Analysis" },
    ],
    technologies: [
      { title: "Next.js" },
      { title: "TypeScript" },
      { title: "Tailwind CSS" },
      { title: "Clerk" },
      { title: "Prisma" },
      { title: "PostgreSQL" },
      { title: "Gemini" },
      { title: "Assembly AI" },
      { title: "Langchain JS" },
      { title: "Stripe" },
    ],
    image:
      "https://875p1967n4.ufs.sh/f/l33HWhV9rVqMT1uLc97zxFLVGd48vuJS06bMR7aZoPYHBjWc",
    github: "https://github.com/the-nazzmul/mireon",
    livesite: "https://mireon-nazz.vercel.app",
  },
  {
    title: "Savant",
    type: "full-stack",
    year: 2025,
    overview:
      "AI-powered PDF research assistant designed to help users extract meaningful insights from their PDFs.",
    description:
      "Savant is an AI-powered PDF research assistant designed to help users extract meaningful insights from their PDFs. Built on Google's Gemini AI, Savant enables users to upload documents, chat with them, and even analyze resumes for ATS compatibility.",
    challenges: [
      {
        title: "Struggles with processing big PDF on Vercel because of timeout",
      },
      {
        title:
          "Sequential indexing for staying under the rate limit of Gemini's free tier",
      },
      { title: "Vercel's max duration limitation" },
      { title: "Gemini's free tier limitation" },
    ],
    improvements_scope: [
      { title: "Transaction and rollback implementation" },
      { title: "Better error handling" },
      { title: "Caching" },
      { title: "UI improvements" },
      { title: "File Management System implementation" },
    ],
    mainFeatures: [
      { title: "Intelligent interaction with resume" },
      { title: "Vectorized search" },
      { title: "Chatting in the context of the document" },
      { title: "Resume analysis enhanced" },
    ],
    technologies: [
      { title: "Next.js" },
      { title: "TypeScript" },
      { title: "Tailwind CSS" },
      { title: "Clerk" },
      { title: "Prisma" },
      { title: "PostgreSQL" },
      { title: "PineconeDB" },
      { title: "Gemini" },
      { title: "Langchain JS" },
    ],
    image:
      "https://875p1967n4.ufs.sh/f/l33HWhV9rVqMUCWa385VqDOyRwr6g1FhnWLEvTlo8msPGzCi",
    github: "https://github.com/the-nazzmul/savant",
    livesite: "https://savant-nazz.vercel.app/",
  },
  {
    title: "DevView",
    type: "full-stack",
    year: 2025,
    overview: "Custom remote interview platform for developers.",
    description:
      "DevView is a remote interview platform for developers. Interviewers can schedule, conduct, and review interviews, while candidates can solve coding problems in a Monaco-powered editor. Built with Next.js, Convex, Clerk, and Stream SDK.",
    challenges: [
      {
        title: "The code editor and question bank is not dynamic",
      },

      { title: "Some issues with hardware access" },
    ],
    improvements_scope: [
      {
        title: "The code editor needs to be interactive",
      },
      { title: "A custom backend server" },
      { title: "Interactivity" },
    ],
    mainFeatures: [
      { title: "Video and audio calling" },
      { title: "Web based code editor and question bank" },
      { title: "Scheduling and feedback system" },
    ],
    technologies: [
      { title: "Next.js" },
      { title: "TypeScript" },
      { title: "Tailwind CSS" },
      { title: "Clerk" },
      { title: "Convex" },
      { title: "Stream SDK" },
    ],
    image:
      "https://875p1967n4.ufs.sh/f/l33HWhV9rVqMDwijyLEmpOxItRnsgj9ZMu6KmPJo2BTldW1N",
    github: "https://github.com/the-nazzmul/dev-view",
    livesite: "https://dev-view.vercel.app/",
  },
];

export const TESTIMONIALS = [
  {
    name: "Micherl Brows",
    position: "Director of IT @ MegaCord",
    testimonial:
      "I've been working with Nazmul for over a year now and I'm impressed with his work. He's a great developer and a great person. I highly recommend him.",
    avatar: "/assets/memoji-avatar-1.png",
  },
  {
    name: "Micherl Brows",
    position: "Director of IT @ MegaCord",
    testimonial:
      "I've been working with Nazmul for over a year now and I'm impressed with his work. He's a great developer and a great person. I highly recommend him.",
    avatar: "/assets/memoji-avatar-1.png",
  },
  {
    name: "Micherl Brows",
    position: "Director of IT @ MegaCord",
    testimonial:
      "I've been working with Nazmul for over a year now and I'm impressed with his work. He's a great developer and a great person. I highly recommend him.",
    avatar: "/assets/memoji-avatar-1.png",
  },
  {
    name: "Micherl Brows",
    position: "Director of IT @ MegaCord",
    testimonial:
      "I've been working with Nazmul for over a year now and I'm impressed with his work. He's a great developer and a great person. I highly recommend him.",
    avatar: "/assets/memoji-avatar-1.png",
  },
];

export const HOBBIES = [
  { title: "Motorcycles", emoji: "🏍️" },
  { title: "Photography", emoji: "📷" },
  { title: "Painting", emoji: "🎨" },
  { title: "Reading", emoji: "📚" },
  { title: "Traveling", emoji: "🌍" },
  { title: "Fountain Pens", emoji: "🖋️" },
  { title: "Content Creation", emoji: "📹" },
];
