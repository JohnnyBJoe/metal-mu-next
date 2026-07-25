import type { ReactNode } from "react";

type CatalogLayoutProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};

export default function CatalogLayout({
  left,
  center,
  right,
}: CatalogLayoutProps) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <aside className="col-span-2">
        {left}
      </aside>

      <main className="col-span-8">
        {center}
      </main>

      <aside className="col-span-2">
        {right}
      </aside>
    </div>
  );
}