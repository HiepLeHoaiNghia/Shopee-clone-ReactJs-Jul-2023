import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

//validate without yup
// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: { value: true, message: 'Vui lòng nhập email' },
//     pattern: {
//       value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//       message: 'Email không đúng'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 5 đến 160 ký tự'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài từ 5 đến 160 ký tự'
//     }
//   },
//   password: {
//     required: { value: true, message: 'Password là bắt buộc' },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 đến 160 ký tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 đến 160 ký tự'
//     }
//   },
//   confirm_password: {
//     required: { value: true, message: 'Nhập lại password là bắt buộc' },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 đến 160 ký tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 đến 160 ký tự'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
//         : undefined
//   }
// })

// validate and make type with yup
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tên từ 1 - 160 ký tự').trim(),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Số điện thoại không đúng định dạng')
    .min(10, 'Số điện thoại không đúng định dạng')
    .max(10, 'Số điện thoại không đúng định dạng')
    .trim(),
  address: yup.string().max(160, 'Độ dài địa chỉ từ 1 - 160 ký tự').trim(),
  date_of_birth: yup.date().max(new Date(), 'Ngày sinh không hợp lệ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >,
  avatar: yup.string().trim().max(1000, 'Độ dài avatar từ 1 - 1000 ký tự')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
