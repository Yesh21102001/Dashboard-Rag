import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { TestCaseNode } from "@/types";

export default function TestStepsGrid({ testCase }: { testCase: TestCaseNode }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT overflow-hidden flex flex-col">
      <div className="bg-surface-container border-b border-outline-variant px-3 py-2 flex justify-between items-center">
        <h3 className="font-title-sm text-title-sm text-on-surface">Test Steps</h3>
        <div className="flex gap-1">
          <button
            className="p-1 hover:bg-surface-variant rounded-DEFAULT text-on-surface-variant transition-colors"
            title="RAG Auto-Generate Steps"
          >
            <Icon name="auto_awesome" className="text-sm text-primary" />
          </button>
          <button className="p-1 hover:bg-surface-variant rounded-DEFAULT text-on-surface-variant transition-colors">
            <Icon name="add_row_below" className="text-sm" />
          </button>
        </div>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-[40px_1fr_1fr] bg-surface-container-low border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant py-2 px-2">
        <div className="text-center">#</div>
        <div className="pl-2">Action / Step</div>
        <div className="pl-2 border-l border-outline-variant">Expected Result</div>
      </div>

      {/* Grid Rows */}
      {testCase.steps.map((step, idx) => (
        <div
          key={step.id}
          className={cn(
            "grid grid-cols-[40px_1fr_1fr] font-body-sm text-body-sm text-on-surface py-1 px-2 hover:bg-surface-container-low transition-colors items-start group",
            idx < testCase.steps.length - 1 && "border-b border-outline-variant"
          )}
        >
          <div className="text-center pt-1 text-on-surface-variant">{step.order}</div>
          <div className="pl-2 pt-1 pb-1">{step.action}</div>
          <div
            className={cn(
              "pl-2 pt-1 pb-1 border-l border-outline-variant",
              step.expectedIsCode && "font-code-sm"
            )}
          >
            {step.expected}
          </div>
        </div>
      ))}
    </div>
  );
}
