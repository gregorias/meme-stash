/**
 * Returns if pattern fuzzy match target.
 *
 * @param {string} pattern
 * @param {string} target
 * @returns {boolean}
 */
export function fuzzyMatch(pattern: string, target: string): boolean {
  let patternIndex = 0;
  for (
    let targetIndex = 0;
    targetIndex < target.length && patternIndex < pattern.length;
    targetIndex++
  ) {
    if (target.charAt(targetIndex) == pattern.charAt(patternIndex)) {
      patternIndex++;
    }
  }
  return patternIndex == pattern.length;
}
