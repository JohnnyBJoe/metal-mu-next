type Props = {
  type: "new" | "updated";
};

export default function SectionBadge({
  type,
}: Props) {
  const isNew = type === "new";

  return (
    <span
      className={
        isNew
          ? "rounded bg-red-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
          : "rounded bg-zinc-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
      }
    >
      {isNew ? "NEW" : "UPDATED"}
    </span>
  );
}