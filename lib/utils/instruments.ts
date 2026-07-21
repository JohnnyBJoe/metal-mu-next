// Metal MU 2.0
// Version: v0.2

export const instrumentGroups = [
  "vocals",
  "guitar",
  "keyboards",
  "bass",
  "drums",
  "other",
] as const;

const aliases: Record<string, string> = {
  // Vocals
  "voc": "vocals",
  "voc.": "vocals",
  "vocal": "vocals",
  "vocals": "vocals",
  "singer": "vocals",

  // Guitar
  "g": "guitar",
  "g.": "guitar",
  "guitar": "guitar",
  "guitars": "guitar",
  "lead guitar": "guitar",
  "rhythm guitar": "guitar",
  "acoustic guitar": "guitar",

  // Keyboards
  "key": "keyboards",
  "key.": "keyboards",
  "keyboard": "keyboards",
  "keyboards": "keyboards",
  "piano": "keyboards",

  // Bass
  "bg": "bass",
  "bg.": "bass",
  "bass": "bass",
  "bass guitar": "bass",

  // Drums
  "dr": "drums",
  "dr.": "drums",
  "drummer": "drums",
  "drums": "drums",
};

export function normalizeInstrument(value: string): string {
  const text = value.trim().toLowerCase();

  if (aliases[text]) {
    return aliases[text];
  }

  for (const key of Object.keys(aliases)) {
    if (text.includes(key)) {
      return aliases[key];
    }
  }

  return "other";
}

export function getInstrumentWeight(value: string): number {
  switch (normalizeInstrument(value)) {
    case "vocals":
      return 1;

    case "guitar":
      return 2;

    case "keyboards":
      return 3;

    case "bass":
      return 4;

    case "drums":
      return 5;

    default:
      return 99;
  }
}