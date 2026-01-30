import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { getOrdinal } from '../core/utils.mjs'

const labelOrdinals = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
]

describe('getOrdinal', () => {
  it('should return N for 0 degrees', () => {
    assert.equal(getOrdinal(0, labelOrdinals), 'N')
  })

  it('should return N for 360 degrees', () => {
    assert.equal(getOrdinal(360, labelOrdinals), 'N')
  })

  it('should return NNE for 22.5 degrees', () => {
    assert.equal(getOrdinal(22.5, labelOrdinals), 'NNE')
  })

  it('should return NE for 45 degrees', () => {
    assert.equal(getOrdinal(45, labelOrdinals), 'NE')
  })

  it('should return E for 90 degrees', () => {
    assert.equal(getOrdinal(90, labelOrdinals), 'E')
  })

  it('should return SE for 135 degrees', () => {
    assert.equal(getOrdinal(135, labelOrdinals), 'SE')
  })

  it('should return S for 180 degrees', () => {
    assert.equal(getOrdinal(180, labelOrdinals), 'S')
  })

  it('should return SW for 225 degrees', () => {
    assert.equal(getOrdinal(225, labelOrdinals), 'SW')
  })

  it('should return W for 270 degrees', () => {
    assert.equal(getOrdinal(270, labelOrdinals), 'W')
  })

  it('should return NW for 315 degrees', () => {
    assert.equal(getOrdinal(315, labelOrdinals), 'NW')
  })

  it('should handle values between cardinal directions', () => {
    assert.equal(getOrdinal(11, labelOrdinals), 'N')
    assert.equal(getOrdinal(12, labelOrdinals), 'NNE')
  })

  it('should handle large bearing values via modulo', () => {
    assert.equal(getOrdinal(720, labelOrdinals), 'N') // 720 % 360 = 0
    assert.equal(getOrdinal(405, labelOrdinals), 'NE') // 405 % 360 = 45
  })
})
