import MenuItem from "@/components/menu/MenuItem";

import { getCountries } from "@/lib/services/countries";
import { getGenres } from "@/lib/services/styles";

export default async function Header() {

  const countries = await getCountries();

  const countryItems = countries.map((country) => ({
    label: country.text,
    href: `/country/${country.id_c}`,
  }));

  const genres = await getGenres();

  const genreItems = genres.map((genre) => ({
    label: genre.text,
    href: `/genre/${genre.id_s}`,
  }));

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
            param="letter"
            basePath="/"
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
            param="letter"
            basePath="/persons"
            items={[
              "A", "B", "C", "D", "E", "F", "G",
              "H", "I", "J", "K", "L", "M",
              "N", "O", "P", "Q", "R", "S",
              "T", "U", "V", "W", "X", "Y", "Z",
              "0-9",
            ]}
          />

          <MenuItem
            title="Genre"
            items={genreItems}
          />

          <MenuItem
            title="Country"
            items={countryItems}
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