"use client";

import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

type MenuItemProps = {
  title: string;
  items?: string[];
};

export default function MenuItem({ title, items }: MenuItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="px-2 py-1 text-sm uppercase tracking-wide text-zinc-300 hover:text-red-500">
        {title}
      </button>

      {open && items && (
  <DropdownMenu
    items={items}
    param={title === "Bands A-Z" ? "letter" : "menu"}
  />
)}
    </div>
  );
}