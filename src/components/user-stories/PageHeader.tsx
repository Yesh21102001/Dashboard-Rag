import ConnectSourceButton from "@/components/knowledge-base/ConnectSourceButton";

export default function PageHeader() {
  return (
    <div className="bg-surface-container-lowest px-lg py-md flex justify-between items-center border-b border-outline-variant">
      <div>
        <h1 className="font-headline-md text-headline-md text-on-surface">User Stories</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Manage and organise your user stories and backlog.
        </p>
      </div>
      <ConnectSourceButton />
    </div>
  );
}
