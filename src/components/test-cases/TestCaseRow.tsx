import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { TestCaseNode } from "@/types";

interface TestCaseRowProps {
  testCase: TestCaseNode;
  selected: boolean;
  onSelect: () => void;
}

export default function TestCaseRow({ testCase, selected, onSelect }: TestCaseRowProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex items-center gap-2 p-1.5 rounded-DEFAULT cursor-pointer mt-1 first:mt-0",
        selected
          ? "bg-surface-variant border border-outline-variant text-on-surface"
          : "hover:bg-surface-container text-on-surface-variant"
      )}
    >
      <Icon name="rule" className={cn("text-sm", selected && "text-primary")} />
      <span className="truncate">
        {testCase.code}: {testCase.title}
      </span>
    </div>
  );
}
