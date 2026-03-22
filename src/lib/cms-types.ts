export type SiteSettingsDTO = {
  siteTitle: string;
  metaDescription: string;
  logoUrl: string | null;
  heroImageUrl: string | null;
  grainTextureUrl: string | null;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  heroName: string;
  heroRole: string;
  heroBio: string;
  exploreWorkLabel: string;
  downloadResumeLabel: string;
  tapeWords: string[];
  projectsSectionTitle: string;
  projectsSectionDescription: string;
  testimonialsSectionTitle: string;
  testimonialsSectionDescription: string;
  aboutSectionTitle: string;
  aboutSectionDescription: string;
  readsCardTitle: string;
  readsCardSubtitle: string;
  bookCoverImageUrl: string | null;
  mapImageUrl: string | null;
  contactHeadline: string;
  contactBody: string;
  contactButtonLabel: string;
  contactButtonUrl: string;
  footerCopyright: string;
  blogSectionTitle: string;
  blogNavLabel: string;
  authorName: string | null;
  authorAvatarUrl: string | null;
};

export type ProjectDTO = {
  title: string;
  type: string;
  year: number;
  overview: string;
  description: string;
  challenges: { title: string }[];
  improvements_scope: { title: string }[];
  mainFeatures: { title: string }[];
  technologies: { title: string }[];
  image: string;
  github: string;
  livesite: string;
};

export type TestimonialDTO = {
  name: string;
  position: string;
  testimonial: string;
  avatar: string;
};

export type TechStackItemDTO = {
  name: string;
  iconUrl: string;
};

export type HobbyDTO = {
  title: string;
  emoji: string;
};

export type SitePayload = {
  siteSettings: SiteSettingsDTO;
  projects: ProjectDTO[];
  testimonials: TestimonialDTO[];
  techStack: TechStackItemDTO[];
  hobbies: HobbyDTO[];
};

export type BlogListItemDTO = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
};

export type BlogPostDTO = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  publishedAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
};
