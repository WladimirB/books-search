import EventTarget from 'events'

export function delay(duration?: number): Promise<void>
export function delay(duration?: number, cancel?: CancelToken): Promise<void>

export function delay(duration?: number, cancel?: unknown): Promise<unknown> {
  if (duration && !cancel) {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), duration)
    })
  } else if (duration && cancel && cancel instanceof CancelToken) {
    let timerID: NodeJS.Timeout | null = null
    const listener = () => timerID && clearTimeout(timerID)
    cancel.addListener(cancel.cancelEventName, listener)
    return new Promise<void>((resolve) => {
      timerID = setTimeout(() => {
        resolve()
        timerID = null
        cancel.removeListener(cancel.cancelEventName, listener)
      }, duration)
    })
  } else {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000)
    })
  }
}

export class CancelToken extends EventTarget {
  cancelEventName = 'cancel'
  constructor() {
    super()
    this.cancel = this.cancel.bind(this)
  }

  cancel() {
    this.emit(this.cancelEventName)
  }
}
