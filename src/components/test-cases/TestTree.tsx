"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { EpicTreeNode } from "@/types";
import TestCaseRow from "./TestCaseRow";

interface TestTreeProps {
  epics: EpicTreeNode[];
  selectedTestCaseId: string;
  onSelectTestCase: (id: string) => void;
}

export default function TestTree({ epics, selectedTestCaseId, onSelectTestCase }: TestTreeProps) {
  // Default expanded: every node that actually has children.
  const defaultExpanded = new Set<string>();
  epics.forEach((epic) => {
    defaultExpanded.add(epic.id);
    epic.features.forEach((feature) => {
      defaultExpanded.add(feature.id);
      feature.userStories.forEach((story) => {
        if (story.testCases.length > 0) defaultExpanded.add(story.id);
      });
    });
  });

  const [expanded, setExpanded] = useState<Set<string>>(defaultExpanded);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 select-none font-body-sm text-body-sm">
      {epics.map((epic) => {
        const epicExpanded = expanded.has(epic.id);
        return (
          <div key={epic.id} className="relative mb-1">
            <div
              onClick={() => toggle(epic.id)}
              className="flex items-center gap-1 hover:bg-surface-container p-1 rounded-DEFAULT cursor-pointer"
            >
              <Icon
                name="chevron_right"
                className={cn(
                  "text-on-surface-variant text-sm transition-transform",
                  epicExpanded && "rotate-90"
                )}
              />
              <Icon name="flag" className="text-primary text-sm" />
              <span className="font-semibold text-on-surface truncate">
                {epic.code}: {epic.title}
              </span>
            </div>

            {epicExpanded &&
              epic.features.map((feature) => {
                const featureExpanded = expanded.has(feature.id);
                return (
                  <div key={feature.id} className="pl-4 mt-1 relative tree-line">
                    <div
                      onClick={() => toggle(feature.id)}
                      className="flex items-center gap-1 hover:bg-surface-container p-1 rounded-DEFAULT cursor-pointer"
                    >
                      <Icon
                        name="chevron_right"
                        className={cn(
                          "text-on-surface-variant text-sm transition-transform",
                          featureExpanded && "rotate-90"
                        )}
                      />
                      <Icon name="layers" className="text-on-surface-variant text-sm" />
                      <span className="text-on-surface truncate">{feature.title}</span>
                    </div>

                    {featureExpanded &&
                      feature.userStories.map((story, idx) => {
                        const isLast = idx === feature.userStories.length - 1;
                        const storyExpanded = expanded.has(story.id);
                        const hasChildren = story.testCases.length > 0;

                        return (
                          <div
                            key={story.id}
                            className={cn(
                              "pl-4 mt-1 relative tree-line",
                              isLast && "tree-item-last"
                            )}
                          >
                            <div
                              onClick={() => hasChildren && toggle(story.id)}
                              className={cn(
                                "flex items-center gap-1 hover:bg-surface-container p-1 rounded-DEFAULT cursor-pointer",
                                story.locked && "opacity-70"
                              )}
                            >
                              <Icon
                                name="chevron_right"
                                className={cn(
                                  "text-on-surface-variant text-sm transition-transform",
                                  storyExpanded && "rotate-90"
                                )}
                              />
                              <Icon name="auto_stories" className="text-secondary text-sm" />
                              <span className="text-on-surface truncate">
                                {story.code}: {story.title}
                              </span>
                              <span
                                className={cn(
                                  "ml-auto text-[10px] px-1 rounded uppercase tracking-wider font-bold",
                                  story.approvalTag === "Appr"
                                    ? "bg-secondary-container text-on-secondary-container"
                                    : "bg-surface-dim text-on-surface-variant"
                                )}
                              >
                                {story.approvalTag}
                              </span>
                              {story.locked && (
                                <Icon
                                  name="lock"
                                  className="text-error text-sm ml-1"
                                  filled={false}
                                />
                              )}
                            </div>

                            {storyExpanded && hasChildren && (
                              <div className="pl-6 mt-1 relative">
                                {story.testCases.map((tc) => (
                                  <TestCaseRow
                                    key={tc.id}
                                    testCase={tc}
                                    selected={tc.id === selectedTestCaseId}
                                    onSelect={() => onSelectTestCase(tc.id)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
