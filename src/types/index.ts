export type SyncStatus = "SYNCED" | "PROCESSING";

export interface FileItem {
  id: string;
  filename: string;
  icon: "pdf" | "docx";
  sourceType: string;
  ingestionDate: string;
  syncStatus: SyncStatus;
  progress: number; // 0-100
  lastAiScan: string;
  active?: boolean;
  content?: string;
  fileUrl?: string;
  file?: File;
}

export interface TreeFile {
  id: string;
  name: string;
  active?: boolean;
}

export interface TreeFolder {
  id: string;
  name: string;
  icon: string;
  iconColorClass: string;
  expanded?: boolean;
  children?: TreeFile[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}

/* User Stories agile grid types */

export interface AcceptanceCriteria {
  given: string;
  when: string;
  then: string;
}

export interface Assignee {
  name: string;
  initials?: string;
  avatarUrl?: string;
}

export const STORY_STATUS_OPTIONS = [
  "Draft",
  "Ready for Review",
  "Approved",
  "Rejected",
  "On Hold",
  "Cancelled",
] as const;

export interface UserStoryRowData {
  id: string;
  code: string;
  title: string;
  status: (typeof STORY_STATUS_OPTIONS)[number];
  preFlow: string;
  acceptanceCriteria: AcceptanceCriteria;
  scopeIn: string;
  scopeOut: string;
  reqMapping: string[];
  assignee?: Assignee;
  syncedWith?: string;
}

export interface FeatureRowData {
  id: string;
  code: string;
  title: string;
  status: string;
  preFlow: string;
  scope: string;
  reqMapping: string;
  assignee?: Assignee | null;
  stories: UserStoryRowData[];
}

export interface EpicRowData {
  id: string;
  code: string;
  title: string;
  status: string;
  scope: string;
  reqMapping: string;
  assignee: Assignee;
  features: FeatureRowData[];
}

/* Test Cases page types */

export interface TestStep {
  id: string;
  order: number;
  action: string;
  expected: string;
  expectedIsCode?: boolean;
}

export interface TraceLink {
  icon: string;
  label: string;
  tag: string;
  variant: "link" | "system";
}

export interface TestCaseNode {
  id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  ragGenUnlocked: boolean;
  ragGenReason: string;
  preconditions: string[];
  links: TraceLink[];
  steps: TestStep[];
}

export interface UserStoryTreeNode {
  id: string;
  code: string;
  title: string;
  approvalTag: "Appr" | "Draft";
  locked?: boolean;
  lockedReason?: string;
  testCases: TestCaseNode[];
}

export interface FeatureTreeNode {
  id: string;
  title: string;
  userStories: UserStoryTreeNode[];
}

export interface EpicTreeNode {
  id: string;
  code: string;
  title: string;
  features: FeatureTreeNode[];
}

/* Folder Hierarchy Types */

export interface FolderNode {
  _id: string;
  name: string;
  type: "folder" | "epic" | "feature";
  parentId: string | null;
  moduleType: "userStories" | "testCases";
  description?: string;
  children?: FolderNode[];
}
