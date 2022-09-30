import { Controller } from '@hotwired/stimulus'
import TinyGesture, { Events, Options as TinyGestureOptions } from 'tinygesture'

export type Handler<E, G> = (event: E, gesture: G) => void
export type Handlers = {
  [E in keyof Events]: Array<Handler<Events[E], TinyGesture>>
}

export interface Options<ElementType extends HTMLElement> {
  element?: ElementType
  tinygesture?: Partial<TinyGestureOptions<ElementType>>
  handlers: Handlers
}

export class UseTinyGesture<ElementType extends HTMLElement> {
  gesture?: TinyGesture<ElementType>

  constructor(controller: Controller, options: Options<ElementType>) {
    let element = options.element
    if (element === undefined) {
      element = controller.element as ElementType
    }

    const tinyGestureOptions = options.tinygesture
    const gesture = new TinyGesture<ElementType>(element, tinyGestureOptions)
    Object.entries(options.handlers).forEach(([eventName, handlers]) => {
      for (let i = 0; i < handlers.length; i++) {
        const handler = handlers[i].bind(controller)
        gesture.on(eventName as keyof Events, (event) => {
          handler(event, gesture)
        })
      }
    })

    this.gesture = gesture
  }

  destroy(): void {
    if (this.gesture !== undefined) {
      this.gesture.destroy()
      this.gesture = undefined
    }
  }
}

export function useTinyGesture<ElementType extends HTMLElement = HTMLElement>(
  controller: Controller,
  options: Options<ElementType>
): UseTinyGesture<ElementType> {
  const gesture = new UseTinyGesture<ElementType>(controller, options)

  const controllerDisconnect = controller.disconnect.bind(controller)
  Object.assign(controller, {
    disconnect() {
      controllerDisconnect()
      gesture.destroy()
    }
  })

  return gesture
}
