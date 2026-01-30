import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { convertWeatherType } from '../core/utils.mjs'

describe('convertWeatherType', () => {
  it('should convert day icons correctly', () => {
    assert.equal(convertWeatherType('01d'), 'day-clear-sky')
    assert.equal(convertWeatherType('02d'), 'day-few-clouds')
    assert.equal(convertWeatherType('03d'), 'day-scattered-clouds')
    assert.equal(convertWeatherType('04d'), 'day-broken-clouds')
    assert.equal(convertWeatherType('09d'), 'day-shower-rain')
    assert.equal(convertWeatherType('10d'), 'day-rain')
    assert.equal(convertWeatherType('11d'), 'day-thunderstorm')
    assert.equal(convertWeatherType('13d'), 'day-snow')
    assert.equal(convertWeatherType('50d'), 'day-mist')
  })

  it('should convert night icons correctly', () => {
    assert.equal(convertWeatherType('01n'), 'night-clear-sky')
    assert.equal(convertWeatherType('02n'), 'night-few-clouds')
    assert.equal(convertWeatherType('03n'), 'night-scattered-clouds')
    assert.equal(convertWeatherType('04n'), 'night-broken-clouds')
    assert.equal(convertWeatherType('09n'), 'night-shower-rain')
    assert.equal(convertWeatherType('10n'), 'night-rain')
    assert.equal(convertWeatherType('11n'), 'night-thunderstorm')
    assert.equal(convertWeatherType('13n'), 'night-snow')
    assert.equal(convertWeatherType('50n'), 'night-mist')
  })

  it('should return null for unknown weather types', () => {
    assert.equal(convertWeatherType('99x'), null)
    assert.equal(convertWeatherType(''), null)
    assert.equal(convertWeatherType('invalid'), null)
  })

  it('should handle undefined input', () => {
    assert.equal(convertWeatherType(undefined), null)
  })
})
