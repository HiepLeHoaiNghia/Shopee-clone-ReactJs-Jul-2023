/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'

export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>
//* generic type lấy từ ControllerRenderProps trong UseControllerProps
function InputVer2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  //* useState nhận vài giá trị khởi tạo là value từ user truyền vào
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      //* chỉ khi là số hoặc ""
      //* cập nhật localValue bằng value từ ngoài truyền vào
      setLocalValue(valueFromInput)
      //* gọi field.onChange để cập nhật vào state react hook form
      field.onChange(event)
      //* nếu có onChange thì thực thi onChange callback từ ngoài truyền vào để set lại value
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} value={value || localValue} onChange={handleChange} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputVer2
