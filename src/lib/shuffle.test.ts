import { describe, it, expect } from 'vitest'
import { shuffle } from './shuffle'

describe('shuffle', () => {
  it('should produce a permutation of the same length', () => {
    const original = [1, 2, 3, 4, 5]
    const shuffled = shuffle(original)
    
    expect(shuffled).toHaveLength(original.length)
    expect(shuffled).toEqual(expect.arrayContaining(original))
  })

  it('should keep all items', () => {
    const original = ['a', 'b', 'c', 'd']
    const shuffled = shuffle(original)
    
    for (const item of original) {
      expect(shuffled).toContain(item)
    }
  })

  it('should change order most of the time', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let differentOrderCount = 0
    
    // Run multiple times to account for randomness
    for (let i = 0; i < 10; i++) {
      const shuffled = shuffle(original)
      if (JSON.stringify(shuffled) !== JSON.stringify(original)) {
        differentOrderCount++
      }
    }
    
    // Should be different most of the time (allowing for edge case where shuffle returns same order)
    expect(differentOrderCount).toBeGreaterThan(5)
  })

  it('should work with custom random number generator', () => {
    const original = [1, 2, 3, 4, 5]
    let callCount = 0
    
    const mockRng = () => {
      callCount++
      return 0.5 // Always return 0.5 for predictable results
    }
    
    const shuffled = shuffle(original, mockRng)
    
    expect(callCount).toBeGreaterThan(0)
    expect(shuffled).toHaveLength(original.length)
  })

  it('should handle empty array', () => {
    const shuffled = shuffle([])
    expect(shuffled).toEqual([])
  })

  it('should handle single item array', () => {
    const original = [42]
    const shuffled = shuffle(original)
    expect(shuffled).toEqual([42])
  })
})
