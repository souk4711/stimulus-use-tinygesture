/* global fixture */

import { Application, Controller } from '@hotwired/stimulus'
import { expect } from 'chai'
import { useTinyGesture } from '../dist'
import { findController, nextFrame, mouseDown, mouseUp } from './helpers'

class TappableController extends Controller {
  static id = '#tappable'
  static name = 'tappable'
  static HTML = '<div data-controller="tappable" id="tappable" />'

  connect() {
    useTinyGesture(this, {
      handlers: {
        tap: [this.tapHandler]
      }
    })
  }

  tapHandler(_, gesture) {
    this.lastGesture = gesture
  }
}

describe('useTinyGesture', () => {
  let application

  before(() => {
    application = Application.start()
    application.register(TappableController.name, TappableController)
  })

  after(() => {
    application.stop()
  })

  beforeEach(async () => {
    fixture.set(TappableController.HTML)
    await nextFrame()
  })

  it('#tapHandler', async () => {
    await mouseDown(TappableController.id, { screenX: 1, screenY: 1 })
    await mouseUp(TappableController.id, {})

    const controller = findController(
      application,
      TappableController.id,
      TappableController.name
    )
    expect(controller.lastGesture.touchStartX).to.eq(1)
    expect(controller.lastGesture.touchStartY).to.eq(1)
    expect(controller.lastGesture.touchEndX).to.eq(0)
    expect(controller.lastGesture.touchEndY).to.eq(0)
  })
})
