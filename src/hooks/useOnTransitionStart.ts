import React from 'react'

export function useOnTrasnsitionStart(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  deps: any[],
) {
  React.useEffect(() => {
    const node = ref
    if (node.current) {
      node.current.addEventListener('transitionstart', handler)
    }
    return () => node?.current?.removeEventListener('transitionstart', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps])
}
