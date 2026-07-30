import { prisma } from "../prisma";
import { getInstrumentWeight } from "../utils/instruments";

export type Member = {
  id_m: number;
  name: string;
  instrument: string;
  pusobeni: string | null;
  stav: Uint8Array;
  letter: string;
};

export type MembersResult = {
  current: Member[];
  previous: Member[];
};

function isCurrent(stav: Uint8Array): boolean {
  if (!stav || stav.length === 0) {
    return false;
  }

  // MariaDB Binary(1):
  // 0x30 = "0" = současný člen
  // 0x31 = "1" = bývalý člen
  return stav[0] === 0x30;
}

function sortMembers(a: Member, b: Member) {
  const ia = getInstrumentWeight(a.instrument);
  const ib = getInstrumentWeight(b.instrument);

  if (ia !== ib) {
    return ia - ib;
  }

  return a.name.localeCompare(b.name);
}

export async function getMembers(
  bandId: number
): Promise<MembersResult> {
  const members = await prisma.system_interprets_members.findMany({
    where: {
      interpret: bandId,
    },
    select: {
      id_m: true,
      name: true,
      instrument: true,
      pusobeni: true,
      stav: true,
    },
  });

  const normalized = members.map((member) => ({
    ...member,
    letter: member.name.trim().charAt(0).toUpperCase(),
  }));

  const current = normalized
    .filter((member) => isCurrent(member.stav))
    .sort(sortMembers);

  const previous = normalized
    .filter((member) => !isCurrent(member.stav))
    .sort(sortMembers);

  return {
    current,
    previous,
  };
}