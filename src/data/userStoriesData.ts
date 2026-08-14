import { EpicRowData } from "@/types";

export const userStoriesEpics: EpicRowData[] = [
  {
    id: "epic-142",
    code: "EPIC-142",
    title: "OAuth2 Provider Integration",
    status: "In Progress",
    scope: "System Wide",
    reqMapping: "SRS-AUTH-001",
    assignee: {
      name: "S. Miller",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCCeslfwEVSbF4w03b1OqvPtR1fejMWoxGQg3R9jzsShxCoTb_Ub99vod-ZBmEntB9qOJwPofD3ewBSOTyIJOY7vDnUMiRMAYl_T_ioq346SHscHlM_Q4PpP6u663jtPCyy2zgnVBNpVA-3XfDWA0cZ4WeN6_UAhrEOZBFUK1wjH9HgMCIvaFniRdVVW-_0yN5USWsXucwkKCsKRCunf5Pkx73KQVqbbokzzHANON3ftROASmAicpVb",
    },
    features: [
      {
        id: "feat-890",
        code: "FEAT-890",
        title: "Google SSO Flow",
        status: "Ready for Review",
        preFlow: "User on login screen",
        scope: "Web App Only",
        reqMapping: "REQ-G-SSO",
        assignee: null, // Unassigned
        stories: [
          {
            id: "us-1204",
            code: "US",
            title: "US-1204: Render Google Sign-in Button",
            status: "Ready for Review",
            preFlow: "User navigates to /login",
            acceptanceCriteria: {
              given: "User is on login page",
              when: "Page renders",
              then: "Display standard Google btn",
            },
            scopeIn: "Standard web styling",
            scopeOut: "Custom branding",
            reqMapping: ["REQ-UI-44", "DS-COMP-09"],
            assignee: { name: "J. Doe", initials: "JD" },
            syncedWith: "Synced with SRS v2.1",
          },
        ],
      },
    ],
  },
];
