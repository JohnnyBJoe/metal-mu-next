export const instrumentOrder = [
  "vocals",
  "vocal",
  "guitar",
  "guitars",
  "keyboard",
  "keyboards",
  "bass",
  "drums",
];

export function getInstrumentWeight(instrument: string): number {
  const value = instrument.toLowerCase();

  const index = instrumentOrder.findIndex((item) =>
    value.includes(item)
  );

  return index === -1 ? 999 : index;
}