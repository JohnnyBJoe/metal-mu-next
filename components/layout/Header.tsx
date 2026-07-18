export default function Header() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Metal MU
          </h1>
          <p className="text-sm text-zinc-400">
            Česká databáze metalových kapel
          </p>
        </div>

        <nav className="flex gap-6 text-zinc-300">
          <a href="/" className="hover:text-red-500">
            Domů
          </a>
          <a href="/bands" className="hover:text-red-500">
            Kapely
          </a>
          <a href="/albums" className="hover:text-red-500">
            Diskografie
          </a>
          <a href="/concerts" className="hover:text-red-500">
            Koncerty
          </a>
        </nav>
      </div>
    </header>
  );
}