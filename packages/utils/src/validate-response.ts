export function validateResponse(predicate: () => unknown) {
  if (!predicate()) {
    throw new Error(`Data not found for ${predicate.toString()}`);
  }
}
