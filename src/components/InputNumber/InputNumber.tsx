/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    value,
    onChange,
    ...rest
  },
  ref
) {
  //* useState nhận vài giá trị khởi tạo là value từ user truyền vào
  const [localValue, setLocalValue] = useState<string>((value || '') as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      //* chỉ khi là số hoặc ""
      //* nếu có onChange thì thực thi onChange callback từ ngoài truyền vào để set lại value
      onChange && onChange(event)
      //* cập nhật localValue bằng value từ ngoài truyền vào
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input
        className={classNameInput}
        //* khi k onChange truyền vào và giá trị nhập vào k phải số thì value sẽ là undefined và value lúc này sẽ lấy từ localValue, useState của localValue có giá trị khởi tạo là value = "" từ props nên giá trị mặc định value = "" sẽ đc cập nhật vào input
        value={value === undefined ? localValue : value}
        onChange={handleChange}
        {...rest}
        ref={ref}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber
