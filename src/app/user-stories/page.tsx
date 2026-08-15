"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Toolbar from "@/components/user-stories/Toolbar";
import PageHeader from "@/components/user-stories/PageHeader";
import GridHeaderRow from "@/components/user-stories/GridHeaderRow";
import StoriesGrid from "@/components/user-stories/StoriesGrid";
import StatusBar from "@/components/user-stories/StatusBar";
import NewStoryModal from "@/components/user-stories/NewStoryModal";
import { userStoriesEpics } from "@/data/userStoriesData";

export default function UserStoriesPage() {
  const [epics, setEpics] = useState(userStoriesEpics);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = (newStory: any) => {
    setEpics((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (next.length === 0) return [
        {
          id: `epic-${Date.now()}`,
          code: "EPIC-NEW",
          title: "New Epic",
          status: "New",
          scope: "",
          reqMapping: "",
          assignee: null,
          features: [
            {
              id: `feat-${Date.now()}`,
              code: "FEAT-NEW",
              title: "New Feature",
              status: "New",
              preFlow: "",
              scope: "",
              reqMapping: "",
              assignee: null,
              stories: [newStory],
            },
          ],
        },
      ];

      const firstEpic = next[0];
      if (!firstEpic.features || firstEpic.features.length === 0) {
        firstEpic.features = [
          { id: `feat-${Date.now()}`, code: "FEAT-NEW", title: "New Feature", status: "New", preFlow: "", scope: "", reqMapping: "", assignee: null, stories: [newStory] },
        ];
      } else {
        firstEpic.features[0].stories.push(newStory);
      }
      return next;
    });
  };

  return (
    <AppShell>
      <PageHeader />
      <Toolbar epicLabel="Epic: Authentication Rewrite" onNewStory={() => setModalOpen(true)} />

      <div className="flex-1 overflow-auto bg-surface-container-lowest relative">
        <div className="min-w-[1400px] w-full">
          <GridHeaderRow />
          <StoriesGrid epics={epics} />
        </div>
      </div>

      <StatusBar totalRows={142} selected={0} />
      <NewStoryModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />
    </AppShell>
  );
}
