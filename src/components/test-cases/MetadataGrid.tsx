import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { TestCaseNode } from "@/types";

export default function MetadataGrid({ testCase }: { testCase: TestCaseNode }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Pre-conditions */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-3">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">
          Pre-conditions
        </h3>
        <ul className="list-disc pl-4 font-body-sm text-body-sm space-y-1 text-on-surface">
          {testCase.preconditions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Requirements Linking */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-3">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">
          Traceability / Links
        </h3>
        <div className="flex flex-col gap-2 font-body-sm text-body-sm">
          {testCase.links.map((link) => (
            <div
              key={link.label}
              className={cn(
                "flex items-center gap-2",
                link.variant === "link" ? "text-primary" : "text-on-surface"
              )}
            >
              <Icon
                name={link.icon}
                className={cn(
                  "text-sm",
                  link.variant === "system" && "text-on-surface-variant"
                )}
              />
              <span className={link.variant === "link" ? "underline cursor-pointer" : undefined}>
                {link.label}
              </span>
              <span className="ml-auto text-xs text-on-surface-variant">{link.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
