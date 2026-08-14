"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { TestCaseNode } from "@/types";

const TABS = ["Details & Steps", "Execution History", "Linked Defects (0)"];

export default function DetailHeader({ testCase }: { testCase: TestCaseNode }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="bg-surface-container-lowest border-b border-outline-variant p-4 shrink-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-primary-container text-on-primary px-2 py-0.5 rounded-DEFAULT font-label-caps text-label-caps">
              {testCase.code}
            </span>
            <h2 className="font-title-sm text-title-sm text-on-surface">{testCase.title}</h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
            {testCase.description}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button className="flex items-center gap-1 px-2 py-1 rounded-DEFAULT bg-secondary-container text-on-secondary-container border border-secondary-container font-label-caps text-label-caps hover:bg-opacity-80 transition-colors">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            {testCase.status}
            <Icon name="arrow_drop_down" className="text-sm ml-1" />
          </button>

          <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-mono bg-surface-variant px-2 py-0.5 rounded-DEFAULT">
            <Icon
              name={testCase.ragGenUnlocked ? "lock_open" : "lock"}
              className={cn("text-[14px]", testCase.ragGenUnlocked && "text-green-600")}
            />
            <span>{testCase.ragGenReason}</span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-outline-variant mt-4 gap-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-2 py-2 font-title-sm text-title-sm transition-colors",
              activeTab === tab
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
