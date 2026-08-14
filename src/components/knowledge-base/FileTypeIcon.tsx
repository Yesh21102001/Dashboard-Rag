import Icon from "@/components/ui/Icon";

interface FileTypeIconProps {
  type: "pdf" | "docx";
}

export default function FileTypeIcon({ type }: FileTypeIconProps) {
  if (type === "pdf") {
    return <Icon name="picture_as_pdf" className="text-[16px] text-error" />;
  }
  return <Icon name="description" className="text-[16px] text-primary" />;
}
