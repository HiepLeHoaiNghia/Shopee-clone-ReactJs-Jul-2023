/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { SVGEyeClose, SVGEyeOpen } from 'src/assets/svg'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  classNameEye?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  errorMessage,
  className,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
  classNameEye,
  name,
  register,
  rules,
  type,
  ...rest
}: Props) {
  const [openEye, setOpenEye] = useState(false)
  const registerResult = register && name ? register(name, rules) : null

  const toggleEye = () => {
    setOpenEye((prev) => !prev)
  }

  const handleType = () => {
    if (type === 'password') {
      return openEye ? 'text' : 'password'
    }
    return type
  }

  return (
    <div className={`relative ${className}`}>
      <input className={classNameInput} {...registerResult} {...rest} type={handleType()} />
      {type === 'password' && openEye && <SVGEyeOpen className={classNameEye} onClick={toggleEye} />}
      {type === 'password' && !openEye && <SVGEyeClose className={classNameEye} onClick={toggleEye} />}
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
