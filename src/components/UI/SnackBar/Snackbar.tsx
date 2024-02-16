import styled from 'styled-components'
import Container from '../Container'
import { startTransition, useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { useOnTrasnsitionStart } from 'hooks/useOnTransitionStart'
import { createPortal } from 'react-dom'
import { CancelToken, delay } from 'utils/delay'
import { ReactComponent as Close } from 'assets/images/close-icon.svg'

export type TSnackbarType = 'primary' | 'success' | 'error' | 'warning'
type TSnackbarPosition = 'top' | 'bottom'

export interface SnackbarProps {
  children: string
  type?: TSnackbarType
  padding?: number
  isShow?: boolean
  onClose?: () => void
  zIndex?: number
  elevation?: number
  radius?: number
  duration?: number | null
  color?: string
  position?: TSnackbarPosition
  offset?: number
}

const Styled = styled.div<{
  $type?: TSnackbarType
  $isShow?: boolean
  $elevation?: number
  $radius?: number
  $color?: string
}>`
  background-color: ${(props) => 'var(--app-' + props.$type + ')'};
  color: ${(props) => props.$color || '#ffffff'};
  height: auto;
  width: ${(props) => (props.$isShow ? '100%' : 0)};
  float: right;
  border-radius: ${(props) => (props.$radius || 8) + 'px'};
  transition: width ease-in-out 0.5s;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  box-shadow: ${(props) => {
    const value = `${props.$elevation}px`
    return `${value} ${value} ${(props.$elevation || 0) * 2.5}px rgba(0, 0, 0, 0.6)`
  }};
`
const Padding = styled.div<{ $padding?: number; $isHidden: boolean }>`
  padding: ${(props) => (props.$padding || 15) + 'px'};
  display: ${(props) => (props.$isHidden ? 'none' : 'block')};
  ${(props) => (props.$isHidden ? null : 'min-height: 52px')};
  position: relative;
  max-height: 100px;
  white-space: pre-line;
`

const StyledContainer = styled.div<{
  $isHidden?: boolean
  $zIndex?: number
  $position: TSnackbarPosition
  $offset?: number
}>`
  padding: 0;
  position: fixed;
  ${(props) => `${props.$position}: ${props.$offset || 15}px;`}
  width: 100%;
  z-index: ${(props) => (props.$isHidden ? '-1' : props.$zIndex || 'auto')};

  .container {
    padding: 0;
  }
`

const Button = styled.button<{ $padding?: number }>`
  background-color: transparent;
  padding: 0;
  border: 0;
  cursor: pointer;
  height: 25px;
  position: absolute;
  top: ${(props) => (props.$padding || 15) + 'px'};
  right: ${(props) => (props.$padding || 15) + 'px'};

  svg {
    fill: #fff;
    width: 20px;
    height: 20px;
  }
`

const Stub = styled.div`
  float: right;
  width: 30px;
  height: 30px;
`

export const Snackbar: React.FC<SnackbarProps> = ({
  children,
  type,
  padding,
  isShow,
  onClose,
  zIndex,
  elevation,
  radius,
  color,
  duration,
  position,
  offset,
}) => {
  const cancelToken = useMemo(() => (duration ? new CancelToken() : undefined), [duration])
  const [show, setShow] = useState(isShow)
  const [isHidden, setIsHidden] = useState(true)
  const [content, setContent] = useState(children)
  const ref = useRef<HTMLDivElement>(null)

  const closeCallback = useCallback(() => {
    setShow(false)
    onClose && onClose()
  }, [onClose])

  useEffect(() => {
    if (duration) {
      if (show) {
        delay(duration, cancelToken).then(() => {
          closeCallback()
        })
      }
    }
    return () => {
      cancelToken && cancelToken.cancel()
    }
  }, [show, cancelToken, closeCallback, duration])

  useEffect(() => {
    setShow(isShow)
  }, [isShow])

  useEffect(() => {
    setContent((prev) => {
      if (children) {
        return children
      }
      return prev
    })
  }, [children])

  useOnTrasnsitionStart(
    ref,
    () => {
      if (show) {
        startTransition(() => setIsHidden(false))
      }
    },
    [show],
  )

  const close = () => {
    cancelToken && cancelToken.cancel()
    closeCallback()
  }
  return createPortal(
    <StyledContainer
      $isHidden={isHidden}
      $zIndex={zIndex}
      $position={position || 'top'}
      $offset={offset}
    >
      <Container className='container'>
        <Styled
          $type={type}
          $isShow={show}
          $radius={radius}
          $elevation={elevation}
          $color={color}
          role='alert'
          ref={ref}
          onTransitionEnd={() => {
            if (!isShow) {
              setIsHidden(true)
            }
          }}
        >
          <Padding $padding={padding} $isHidden={isHidden}>
            <Stub />
            {content}
            <Button onClick={close}>
              <Close />
            </Button>
          </Padding>
        </Styled>
      </Container>
    </StyledContainer>,
    document.body,
  )
}

Snackbar.defaultProps = {
  duration: 1500,
  color: '#ffffff',
  radius: 8,
  elevation: 2,
  type: 'primary',
}
