import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mph2Beaufort } from '../core/utils.mjs'

describe('mph2Beaufort', () => {
  it('should convert calm winds (0-1 mph) to Beaufort 0', () => {
    assert.equal(mph2Beaufort(0), 0)
    assert.equal(mph2Beaufort(0.5), 0)
  })

  it('should convert light air (1-3 mph) to Beaufort 1', () => {
    assert.equal(mph2Beaufort(1), 1)
    assert.equal(mph2Beaufort(2), 1)
  })

  it('should convert light breeze (4-7 mph) to Beaufort 2', () => {
    assert.equal(mph2Beaufort(4), 2)
    assert.equal(mph2Beaufort(6), 2)
  })

  it('should convert gentle breeze (8-12 mph) to Beaufort 3', () => {
    assert.equal(mph2Beaufort(8), 3)
    assert.equal(mph2Beaufort(11), 3)
  })

  it('should convert moderate breeze (13-18 mph) to Beaufort 4', () => {
    assert.equal(mph2Beaufort(13), 4)
    assert.equal(mph2Beaufort(17), 4)
  })

  it('should convert hurricane force (73+ mph) to Beaufort 12', () => {
    assert.equal(mph2Beaufort(73), 12)
    assert.equal(mph2Beaufort(100), 12)
    assert.equal(mph2Beaufort(200), 12)
  })

  it('should handle edge cases', () => {
    // Test boundary values
    assert.equal(mph2Beaufort(3.1), 1) // Still Beaufort 1
    assert.equal(mph2Beaufort(72), 11) // Just under hurricane force
  })
})
