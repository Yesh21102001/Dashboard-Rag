"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
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

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const { data } = await axiosInstance.get("/files/list?category=SRS");
      if (data.success && data.files) {
        const transformedFiles: FileItem[] = data.files.map((file: any) => ({
          id: file.id,
          filename: file.filename,
          icon: file.mimeType.includes("pdf") ? "pdf" : "docx",
          sourceType: "Cloud Upload",
          ingestionDate: new Date(file.createdAt).toLocaleString(),
          syncStatus: file.syncStatus,
          progress: file.progress,
          lastAiScan: "Recently",
        }));
        setFiles(transformedFiles);
        if (transformedFiles.length > 0) {
          setSelectedFileId(transformedFiles[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  const selectedFile = files.find((f) => f.id === selectedFileId);

  const handleFileUpload = async (file: File) => {
    await fetchFiles();
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
