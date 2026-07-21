import MenuItem from "@/components/menu/MenuItem";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="text-3xl font-bold text-red-600">
          Metal MU
        </div>

        <nav className="flex gap-6">
          <MenuItem
            title="News & Updates"
            items={[
              "New Bands",
              "New Musicians",
              "New Albums",
              "Updated Bands",
              "Updated Musicians",
              "Updated Albums",
            ]}
          />

          <MenuItem
            title="Bands A-Z"
            items={[
              "A", "B", "C", "D", "E", "F", "G",
              "H", "I", "J", "K", "L", "M",
              "N", "O", "P", "Q", "R", "S",
              "T", "U", "V", "W", "X", "Y", "Z",
              "0-9",
            ]}
          />

          <MenuItem
            title="Musicians A-Z"
            items={["A", "B", "C", "D", "E"]}
          />

          <MenuItem
            title="Genre"
            items={["Heavy Metal", "Black Metal", "Death Metal"]}
          />

          <MenuItem
            title="Country"
            items={["Czech Republic", "Germany", "USA"]}
          />

          <MenuItem
            title="Others"
            items={[
              "Various Artists",
              "Magazines",
              "Webzines",
              "Studios",
            ]}
          />
        </nav>

        <input
          type="text"
          placeholder="Search..."
          className="rounded bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
        />
      </div>
    </header>
  );
}