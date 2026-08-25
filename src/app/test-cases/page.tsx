"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import AppShell from "@/components/layout/AppShell";
import PageToolbar from "@/components/test-cases/PageToolbar";
import TestCasesWorkspace from "@/components/test-cases/TestCasesWorkspace";
import NewTestCaseModal from "@/components/test-cases/NewTestCaseModal";
import HierarchyPanel from "@/components/folders/HierarchyPanel";
import { testCasesTree, tc801 } from "@/data/testCasesData";
import { EpicTreeNode, TestCaseNode, FolderNode } from "@/types";

export default function TestCasesPage() {
  const [epics, setEpics] = useState<EpicTreeNode[]>(testCasesTree);
  const [selectedId, setSelectedId] = useState(tc801.id);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<FolderNode | null>(null);

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    try {
      const { data } = await axiosInstance.get("/test-cases");

      if (data.success && data.testCases) {
        const testCases = data.testCases.map((tc: any) => ({
          id: tc._id,
          code: tc.code,
          title: tc.title,
          description: tc.description,
          status: tc.status,
          ragGenUnlocked: true,
          ragGenReason: "RAG Gen: Unlocked (Manual Entry)",
          preconditions: tc.preConditions,
          links: [],
          steps: (tc.testSteps || []).map((step: any, idx: number) => ({
            id: `step-${idx}`,
            order: step.order || idx + 1,
            action: step.action,
            expected: step.expected,
          })),
        }));

        const epic = testCasesTree[0];
        const feature = epic?.features?.[0];
        const story = feature?.userStories?.[0];

        if (story) {
          story.testCases = testCases;
          setEpics([{ ...epic, features: [{ ...feature, userStories: [story] }] }]);
          if (testCases.length > 0) {
            setSelectedId(testCases[0].id);
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch test cases:", error);
      setLoading(false);
    }
  };

  const handleCreateTestCase = async (newTestCase: TestCaseNode) => {
    try {
      const { data } = await axiosInstance.post("/test-cases", {
        code: newTestCase.code,
        title: newTestCase.title,
        description: newTestCase.description,
        status: newTestCase.status,
        preConditions: newTestCase.preconditions,
        testSteps: newTestCase.steps.map((step) => ({
          order: step.order,
          action: step.action,
          expected: step.expected,
        })),
        expectedResults: newTestCase.steps[0]?.expected || "",
      });

      if (data.success) {
        await fetchTestCases();
        setSelectedId(data.testCase._id);
      }
    } catch (error) {
      console.error("Failed to create test case:", error);
      alert("Failed to create test case");
    }
  };

  return (
    <AppShell>
      <PageToolbar workspaceLabel="Payment Gateway RAG" onNewTestCase={() => setModalOpen(true)} />

      <div className="flex flex-1 overflow-hidden gap-4 bg-surface-container-lowest">
        {/* Folder Sidebar */}
        <div className="w-80 border-r border-outline bg-surface-container-lowest flex flex-col">
          <HierarchyPanel
            moduleType="testCases"
            onSelectItem={setSelectedFolder}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <TestCasesWorkspace epics={epics} selectedId={selectedId} onSelectId={setSelectedId} />
        </div>
      </div>

      <NewTestCaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(payload) => {
          handleCreateTestCase(payload);
          setModalOpen(false);
        }}
        selectedFolder={selectedFolder?._id}
      />
    </AppShell>
  );
}
