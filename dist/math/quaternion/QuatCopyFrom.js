export function QuatCopyFrom(source, dest) {
  const { x, y, z, w } = source;
  return dest.set(x, y, z, w);
}
