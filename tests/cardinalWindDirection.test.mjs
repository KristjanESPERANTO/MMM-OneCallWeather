import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { cardinalWindDirection } from '../core/utils.mjs'

describe('cardinalWindDirection', () => {
  it('should return N for 0 degrees', () => {
    assert.equal(cardinalWindDirection(0), 'N')
  })

  it('should return N for 360 degrees', () => {
    assert.equal(cardinalWindDirection(360), 'N')
  })

  it('should return NE for 45 degrees', () => {
    assert.equal(cardinalWindDirection(45), 'NE')
  })

  it('should return E for 90 degrees', () => {
    assert.equal(cardinalWindDirection(90), 'E')
  })

  it('should return SE for 135 degrees', () => {
    assert.equal(cardinalWindDirection(135), 'SE')
  })

  it('should return S for 180 degrees', () => {
    assert.equal(cardinalWindDirection(180), 'S')
  })

  it('should return SW for 225 degrees', () => {
    assert.equal(cardinalWindDirection(225), 'SW')
  })

  it('should return W for 270 degrees', () => {
    assert.equal(cardinalWindDirection(270), 'W')
  })

  it('should return NW for 315 degrees', () => {
    assert.equal(cardinalWindDirection(315), 'NW')
  })

  it('should handle intermediate values', () => {
    assert.equal(cardinalWindDirection(22), 'NNE')
    assert.equal(cardinalWindDirection(67), 'ENE')
    assert.equal(cardinalWindDirection(112), 'ESE')
    assert.equal(cardinalWindDirection(157), 'SSE')
    assert.equal(cardinalWindDirection(202), 'SSW')
    assert.equal(cardinalWindDirection(247), 'WSW')
    assert.equal(cardinalWindDirection(292), 'WNW')
    assert.equal(cardinalWindDirection(337), 'NNW')
  })

  it('should handle boundary values', () => {
    assert.equal(cardinalWindDirection(11.24), 'N')
    assert.equal(cardinalWindDirection(11.26), 'NNE')
    assert.equal(cardinalWindDirection(348.74), 'NNW')
    assert.equal(cardinalWindDirection(348.76), 'N')
  })
})
