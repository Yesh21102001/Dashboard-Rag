import { FileItem, NavItem, TreeFolder } from "@/types";

export const mainNavItems: NavItem[] = [
  { id: "knowledge-base", label: "Knowledge Base", icon: "database", href: "/knowledge-base", active: true },
  { id: "user-stories", label: "User Stories", icon: "account_tree", href: "/user-stories" },
  { id: "test-cases", label: "Test Cases", icon: "rule", href: "/test-cases" },
  { id: "releases", label: "Releases", icon: "rocket_launch", href: "/releases" },
  { id: "defects", label: "Defects", icon: "bug_report", href: "/defects" },
  { id: "traceability", label: "Traceability", icon: "grid_on", href: "/traceability" },
  { id: "analytics", label: "Analytics", icon: "query_stats", href: "/analytics" },
];

export const footerNavItems: NavItem[] = [
  { id: "settings", label: "Settings", icon: "settings", href: "/settings" },
  { id: "support", label: "Support", icon: "help", href: "/support" },
];

export const connectedFolders: TreeFolder[] = [
  {
    id: "srs-brs",
    name: "SRS / BRS Documents",
    icon: "folder_open",
    iconColorClass: "text-tertiary-fixed-dim",
    expanded: true,
    children: [
      { id: "q1-features", name: "Q1_Features.pdf" },
      { id: "core-logic-v2", name: "Core_Logic_v2.docx", active: true },
    ],
  },
  {
    id: "brms",
    name: "BRMs",
    icon: "folder",
    iconColorClass: "text-tertiary-fixed-dim",
  },
  {
    id: "figma-exports",
    name: "Figma Exports",
    icon: "design_services",
    iconColorClass: "text-secondary",
  },
  {
    id: "wireframes",
    name: "Wireframes",
    icon: "web",
    iconColorClass: "text-secondary",
  },
  {
    id: "recordings",
    name: "Recordings",
    icon: "video_file",
    iconColorClass: "text-secondary",
  },
  {
    id: "sharepoint-sync",
    name: "SharePoint Sync",
    icon: "cloud",
    iconColorClass: "text-primary-container",
  },
  {
    id: "url-crawlers",
    name: "URL Crawlers",
    icon: "link",
    iconColorClass: "text-primary-container",
  },
  {
    id: "local-uploads",
    name: "Local Uploads",
    icon: "upload_file",
    iconColorClass: "text-primary-container",
  },
];

export const brmsFiles: FileItem[] = [
  {
    id: "q1-features",
    filename: "Q1_Features.pdf",
    icon: "pdf",
    sourceType: "Local Upload",
    ingestionDate: "2023-10-24 14:30",
    syncStatus: "SYNCED",
    progress: 100,
    lastAiScan: "10 mins ago",
    content: "Q1 Features Document\n\n1. User Authentication\n2. Dashboard Overview\n3. Data Analytics\n4. Report Generation\n5. User Management",
  },
  {
    id: "core-logic-v2",
    filename: "Core_Logic_v2.docx",
    icon: "docx",
    sourceType: "SharePoint",
    ingestionDate: "2023-10-25 09:15",
    syncStatus: "PROCESSING",
    progress: 75,
    lastAiScan: "In Progress",
    active: true,
    content: "Core Logic v2 Document\n\nSystem Architecture:\n- Frontend: React/Next.js\n- Backend: Node.js\n- Database: PostgreSQL\n\nKey Components:\n- User Service\n- Auth Module\n- Data Processing Pipeline\n- Report Generator",
  },
];
