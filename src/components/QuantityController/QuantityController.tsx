import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

const QuantityController = ({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  classNameWrapper = 'ml-10',
  value,
  ...rest
}: Props) => {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocalValue(_value)
  }
  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    if ((value as number) < (max as number)) {
      setLocalValue(_value)
      onIncrease && onIncrease(_value)
    }
  }
  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (max !== undefined && _value < 1) {
      _value = 1
    }
    if ((value as number) > 1) {
      setLocalValue(_value)
      onDecrease && onDecrease(_value)
    }
  }
  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }
  return (
    <div className={'flex items-center' + classNameWrapper}>
      <button
        onClick={decrease}
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        onBlur={handleBlur}
        onChange={handleChange}
        value={value || localValue}
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-14 border-b border-t border-gray-300 p-1 text-center outline-none'
        {...rest}
      />
      <button
        onClick={increase}
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}

export default QuantityController
