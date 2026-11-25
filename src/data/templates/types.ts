export type TemplateCategory = 
  | 'Business' 
  | 'Startup' 
  | 'Students' 
  | 'Clubs' 
  | 'Portfolio' 
  | 'Restaurant/Cafe' 
  | 'Events/Hackathons' 
  | 'Education' 
  | 'Nonprofit' 
  | 'Fashion' 
  | 'Tech/SaaS' 
  | 'Creator/Blog';

export type LayoutArchetype = 
  | 'split-hero'
  | 'bento-grid'
  | 'editorial-magazine'
  | 'dashboard-app'
  | 'masonry-portfolio'
  | 'menu-board'
  | 'event-timeline'
  | 'pricing-first'
  | 'photo-grid'
  | 'long-scroll-story'
  | 'one-screen-landing'
  | 'sidebar-docs';

export interface TemplateDefinition {
  id: string;
  title: string;
  category: TemplateCategory;
  archetype: LayoutArchetype;
  description: string;
  tagline: string;
  tags: string[];
  accentColor: string;
  palette: { name: string; hex: string; role: string }[];
  fonts: { display: string; body: string; googleFontsUrl: string };
  sections: string[]; // e.g. ['nav', 'hero', 'bento', 'stats', 'footer']
  isFavorite?: boolean;
  isRecent?: boolean;
}
