export interface UxPattern {
  id: string;
  category: 'Navigation' | 'Layout' | 'Content Density' | 'Interaction';
  name: string;
  description: string;
  defaultConfig: {
    navPosition?: 'top' | 'left' | 'bottom' | 'floating';
    columns?: number;
    gap?: number;
    density?: 'compact' | 'comfortable' | 'spacious';
    contentWidth?: 'full' | 'contained' | 'narrow';
    stickyHeader?: boolean;
  };
  accessibilityChecklist: string[];
}

export const UX_PATTERNS: UxPattern[] = [
  // Navigation (10)
  { id: 'nav-top', category: 'Navigation', name: 'Top Bar', description: 'Classic horizontal top header navigation.', defaultConfig: { navPosition: 'top', stickyHeader: true }, accessibilityChecklist: ['Touch targets ≥ 44px', 'Keyboard focus ring visible', 'ARIA landmark navigation'] },
  { id: 'nav-left', category: 'Navigation', name: 'Left Sidebar', description: 'Vertical persistent left-hand navigation rail.', defaultConfig: { navPosition: 'left' }, accessibilityChecklist: ['Collapsible state aria-expanded', 'Logical tab order', 'High contrast selected state'] },
  { id: 'nav-rail', category: 'Navigation', name: 'Collapsible Rail', description: 'Icon-only rail expanding on hover or click.', defaultConfig: { navPosition: 'left' }, accessibilityChecklist: ['Tooltip labels for screen readers', 'Smooth CSS transition', 'Focus trap when expanded'] },
  { id: 'nav-bottom', category: 'Navigation', name: 'Bottom Tab Bar', description: 'Mobile-first bottom fixed navigation bar.', defaultConfig: { navPosition: 'bottom' }, accessibilityChecklist: ['Thumb-zone optimized', 'Minimum 48px touch height', 'Active indicator icon'] },
  { id: 'nav-cmd', category: 'Navigation', name: 'Command-Palette-First', description: 'Keyboard-driven command menu primary navigation.', defaultConfig: { navPosition: 'top' }, accessibilityChecklist: ['Cmd+K global listener', 'Aria-combobox pattern', 'Esc to close'] },
  { id: 'nav-pill', category: 'Navigation', name: 'Floating Pill Nav', description: 'Floating frosted glass island navigation header.', defaultConfig: { navPosition: 'floating' }, accessibilityChecklist: ['Backdrop blur contrast ratio', 'Fixed positioning z-index layering', 'Responsive wrap'] },
  { id: 'nav-mega', category: 'Navigation', name: 'Mega-Menu', description: 'Expanded multi-column dropdown navigation.', defaultConfig: { navPosition: 'top' }, accessibilityChecklist: ['Hover intent delay', 'Keyboard arrow navigation', 'Submenu region aria-label'] },
  { id: 'nav-hamburger', category: 'Navigation', name: 'Hamburger Overlay', description: 'Full-screen animated slide-out menu drawer.', defaultConfig: { navPosition: 'top' }, accessibilityChecklist: ['Body scroll lock when open', 'Focus trap inside overlay', 'Close button accessibility'] },
  { id: 'nav-sticky-index', category: 'Navigation', name: 'Sticky Side Index', description: 'In-page anchor navigation index sidebar.', defaultConfig: { navPosition: 'left' }, accessibilityChecklist: ['IntersectionObserver active state', 'Smooth scroll anchor behavior', 'Heading hierarchy'] },
  { id: 'nav-split', category: 'Navigation', name: 'Split Nav (Logo Center)', description: 'Balanced layout with centered logo and split links.', defaultConfig: { navPosition: 'top' }, accessibilityChecklist: ['Symmetric flex spacing', 'Screen reader order preservation', 'Touch target spacing'] },

  // Layout (10)
  { id: 'layout-bento', category: 'Layout', name: 'Bento Grid', description: 'Asymmetric multi-card grid layout.', defaultConfig: { columns: 3, gap: 24, contentWidth: 'contained' }, accessibilityChecklist: ['Grid item tab order', 'Responsive reflow on mobile', 'Semantic section tags'] },
  { id: 'layout-editorial', category: 'Layout', name: 'Editorial Columns', description: 'Multi-column magazine style layout.', defaultConfig: { columns: 2, gap: 32 }, accessibilityChecklist: ['Readable line length (65ch)', 'Proper heading scaling', 'Column balance'] },
  { id: 'layout-dashboard', category: 'Layout', name: 'Dashboard Grid', description: 'Modular widget dashboard layout.', defaultConfig: { columns: 4, gap: 16 }, accessibilityChecklist: ['Widget drag handles labeled', 'Live region status updates', 'High contrast cards'] },
  { id: 'layout-masonry', category: 'Layout', name: 'Masonry', description: 'Staggered vertical item layout.', defaultConfig: { columns: 3, gap: 20 }, accessibilityChecklist: ['Visual flow order matches DOM order', 'Image alt tags', 'Lazy loading'] },
  { id: 'layout-story', category: 'Layout', name: 'Single-Column Story', description: 'Focused long-form narrative layout.', defaultConfig: { contentWidth: 'narrow' }, accessibilityChecklist: ['Optimal typography measure', 'Progress indicator', 'Contrast compliance'] },
  { id: 'layout-split', category: 'Layout', name: 'Split Screen', description: '50/50 dual pane immersive layout.', defaultConfig: { columns: 2, gap: 0 }, accessibilityChecklist: ['Independent scroll regions', 'Stacked order on mobile', 'Landmark roles'] },
  { id: 'layout-overlap', category: 'Layout', name: 'Asymmetric Overlap', description: 'Dynamic layered card overlap layout.', defaultConfig: { columns: 2, gap: 16 }, accessibilityChecklist: ['Z-index stacking order', 'Text readability over backdrops', 'Focus ring visibility'] },
  { id: 'layout-horizontal', category: 'Layout', name: 'Horizontal-Scroll Sections', description: 'Pan-scroll card carousels.', defaultConfig: { columns: 3, gap: 24 }, accessibilityChecklist: ['Keyboard scroll arrow support', 'Scroll snap container', 'Aria scroll region'] },
  { id: 'layout-stack', category: 'Layout', name: 'Card Stack', description: 'Depth-layered card stack interface.', defaultConfig: { columns: 1, gap: 12 }, accessibilityChecklist: ['Stack depth aria-hidden', 'Top card focusability', 'Smooth elevation transition'] },
  { id: 'layout-timeline', category: 'Layout', name: 'Timeline', description: 'Chronological milestone node tree.', defaultConfig: { columns: 1, gap: 24 }, accessibilityChecklist: ['Node sequence semantics', 'Marker contrast', 'Date formatting'] },

  // Content Density & Components (10)
  { id: 'density-table', category: 'Content Density', name: 'Compact Table', description: 'High-density tabular data view.', defaultConfig: { density: 'compact' }, accessibilityChecklist: ['Table caption and scope', 'Keyboard row selection', 'Sticky header'] },
  { id: 'density-cards', category: 'Content Density', name: 'Cards with Actions', description: 'Rich media cards with action button bars.', defaultConfig: { density: 'comfortable' }, accessibilityChecklist: ['Card focus outline', 'Action button aria-labels', 'Interactive hit target'] },
  { id: 'density-list-detail', category: 'Content Density', name: 'List-Detail', description: 'Master-detail split pane interface.', defaultConfig: { density: 'comfortable' }, accessibilityChecklist: ['Split pane aria-controls', 'Keyboard item selection', 'Focus persistence'] },
  { id: 'density-kanban', category: 'Content Density', name: 'Kanban Board', description: 'Multi-column drag-and-drop state board.', defaultConfig: { density: 'comfortable' }, accessibilityChecklist: ['Column landmark roles', 'Keyboard card moving', 'Live region announcements'] },
  { id: 'density-accordion', category: 'Content Density', name: 'Accordion-First', description: 'Collapsible section panels.', defaultConfig: { density: 'compact' }, accessibilityChecklist: ['Aria-expanded states', 'Header button semantics', 'Keyboard navigation'] },
  { id: 'density-tabs', category: 'Content Density', name: 'Tabs-First', description: 'Tabbed panel content switcher.', defaultConfig: { density: 'comfortable' }, accessibilityChecklist: ['Tablist role and tab roles', 'Arrow key tab switching', 'Aria-selected state'] },
  { id: 'density-stepper', category: 'Content Density', name: 'Stepper Forms', description: 'Multi-step wizard form layout.', defaultConfig: { density: 'comfortable' }, accessibilityChecklist: ['Step progress aria-current', 'Validation error focus shift', 'Back/Next keyboard support'] },
  { id: 'density-inline', category: 'Content Density', name: 'Inline-Edit Forms', description: 'Click-to-edit immediate form controls.', defaultConfig: { density: 'compact' }, accessibilityChecklist: ['Edit mode aria-live', 'Enter to save, Esc to cancel', 'Focus management'] },
  { id: 'density-labels', category: 'Content Density', name: 'Floating vs Inline Labels', description: 'Animated floating input labels.', defaultConfig: { density: 'comfortable' }, accessibilityChecklist: ['Label association via for/id', 'Placeholder contrast', 'Focus state color change'] },
  { id: 'density-empty', category: 'Content Density', name: 'Empty-State Variants', description: 'Polished zero-data illustrative states.', defaultConfig: { density: 'spacious' }, accessibilityChecklist: ['Descriptive message', 'Clear call-to-action button', 'Icon aria-hidden'] },

  // Interaction Patterns (10)
  { id: 'interact-drawer', category: 'Interaction', name: 'Drawer vs Modal', description: 'Side sheet vs centered overlay dialogs.', defaultConfig: {}, accessibilityChecklist: ['Focus trap inside modal', 'Esc key dismissal', 'Backdrop click to close'] },
  { id: 'interact-toast', category: 'Interaction', name: 'Toast vs Inline Feedback', description: 'Ephemeral floating alert notifications.', defaultConfig: {}, accessibilityChecklist: ['Aria-live polite announcement', 'Dismiss button', 'Auto-dismiss timer'] },
  { id: 'interact-optimistic', category: 'Interaction', name: 'Optimistic UI', description: 'Instant visual update with background sync.', defaultConfig: {}, accessibilityChecklist: ['Pending state indicator', 'Rollback error recovery', 'Screen reader status'] },
  { id: 'interact-drag', category: 'Interaction', name: 'Drag-and-Drop', description: 'Direct manipulation reordering.', defaultConfig: {}, accessibilityChecklist: ['Draggable attributes', 'Keyboard reorder fallback', 'Drop target indicator'] },
  { id: 'interact-shortcuts', category: 'Interaction', name: 'Keyboard Shortcuts Layer', description: 'Power-user hotkey overlay map.', defaultConfig: {}, accessibilityChecklist: ['Modal cheat sheet dialog', 'Global key listener', 'No collision with browser shortcuts'] },
  { id: 'interact-infinite', category: 'Interaction', name: 'Infinite Scroll vs Pagination', description: 'Continuous feed vs page selector.', defaultConfig: {}, accessibilityChecklist: ['Load more button alternative', 'Scroll position preservation', 'Announce new items'] },
  { id: 'interact-skeleton', category: 'Interaction', name: 'Skeleton-First Loading', description: 'Shimmer placeholder loading states.', defaultConfig: {}, accessibilityChecklist: ['Aria-busy=true', 'Reduced motion respect', 'Smooth transition on load'] },
  { id: 'interact-undo', category: 'Interaction', name: 'Undo-First Actions', description: 'Action execution with immediate undo snackbar.', defaultConfig: {}, accessibilityChecklist: ['Undo button focus priority', 'Timeout countdown', 'State restoration'] },
  { id: 'interact-tooltip', category: 'Interaction', name: 'Contextual Tooltips', description: 'Hover info cards.', defaultConfig: {}, accessibilityChecklist: ['Aria-describedby linkage', 'Mouse and keyboard trigger', 'No content truncation'] },
  { id: 'interact-spotlight', category: 'Interaction', name: 'Spotlight Search', description: 'Global modal search index.', defaultConfig: {}, accessibilityChecklist: ['Autofocus input', 'Arrow key result navigation', 'Result count announcement'] }
];
