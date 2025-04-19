



export function removeAtIndex<T>(arr: T[], index: number): T[] {
  const updatedArray = [...arr]; // Create a copy to avoid mutating the original array
  updatedArray.splice(index, 1);
  return updatedArray;
}

export function appendAtIndex<T>(arr: T[], item: T, index: number): T[] {
  if (!item) return arr;
  const updatedArray = [...arr];
  updatedArray.splice(index, 0, item);
  return updatedArray;
}

