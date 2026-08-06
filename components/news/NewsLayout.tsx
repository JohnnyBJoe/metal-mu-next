import NewsMenu from "./NewsMenu";

type Props = {
  active: string;
  children: React.ReactNode;
};

export default function NewsLayout({
  active,
  children,
}: Props) {
  return (
    <>
      <NewsMenu active={active} />

      <section className="rounded bg-zinc-900 p-6">
        {children}
      </section>
    </>
  );
}