import ConnectSourceButton from "./ConnectSourceButton";

interface PageHeaderProps {
  onConnectClick: () => void;
}

export default function PageHeader({ onConnectClick }: PageHeaderProps) {
  return (
    <div className="bg-surface-container-lowest px-lg py-md flex justify-between items-center border-b border-outline-variant">
      <div>
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Knowledge Base Manager
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Manage and sync RAG context sources.
        </p>
      </div>
      <ConnectSourceButton onClick={onConnectClick} />
    </div>
  );
}
