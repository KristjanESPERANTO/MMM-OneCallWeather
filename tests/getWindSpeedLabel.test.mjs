import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { getWindSpeedLabel } from '../core/utils.mjs'

describe('getWindSpeedLabel', () => {
  it('should return "mph" for mph', () => {
    assert.equal(getWindSpeedLabel('mph'), 'mph')
  })

  it('should return "km/h" for kmph', () => {
    assert.equal(getWindSpeedLabel('kmph'), 'km/h')
  })

  it('should return "m/s" for ms', () => {
    assert.equal(getWindSpeedLabel('ms'), 'm/s')
  })

  it('should return "kts" for knots', () => {
    assert.equal(getWindSpeedLabel('knots'), 'kts')
  })

  it('should return the input as fallback for unknown units', () => {
    assert.equal(getWindSpeedLabel('unknown'), 'unknown')
  })
})
