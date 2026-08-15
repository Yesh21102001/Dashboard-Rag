"use client";

import { useState, useRef } from "react";
import Icon from "@/components/ui/Icon";

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function FileUploadModal({
  open,
  onClose,
  onUpload,
}: FileUploadModalProps) {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile);
      setFileName("");
      setSelectedFile(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-5 box-border">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[520px] max-w-[calc(100vw-32px)] rounded-lg border border-outline-variant bg-surface-container-lowest shadow-xl box-border"
      >
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-lowest px-5 py-4">
          <h2 className="font-title-sm text-title-sm text-on-surface">Upload File</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-outline-variant px-2 py-1 text-sm text-on-surface-variant hover:bg-surface-variant"
          >
            Close
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-outline-variant bg-surface-container hover:bg-surface-container-high"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <Icon name="cloud_upload" className="text-[40px] text-primary" />
              <div className="text-center">
                <p className="font-body-md text-body-md text-on-surface">
                  Drag and drop your file here
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  or click to select a file
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex flex-col gap-1">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                File Name
              </span>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g., Requirements.pdf"
                className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 border-t border-outline-variant pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-outline-variant px-4 py-2 text-body-sm text-on-surface hover:bg-surface-variant"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-body-sm font-medium text-on-primary hover:bg-primary/90"
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
