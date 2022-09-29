import { useTinyGesture } from '../dist'
import { expect } from 'chai'

describe('useTinyGesture', () => {
  it('returns function name', () => {
    expect(useTinyGesture()).to.equal('useTinyGesture')
  })
})
