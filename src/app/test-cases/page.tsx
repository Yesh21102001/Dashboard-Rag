"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import PageToolbar from "@/components/test-cases/PageToolbar";
import TestCasesWorkspace from "@/components/test-cases/TestCasesWorkspace";
import NewTestCaseModal from "@/components/test-cases/NewTestCaseModal";
import { testCasesTree, tc801 } from "@/data/testCasesData";
import { EpicTreeNode, TestCaseNode } from "@/types";

export default function TestCasesPage() {
  const [epics, setEpics] = useState<EpicTreeNode[]>(testCasesTree);
  const [selectedId, setSelectedId] = useState(tc801.id);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateTestCase = (newTestCase: TestCaseNode) => {
    setEpics((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as EpicTreeNode[];

      const targetEpic = next[0];
      const targetFeature = targetEpic?.features?.[0];
      const targetStory = targetFeature?.userStories?.[0];

      if (!targetStory) {
        return prev;
      }

      targetStory.testCases = [...targetStory.testCases, newTestCase];
      return next;
    });

    setSelectedId(newTestCase.id);
  };

  return (
    <AppShell>
      <PageToolbar workspaceLabel="Payment Gateway RAG" onNewTestCase={() => setModalOpen(true)} />
      <TestCasesWorkspace epics={epics} selectedId={selectedId} onSelectId={setSelectedId} />
      <NewTestCaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(payload) => {
          handleCreateTestCase(payload);
          setModalOpen(false);
        }}
      />
    </AppShell>
  );
}
