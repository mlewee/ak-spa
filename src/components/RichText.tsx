import { formatRichText } from "../utils/formatRichText";

type RichTextProps = {
  html: string;
  className?: string;
};

export default function RichText({ html, className = "" }: RichTextProps) {
  return (
    <div
      className={`rich-text text-left text-[13px] leading-relaxed whitespace-pre-wrap md:text-[14.5px] ${className}`}
      dangerouslySetInnerHTML={{ __html: formatRichText(html) }}
    />
  );
}
