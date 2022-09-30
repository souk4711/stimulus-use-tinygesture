export const findController = (application, selector, controllerName) => {
  const ele = document.querySelector(selector)
  return application.getControllerForElementAndIdentifier(ele, controllerName)
}

export const nextFrame = async () => {
  return new Promise((resolve) => requestAnimationFrame(resolve))
}

export const mouseDown = (selector, mouseEventInit) => {
  const ele = document.querySelector(selector)
  const e = new MouseEvent('mousedown', { bubbles: true, ...mouseEventInit })
  ele.dispatchEvent(e)
  return nextFrame()
}

export const mouseUp = (selector, mouseEventInit) => {
  const ele = document.querySelector(selector)
  const e = new MouseEvent('mouseup', { bubbles: true, ...mouseEventInit })
  ele.dispatchEvent(e)
  return nextFrame()
}
