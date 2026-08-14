import { cn } from "@/lib/utils";
import { FileItem } from "@/types";
import FileTypeIcon from "./FileTypeIcon";
import StatusBadge from "./StatusBadge";

export default function ContentTableRow({ file }: { file: FileItem }) {
  return (
    <tr
      className={cn(
        "hover:bg-surface-bright transition-colors border-b border-outline-variant",
        file.active && "bg-secondary-container bg-opacity-10 border-l-2 border-primary"
      )}
    >
      <td className={file.active ? "pl-[10px]" : undefined}>
        <div className="flex items-center gap-xs">
          <FileTypeIcon type={file.icon} />
          <span className={cn("truncate", file.active && "font-medium")}>
            {file.filename}
          </span>
        </div>
      </td>
      <td>
        <span className="text-on-surface-variant">{file.sourceType}</span>
      </td>
      <td>
        <span className="font-code-sm text-code-sm text-on-surface-variant">
          {file.ingestionDate}
        </span>
      </td>
      <td>
        <StatusBadge status={file.syncStatus} progress={file.progress} />
      </td>
      <td>
        <span className="font-code-sm text-code-sm text-on-surface-variant">
          {file.lastAiScan}
        </span>
      </td>
    </tr>
  );
}
