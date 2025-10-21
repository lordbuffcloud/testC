/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param arr The array to shuffle
 * @param rng Optional random number generator function (defaults to Math.random)
 * @returns A new shuffled array
 */
export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const result = [...arr]
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  
  return result
}
