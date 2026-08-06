import MenuItem from "@/components/menu/MenuItem";
import SearchBox from "@/components/search/SearchBox";

import { getCountries } from "@/lib/services/countries";
import { getGenres } from "@/lib/services/styles";

type HeaderProps = {
  home?: boolean;
};

export default async function Header({
  home = false,
}: HeaderProps) {

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

        <div className="w-56">

          {!home && (

            <div className="text-3xl font-bold text-red-600">
              Rock&amp;Metal Book
            </div>

          )}

        </div>

        <nav className="flex gap-6">

          <MenuItem
            title="News & Updates"
            items={[
              {
                label: "New Bands",
                href: "/news/new-bands",
              },
              {
                label: "Updated Bands",
                href: "/news/updated-bands",
              },
              {
                label: "New Releases",
                href: "/news/new-releases",
              },
              {
                label: "Updated Releases",
                href: "/news/updated-releases",
              },
              {
                label: "New Musicians",
                href: "/news/new-musicians",
              },
              {
                label: "Updated Musicians",
                href: "/news/updated-musicians",
              },
            ]}
          />

          <MenuItem
            title="Bands A-Z"
            param="letter"
            basePath="/bands"
            items={[
              "A", "B", "C", "D", "E", "F", "G",
              "H", "I", "J", "K", "L", "M",
              "N", "O", "P", "Q", "R", "S",
              "T", "U", "V", "W", "X", "Y", "Z",
              "0-9", "#",
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

        <SearchBox />

      </div>

    </header>
  );
}