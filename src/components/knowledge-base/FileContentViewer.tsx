"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import Icon from "@/components/ui/Icon";
import { FileItem } from "@/types";

interface FileContentViewerProps {
  file: FileItem;
}

export default function FileContentViewer({ file }: FileContentViewerProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isImage, setIsImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFileContent();
  }, [file]);

  const loadFileContent = async () => {
    setIsLoading(true);
    const fileName = file.filename.toLowerCase();
    const fileType = file.icon === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    try {
      const { data } = await axiosInstance.get(`/files/${file.id}`);

      if (!data.success || !data.file) {
        throw new Error("File not found");
      }

      const fileData = data.file;
      const base64Data = fileData.data;
      const mimeType = fileData.mimeType;

      if (mimeType.includes("pdf")) {
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(blob);
        setHtmlContent(fileUrl);
        setIsImage(false);
      } else if (
        mimeType.includes("wordprocessingml") ||
        fileName.endsWith(".docx")
      ) {
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const mammoth = (await import("mammoth")).default;
        const result = await mammoth.convertToHtml({ arrayBuffer: bytes.buffer });
        setHtmlContent(result.value);
        setIsImage(false);
      } else if (mimeType.startsWith("text/") || fileName.endsWith(".txt")) {
        const binaryString = atob(base64Data);
        const text = decodeURIComponent(escape(binaryString));
        setHtmlContent(`<pre style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(text)}</pre>`);
        setIsImage(false);
      } else if (mimeType.startsWith("image/")) {
        const dataUrl = `data:${mimeType};base64,${base64Data}`;
        setHtmlContent(dataUrl);
        setIsImage(true);
      } else {
        setHtmlContent("");
        setIsImage(false);
      }
    } catch (error) {
      console.error("Error loading file:", error);
      setHtmlContent(`<p style="color: red;">Error loading file: ${error}</p>`);
      setIsImage(false);
    } finally {
      setIsLoading(false);
    }
  };

  const escapeHtml = (text: string) => {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };
  return (
    <div className="flex-1 bg-surface-container-lowest h-full overflow-hidden flex flex-col">
      {/* File Header */}
      <div className="px-lg py-md border-b border-outline-variant bg-surface flex justify-between items-center">
        <div className="flex items-center gap-md">
          <Icon
            name={file.icon === "pdf" ? "description" : "article"}
            className="text-[24px] text-primary"
          />
          <div>
            <div className="font-title-sm text-title-sm text-on-surface">{file.filename}</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              {file.sourceType} • {file.ingestionDate}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <div className={`px-2 py-1 rounded-sm font-label-caps text-label-caps ${
            file.syncStatus === "SYNCED"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {file.syncStatus}
          </div>
          <button className="p-xs text-on-surface-variant hover:bg-surface-container rounded-sm transition-colors">
            <Icon name="more_vert" className="text-[18px]" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {file.syncStatus === "PROCESSING" && (
        <div className="px-lg py-sm bg-surface-container-low border-b border-outline-variant">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body-sm text-body-sm text-on-surface">Processing</span>
            <span className="font-code-sm text-code-sm text-on-surface-variant">{file.progress}%</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full transition-all"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* File Content */}
      <div className="flex-1 overflow-hidden p-lg">
        {isLoading && (
          <div className="h-full flex items-center justify-center bg-surface-container rounded-lg border border-outline-variant">
            <p className="text-on-surface-variant">Loading...</p>
          </div>
        )}

        {!isLoading && htmlContent ? (
          file.icon === "pdf" ? (
            <iframe
              src={htmlContent}
              className="w-full h-full rounded-lg border border-outline-variant"
              title={file.filename}
            />
          ) : isImage ? (
            <div className="h-full flex items-center justify-center bg-surface-container rounded-lg border border-outline-variant">
              <img
                src={htmlContent}
                alt={file.filename}
                className="max-w-full max-h-full rounded-lg"
              />
            </div>
          ) : (
            <div className="h-full overflow-y-auto bg-surface-container rounded-lg border border-outline-variant p-4">
              <div
                className="prose prose-sm max-w-none text-on-surface"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          )
        ) : !isLoading ? (
          <div className="h-full flex items-center justify-center bg-surface-container rounded-lg border border-outline-variant">
            <div className="text-center">
              <Icon name="description" className="text-[48px] text-primary mx-auto mb-4" />
              <p className="font-body-md text-on-surface">{file.filename}</p>
              <p className="font-body-sm text-on-surface-variant mt-2">
                Preview not available for this file type
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* File Metadata Footer */}
      <div className="px-lg py-md bg-surface border-t border-outline-variant grid grid-cols-3 gap-md">
        <div>
          <div className="font-label-caps text-label-caps text-on-surface-variant">
            Last AI Scan
          </div>
          <div className="font-body-sm text-body-sm text-on-surface mt-1">
            {file.lastAiScan}
          </div>
        </div>
        <div>
          <div className="font-label-caps text-label-caps text-on-surface-variant">
            File Type
          </div>
          <div className="font-body-sm text-body-sm text-on-surface mt-1 uppercase">
            {file.icon}
          </div>
        </div>
        <div>
          <div className="font-label-caps text-label-caps text-on-surface-variant">
            Status
          </div>
          <div className="font-body-sm text-body-sm text-on-surface mt-1">
            Ready for use
          </div>
        </div>
      </div>
    </div>
  );
}
