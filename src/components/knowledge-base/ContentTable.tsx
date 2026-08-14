import Icon from "@/components/ui/Icon";
import { FileItem } from "@/types";
import ContentTableRow from "./ContentTableRow";

interface ContentTableProps {
  title: string;
  files: FileItem[];
}

const PADDING_ROWS = 4;

export default function ContentTable({ title, files }: ContentTableProps) {
  return (
    <div className="flex-1 bg-surface-container-lowest h-full overflow-hidden flex flex-col relative">
      {/* Table Action Bar */}
      <div className="px-md py-sm border-b border-outline-variant bg-surface flex justify-between items-center h-[40px]">
        <div className="flex items-center gap-sm">
          <span className="font-title-sm text-title-sm text-on-surface">{title}</span>
          <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-sm font-code-sm text-code-sm">
            {files.length} Items
          </span>
        </div>
        <div className="flex items-center gap-xs">
          <button className="p-xs text-on-surface-variant hover:bg-surface-container rounded-sm border border-transparent hover:border-outline-variant transition-all">
            <Icon name="refresh" className="text-[18px]" />
          </button>
          <button className="p-xs text-on-surface-variant hover:bg-surface-container rounded-sm border border-transparent hover:border-outline-variant transition-all">
            <Icon name="more_vert" className="text-[18px]" />
          </button>
        </div>
      </div>

      {/* High Density Data Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-surface-container-low border-b-2 border-outline-variant z-10">
            <tr>
              <th className="font-label-caps text-label-caps text-on-surface w-[30%]">
                Filename
              </th>
              <th className="font-label-caps text-label-caps text-on-surface w-[15%]">
                Source Type
              </th>
              <th className="font-label-caps text-label-caps text-on-surface w-[15%]">
                Ingestion Date
              </th>
              <th className="font-label-caps text-label-caps text-on-surface w-[25%]">
                Embedding Sync Status
              </th>
              <th className="font-label-caps text-label-caps text-on-surface w-[15%]">
                Last AI Scan
              </th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-body-sm text-on-surface">
            {files.map((file) => (
              <ContentTableRow key={file.id} file={file} />
            ))}
            {/* Empty state padding rows (design flair) */}
            {Array.from({ length: PADDING_ROWS }).map((_, i) => (
              <tr key={`pad-${i}`} className="h-8 border-b border-outline-variant bg-transparent">
                <td colSpan={5} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pane divider / resize handle mock */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[1px] bg-outline-variant cursor-col-resize hover:w-1 hover:bg-primary transition-all z-20"
        style={{ left: "-1px" }}
      />
    </div>
  );
}
