import range from 'lodash/range'
import { useEffect, useState } from 'react'

interface Props {
  errorMessage?: string
  classNameError?: string
  onChange?: (value: Date) => void
  value?: Date
}

export default function DateSelect({
  value,
  errorMessage,
  onChange,
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600'
}: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1970
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: valueFromSelect } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>ngày sinh</div>
      <div className='w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            value={value?.getDate() || date.date}
            name='date'
            className='border- h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-orange'
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            value={value?.getMonth() || date.month}
            name='month'
            className='border- h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-orange'
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            name='year'
            className='border- h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-orange'
          >
            <option disabled>Năm</option>
            {range(1970, 2024).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={classNameError}>{errorMessage}</div>
      </div>
    </div>
  )
}
