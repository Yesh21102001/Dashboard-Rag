"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import AppShell from "@/components/layout/AppShell";
import Toolbar from "@/components/user-stories/Toolbar";
import PageHeader from "@/components/user-stories/PageHeader";
import GridHeaderRow from "@/components/user-stories/GridHeaderRow";
import StoriesGrid from "@/components/user-stories/StoriesGrid";
import StatusBar from "@/components/user-stories/StatusBar";
import NewStoryModal from "@/components/user-stories/NewStoryModal";
import HierarchyPanel from "@/components/folders/HierarchyPanel";
import { EpicRowData, FolderNode } from "@/types";
export default function UserStoriesPage() {
  const [epics, setEpics] = useState<EpicRowData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<FolderNode | null>(null);

  useEffect(() => {
    const loadStories = async () => {
      await fetchStories();
    };
    loadStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data } = await axiosInstance.get("/user-stories");
      console.log("Fetched stories:", data.stories);

      if (data.success && data.stories && data.stories.length > 0) {
        const stories = data.stories.map((s: any) => {
          const acStr = s.acceptanceCriteria || "";
          const acLines = acStr.split("\n");
          const given = acLines.find((l: string) => l.startsWith("Given:"))?.replace("Given:", "").trim() || "";
          const when = acLines.find((l: string) => l.startsWith("When:"))?.replace("When:", "").trim() || "";
          const then = acLines.find((l: string) => l.startsWith("Then:"))?.replace("Then:", "").trim() || "";

          return {
            id: s._id,
            code: s.code,
            title: s.title,
            status: s.status,
            preFlow: s.preFlow,
            scopeIn: s.scopeIn,
            scopeOut: s.scopeOut,
            acceptanceCriteria: { given, when, then },
            reqMapping: Array.isArray(s.reqMapping) ? s.reqMapping : [],
            assignee: s.assignee ? { name: s.assignee, initials: s.assignee.substring(0, 2).toUpperCase() } : undefined,
            syncedWith: null,
          };
        });

        // Directly create epic with stories
        const epic: EpicRowData = {
          id: "epic-1",
          code: "EPIC-AUTH",
          title: "Authentication Rewrite",
          status: "In Progress",
          scope: "System Wide",
          reqMapping: "SRS-AUTH-001",
          assignee: null as any,
          features: [
            {
              id: "feat-1",
              code: "FEAT-LOGIN",
              title: "User Stories",
              status: "In Progress",
              preFlow: "User interaction",
              scope: "",
              reqMapping: "REQ-G-SSO",
              assignee: null,
              stories,
            },
          ],
        };

        console.log("✓ Setting epics with stories:", stories.length, "stories");
        setEpics([epic]);
      } else {
        console.log("No stories found");
        setEpics([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
      setEpics([]);
      setLoading(false);
    }
  };

  const handleCreate = async (newStory: any) => {
    try {
      const { data } = await axiosInstance.post("/user-stories", {
        code: newStory.code,
        title: newStory.title,
        preFlow: newStory.preFlow || "N/A",
        scopeIn: newStory.scopeIn || "",
        scopeOut: newStory.scopeOut || "",
        reqMapping: newStory.reqMapping,
        acceptanceCriteria: newStory.actionAcceptanceCriteria || "",
        assignee: newStory.assignee?.name || "",
        status: newStory.status,
      });

      if (data.success) {
        await fetchStories();
      }
    } catch (error) {
      console.error("Failed to create story:", error);
      alert("Failed to create story");
    }
  };

  return (
    <AppShell>
      <PageHeader />
      <Toolbar epicLabel="Epic: Authentication Rewrite" onNewStory={() => setModalOpen(true)} />

      <div className="flex flex-1 overflow-hidden gap-4 bg-surface-container-lowest">
        {/* Folder Sidebar */}
        <div className="w-80 border-r border-outline bg-surface-container-lowest flex flex-col">
          <HierarchyPanel
            moduleType="userStories"
            onSelectItem={setSelectedFolder}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto relative">
          <div className="min-w-[1400px] w-full">
            <GridHeaderRow />
            <StoriesGrid epics={epics} />
          </div>
        </div>
      </div>

      <StatusBar totalRows={epics[0]?.features[0]?.stories.length || 0} selected={0} />
      <NewStoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
        selectedFolder={selectedFolder?._id}
      />
    </AppShell>
  );
}
