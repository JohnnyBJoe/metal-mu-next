import { notFound } from "next/navigation";

import PersonDetail from "@/components/person/PersonDetail";

import { getPerson } from "@/lib/services/persons";

type PersonPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PersonPage({
  params,
}: PersonPageProps) {
  const { id } = await params;

  const person = await getPerson(Number(id));

  if (!person) {
    notFound();
  }

  return <PersonDetail person={person} />;
}