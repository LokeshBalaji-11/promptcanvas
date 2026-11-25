export interface RouteMeta {
  path: string;
  label: string;
  icon: string;
}

export interface TemplateManifest {
  id: string;
  category: string;
  title: string;
  routes: RouteMeta[];
}

export const TEMPLATE_MANIFESTS: Record<string, TemplateManifest> = {
  students: {
    id: 'students',
    category: 'Students',
    title: 'Academics & Learning Portal',
    routes: [
      { path: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: 'courses', label: 'Courses Catalog', icon: 'BookOpen' },
      { path: 'assignments', label: 'Assignments', icon: 'FileText' },
      { path: 'grades', label: 'Grades & GPA', icon: 'GraduationCap' },
      { path: 'calendar', label: 'Timetable', icon: 'Calendar' },
      { path: 'profile', label: 'Demo Profile', icon: 'User' }
    ]
  },
  business: {
    id: 'business',
    category: 'Business',
    title: 'B2B Enterprise SaaS',
    routes: [
      { path: 'solutions', label: 'Solutions', icon: 'Briefcase' },
      { path: 'features', label: 'Features', icon: 'Zap' },
      { path: 'pricing', label: 'Pricing & Tiers', icon: 'CreditCard' },
      { path: 'roi', label: 'ROI Calculator', icon: 'Calculator' },
      { path: 'cases', label: 'Case Studies', icon: 'FileSpreadsheet' },
      { path: 'demo', label: 'Book Demo', icon: 'CalendarCheck' },
      { path: 'contact', label: 'Contact Sales', icon: 'Mail' }
    ]
  },
  restaurant: {
    id: 'restaurant',
    category: 'Restaurant & Cafe',
    title: 'Gourmet Bistro & Cafe',
    routes: [
      { path: 'menu', label: 'Menu & Add-to-Cart', icon: 'Utensils' },
      { path: 'cart', label: 'Cart & Checkout', icon: 'ShoppingCart' },
      { path: 'reservations', label: 'Table Booking', icon: 'Calendar' },
      { path: 'specials', label: 'Chef Specials', icon: 'Sparkles' },
      { path: 'gallery', label: 'Gallery', icon: 'Image' },
      { path: 'hours', label: 'Hours & Location', icon: 'MapPin' }
    ]
  },
  clubs: {
    id: 'clubs',
    category: 'Clubs & Communities',
    title: 'Community Hub & DAO',
    routes: [
      { path: 'events', label: 'Events & RSVP', icon: 'Calendar' },
      { path: 'members', label: 'Members Directory', icon: 'Users' },
      { path: 'join', label: 'Join Community', icon: 'UserPlus' },
      { path: 'announcements', label: 'Announcements', icon: 'Bell' },
      { path: 'gallery', label: 'Photo Gallery', icon: 'Camera' },
      { path: 'leaderboard', label: 'Points Leaderboard', icon: 'Trophy' }
    ]
  },
  events: {
    id: 'events',
    category: 'Events & Hackathons',
    title: 'Global Tech Summit & Hackathon',
    routes: [
      { path: 'schedule', label: 'Schedule & Days', icon: 'Calendar' },
      { path: 'speakers', label: 'Speakers', icon: 'Mic' },
      { path: 'tracks', label: 'Tracks & Prizes', icon: 'Award' },
      { path: 'register', label: 'Team Registration', icon: 'Users' },
      { path: 'sponsors', label: 'Sponsors', icon: 'ShieldCheck' },
      { path: 'faq', label: 'FAQ & Info', icon: 'HelpCircle' }
    ]
  },
  education: {
    id: 'education',
    category: 'Education',
    title: 'University Admissions & Faculty',
    routes: [
      { path: 'programs', label: 'Programs & Degrees', icon: 'BookOpen' },
      { path: 'admissions', label: 'Apply Online', icon: 'FileText' },
      { path: 'faculty', label: 'Faculty Directory', icon: 'UserCheck' },
      { path: 'fees', label: 'Fee Calculator', icon: 'Calculator' },
      { path: 'news', label: 'Campus News', icon: 'Newspaper' },
      { path: 'status', label: 'Check Application', icon: 'Search' }
    ]
  },
  nonprofit: {
    id: 'nonprofit',
    category: 'Nonprofit',
    title: 'Global Impact & Relief',
    routes: [
      { path: 'campaigns', label: 'Active Campaigns', icon: 'Heart' },
      { path: 'donate', label: 'Donate Flow', icon: 'DollarSign' },
      { path: 'impact', label: 'Impact Dashboard', icon: 'Activity' },
      { path: 'volunteer', label: 'Volunteer Signup', icon: 'UserPlus' },
      { path: 'stories', label: 'Success Stories', icon: 'BookOpen' }
    ]
  },
  portfolio: {
    id: 'portfolio',
    category: 'Portfolio',
    title: 'Creative Director Portfolio',
    routes: [
      { path: 'projects', label: 'Projects Grid', icon: 'Grid' },
      { path: 'about', label: 'About & Resume', icon: 'User' },
      { path: 'skills', label: 'Skills & Stack', icon: 'Cpu' },
      { path: 'testimonials', label: 'Testimonials', icon: 'MessageSquare' },
      { path: 'contact', label: 'Contact', icon: 'Send' }
    ]
  },
  startup: {
    id: 'startup',
    category: 'Startup',
    title: 'Next-Gen AI Startup',
    routes: [
      { path: 'waitlist', label: 'Waitlist Signup', icon: 'UserPlus' },
      { path: 'roadmap', label: 'Roadmap & Votes', icon: 'Map' },
      { path: 'changelog', label: 'Changelog', icon: 'GitCommit' },
      { path: 'team', label: 'Founding Team', icon: 'Users' },
      { path: 'investors', label: 'Press & Investors', icon: 'Briefcase' }
    ]
  },
  fashion: {
    id: 'fashion',
    category: 'Fashion',
    title: 'Vogue & Apparel Store',
    routes: [
      { path: 'lookbook', label: 'Lookbook', icon: 'Camera' },
      { path: 'shop', label: 'Catalog & Filters', icon: 'ShoppingBag' },
      { path: 'wishlist', label: 'Wishlist (♥)', icon: 'Heart' },
      { path: 'cart', label: 'Cart & Checkout', icon: 'ShoppingCart' }
    ]
  },
  tech: {
    id: 'tech',
    category: 'Tech/SaaS',
    title: 'Developer Cloud & API',
    routes: [
      { path: 'docs', label: 'Documentation', icon: 'Book' },
      { path: 'playground', label: 'API Playground', icon: 'Terminal' },
      { path: 'status', label: 'System Status', icon: 'Activity' },
      { path: 'pricing', label: 'Pricing Plans', icon: 'Tag' },
      { path: 'changelog', label: 'Release Notes', icon: 'GitPullRequest' }
    ]
  },
  creator: {
    id: 'creator',
    category: 'Creator / Blog',
    title: 'Deep Tech Substack & Blog',
    routes: [
      { path: 'posts', label: 'Articles & Posts', icon: 'FileText' },
      { path: 'about', label: 'About Author', icon: 'User' },
      { path: 'newsletter', label: 'Newsletter', icon: 'Mail' }
    ]
  }
};
