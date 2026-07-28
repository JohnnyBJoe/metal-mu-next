"use client";

import { useState } from "react";

import DropdownMenu from "./DropdownMenu";
type MenuLink = {
  label: string;
  href: string;
  };
type MenuItemProps = {
  title: string;
 items?: string[] | MenuLink[];
  param?: string;
  basePath?: string;
};

export default function MenuItem({
  title,
  items,
  param = "letter",
  basePath = "/",
}: MenuItemProps) {
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
          param={param}
          basePath={basePath}
        />
      )}
    </div>
  );
}