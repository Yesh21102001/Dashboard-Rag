"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/knowledge-base/PageHeader";
import FolderTree from "@/components/knowledge-base/FolderTree";
import FileContentViewer from "@/components/knowledge-base/FileContentViewer";
import FileUploadModal from "@/components/knowledge-base/FileUploadModal";
import { brmsFiles } from "@/data/mockData";
import { FileItem } from "@/types";

export default function KnowledgeBasePage() {
  const [selectedFileId, setSelectedFileId] = useState<string>("core-logic-v2");
  const [files, setFiles] = useState<FileItem[]>(brmsFiles);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const selectedFile = files.find((f) => f.id === selectedFileId);

  const handleFileUpload = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    const newFile: FileItem = {
      id: `file-${Date.now()}`,
      filename: file.name,
      icon: file.type.includes("pdf") ? "pdf" : "docx",
      sourceType: "Local Upload",
      ingestionDate: new Date().toLocaleString(),
      syncStatus: "SYNCED",
      progress: 100,
      lastAiScan: "Just now",
      fileUrl,
      file,
    };
    setFiles((prev) => [...prev, newFile]);
    setSelectedFileId(newFile.id);
    setUploadModalOpen(false);
  };

  return (
    <AppShell>
      <PageHeader onConnectClick={() => setUploadModalOpen(true)} />

      <div className="flex-1 flex flex-row overflow-hidden">
        <FolderTree files={files} selectedFileId={selectedFileId} onSelectFile={setSelectedFileId} />
        {selectedFile ? (
          <FileContentViewer file={selectedFile} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-on-surface-variant">
            Select a file to view its content
          </div>
        )}
      </div>

      <FileUploadModal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} onUpload={handleFileUpload} />
    </AppShell>
  );
}
