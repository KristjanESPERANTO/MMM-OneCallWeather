import { describe, it } from 'node:test'
import { formatSnowValue, getSnowDepthRatio } from '../core/utils.mjs'
import assert from 'node:assert/strict'

describe('getSnowDepthRatio', () => {
  it('should return ratio 20 for very cold temperatures (< -15°C)', () => {
    assert.equal(getSnowDepthRatio(-20, 1.0), 20)
    assert.equal(getSnowDepthRatio(-15.1, 1.0), 20)
  })

  it('should return ratio 15 for cold temperatures (-15°C to -10°C)', () => {
    assert.equal(getSnowDepthRatio(-15, 1.0), 15)
    assert.equal(getSnowDepthRatio(-12, 1.0), 15)
  })

  it('should return ratio 12 for dry snow temperatures (-10°C to -5°C)', () => {
    assert.equal(getSnowDepthRatio(-10, 1.0), 12)
    assert.equal(getSnowDepthRatio(-7, 1.0), 12)
  })

  it('should return ratio 10 for normal snow temperatures (-5°C to 0°C)', () => {
    assert.equal(getSnowDepthRatio(-5, 1.0), 10)
    assert.equal(getSnowDepthRatio(-1, 1.0), 10)
  })

  it('should return ratio 6 for wet snow temperatures (0°C to 2°C)', () => {
    assert.equal(getSnowDepthRatio(0, 1.0), 6)
    assert.equal(getSnowDepthRatio(1, 1.0), 6)
  })

  it('should return ratio 5 for very wet snow (>= 2°C)', () => {
    assert.equal(getSnowDepthRatio(2, 1.0), 5)
    assert.equal(getSnowDepthRatio(5, 1.0), 5)
  })

  it('should apply snowDensityFactor as multiplier', () => {
    assert.equal(getSnowDepthRatio(-20, 0.5), 10)
    assert.equal(getSnowDepthRatio(-20, 2.0), 40)
  })
})

describe('formatSnowValue', () => {
  const forecast = { maxTemperature: -2, minTemperature: -8 } // Avg -5°C → ratio 10

  it('should return mm unit without conversion when convertSnowToDepth is false (metric)', () => {
    const result = formatSnowValue(5, forecast, { units: 'metric', convertSnowToDepth: false, snowDensityFactor: 1.0 })
    assert.equal(result.unit, 'mm')
    assert.equal(result.value, 5)
  })

  it('should convert mm water to cm snow depth (metric)', () => {
    // Avg temp = -5°C → ratio = 10, 5mm water × 10 / 10 = 5cm
    const result = formatSnowValue(5, forecast, { units: 'metric', convertSnowToDepth: true, snowDensityFactor: 1.0 })
    assert.equal(result.unit, 'cm')
    assert.equal(result.value, 5)
  })

  it('should convert inches water to inches snow depth (imperial)', () => {
    // Avg temp in Fahrenheit: max 27.4°F, min 17.6°F → avg ~22.5°F → ~-5.3°C → ratio 12
    const imperialForecast = { maxTemperature: 27.4, minTemperature: 17.6 },
      result = formatSnowValue(0.2, imperialForecast, { units: 'imperial', convertSnowToDepth: true, snowDensityFactor: 1.0 })
    assert.equal(result.unit, 'in')
    assert.ok(result.value > 0.2) // Depth > water equivalent
  })

  it('should return in unit without conversion when convertSnowToDepth is false (imperial)', () => {
    const result = formatSnowValue(0.5, forecast, { units: 'imperial', convertSnowToDepth: false, snowDensityFactor: 1.0 })
    assert.equal(result.unit, 'in')
    assert.equal(result.value, 0.5)
  })

  it('should apply snowDensityFactor to result', () => {
    const resultDouble = formatSnowValue(5, forecast, { units: 'metric', convertSnowToDepth: true, snowDensityFactor: 2.0 }),
      resultNormal = formatSnowValue(5, forecast, { units: 'metric', convertSnowToDepth: true, snowDensityFactor: 1.0 })
    assert.equal(resultDouble.value, resultNormal.value * 2)
  })
})
