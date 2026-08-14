"use client";

import { useState } from "react";
import { EpicTreeNode, TestCaseNode } from "@/types";
import TreeFilterBar from "./TreeFilterBar";
import TestTree from "./TestTree";
import DetailHeader from "./DetailHeader";
import MetadataGrid from "./MetadataGrid";
import TestStepsGrid from "./TestStepsGrid";

function findTestCase(epics: EpicTreeNode[], id: string): TestCaseNode | undefined {
  for (const epic of epics) {
    for (const feature of epic.features) {
      for (const story of feature.userStories) {
        const found = story.testCases.find((tc) => tc.id === id);
        if (found) return found;
      }
    }
  }
  return undefined;
}

interface TestCasesWorkspaceProps {
  epics: EpicTreeNode[];
  initialSelectedId: string;
}

export default function TestCasesWorkspace({
  epics,
  initialSelectedId,
}: TestCasesWorkspaceProps) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const selected = findTestCase(epics, selectedId);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Pane: Tree View */}
      <div className="w-72 flex flex-col bg-surface-container-lowest border-r border-outline-variant shrink-0">
        <TreeFilterBar />
        <TestTree epics={epics} selectedTestCaseId={selectedId} onSelectTestCase={setSelectedId} />
      </div>

      {/* Resizer */}
      <div className="split-pane-divider" />

      {/* Right Pane: Data Grid & Details */}
      <div className="flex-1 flex flex-col bg-background min-w-0">
        {selected ? (
          <>
            <DetailHeader testCase={selected} />
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              <MetadataGrid testCase={selected} />
              <TestStepsGrid testCase={selected} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-on-surface-variant font-body-sm text-body-sm">
            Select a test case from the tree to view its details.
          </div>
        )}
      </div>
    </div>
  );
}
