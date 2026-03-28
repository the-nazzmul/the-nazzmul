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
  /** @deprecated Prefer featuredProjectsSectionTitle; still sent by older CMS payloads. */
  projectsSectionTitle: string;
  /** @deprecated Prefer featuredProjectsSectionDescription. */
  projectsSectionDescription: string;
  /** Home `#projects` block heading (optional in API; normalized with legacy fallbacks). */
  featuredProjectsSectionTitle?: string;
  featuredProjectsSectionDescription?: string;
  /** `/projects` index page title (optional in API; normalized). */
  allProjectsPageTitle?: string;
  /** `/projects` index description only (optional in API; normalized). */
  allProjectsPageDescription?: string | null;
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
  /** Subtitle under the recent-blogs block on the home page (optional). */
  blogHomeSectionDescription: string | null;
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
  /** When true, project appears in the home “Projects” section. */
  featured: boolean;
  /** Optional CMS slug; URL segment is derived from title if omitted. */
  slug: string | null;
  /** Optional filter facet; omit from UI when all null. */
  category: string | null;
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
  tags: string[];
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
  tags: string[];
};
