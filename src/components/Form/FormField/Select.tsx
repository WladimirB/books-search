import React from 'react'

import { ReactComponent as ArrowDown } from 'assets/images/down-chevron.svg'
import styled from 'styled-components'
import { baseTheme } from 'styles/theme'

type TOption = {
  label: string
  value: string
}

type OptionProps = {
  option: TOption
  onClick: (value: TOption['value']) => void
}

const Option = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  padding: 5px;
  border: 1px;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  background-color: ${baseTheme.colors.white};
  color: ${baseTheme.colors.font};
  border-radius: ${baseTheme.borderRadius / 2}px;
`

const OptionEl = (props: OptionProps) => {
  const {
    option: { value, label },
    onClick,
  } = props
  const optionRef = React.useRef<HTMLLIElement>(null)

  const handleClick =
    (clickedValue: TOption['value']): React.MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue)
    }

  React.useEffect(() => {
    const option = optionRef.current
    if (!option) return
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === option && event.key === 'Enter') {
        onClick(value)
      }
    }

    option.addEventListener('keydown', handleEnterKeyDown)
    return () => {
      option.removeEventListener('keydown', handleEnterKeyDown)
    }
  }, [value, onClick])

  return (
    <Option
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
      data-testid={`select-option-${value}`}
      ref={optionRef}
    >
      {label}
    </Option>
  )
}

type SelectProps = {
  value?: string | null
  options: TOption[]
  placeholder?: string
  status?: 'default' | 'invalid'
  onChange?: (selected: TOption['value']) => void
  onClose?: () => void
}

const SelectedWrapper = styled.div`
  position: relative;
  border-radius: ${baseTheme.borderRadius / 2}px;
  border: 2px solid ${baseTheme.colors.input};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${baseTheme.colors.white};

  &[data-is-active='true'] .arrow svg {
    transform: rotate(180deg);
  }

  // &[data-is-active='true'] .placeholder,
  // &:focus .placeholder,
  // &:focus-within .placeholder {
  //   border: 2px solid ${baseTheme.colors.primary};
  // }

  .placeholder {
    border: 1px solid transparent;
  }

  .placeholder:focus,
  .placeholder:focus-visible,
  .placeholder:focus-within,
  li:focus,
  li:focus-visible,
  li:focus-within {
    border: 1px solid ${baseTheme.colors.primary};
    outline: 1px solid ${baseTheme.colors.primary};
  }

  // &:not([data-is-active='true']) .placeholder:not([data-status='invalid']):hover {
  //   border: 1px solid rgba(0, 0, 0, 0.2);
  // }
`

const ArrowWrapper = styled.div`
  position: absolute;
  right: 4px;
  height: 100%;
  padding: ${baseTheme.padding.input / 2}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    transition: transform 0.2s ease-in-out;
  }
`

const Placeholder = styled.div`
  padding: ${baseTheme.padding.input / 2}px ${baseTheme.padding.input}px;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${baseTheme.colors.font};
  background: ${baseTheme.colors.white};
  width: 100%;

  &[data-status='invalid'] {
    border: 1px solid ${baseTheme.colors.danger};
  }
`

const SelectList = styled.ul`
  display: grid;
  position: absolute;
  list-style: none;
  top: 40px;
  width: 100%;
  margin: 0;
  z-index: 10;
  background-color: ${baseTheme.colors.white};
  border-radius: ${baseTheme.borderRadius / 2}px;
  padding: ${baseTheme.padding.input}px;
`

export const Select = (props: SelectProps) => {
  const { options, placeholder, status = 'default', value, onChange, onClose } = props
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const placeholderRef = React.useRef<HTMLDivElement>(null)
  const selected = options.find((option) => option.value === value)

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.()
        setIsOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose])

  React.useEffect(() => {
    const placeholderEl = placeholderRef.current
    if (!placeholderEl) return

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setIsOpen((prev) => !prev)
      }
    }
    placeholderEl.addEventListener('keydown', handleEnterKeyDown)

    return () => {
      placeholderEl.removeEventListener('keydown', handleEnterKeyDown)
    }
  }, [])

  const handleOptionClick = (value: TOption['value']) => {
    setIsOpen(false)
    onChange?.(value)
  }
  const handlePlaceHolderClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <SelectedWrapper ref={rootRef} data-is-active={isOpen}>
      <Placeholder
        className='placeholder'
        data-status={status}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        role='button'
        tabIndex={0}
        ref={placeholderRef}
      >
        {selected?.label || placeholder}
      </Placeholder>
      <ArrowWrapper className='arrow'>
        <ArrowDown />
      </ArrowWrapper>
      {isOpen && (
        <SelectList>
          {options.map((option) => (
            <OptionEl key={option.value} option={option} onClick={handleOptionClick} />
          ))}
        </SelectList>
      )}
    </SelectedWrapper>
  )
}
