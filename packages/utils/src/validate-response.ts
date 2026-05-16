export function validateResponse(predicate: () => unknown): void {
  if (!predicate()) {
    throw new Error(`Data not found for ${predicate.toString()}`);
  }
}
