import { useForm } from 'react-hook-form'
import { UserSchema, userSchema } from 'src/utils/rules'

import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import userApi, { BodyUpdateProfile } from 'src/apis/user.api'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse, NoUndefinedField } from 'src/types/utils.type'
import omit from 'lodash/omit'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema } from 'yup'
import { Helmet } from 'react-helmet-async'

type FormData = NoUndefinedField<Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver<FormData>(passwordSchema as ObjectSchema<FormData>)
  })

  const updateProfileMutation = useMutation(userApi.updateProfile)
  console.log('updateProfileMutation', updateProfileMutation)

  const onSubmit = handleSubmit(async (data: Omit<FormData, 'confirm_password'>) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']) as BodyUpdateProfile)
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        //use Object loop to check
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <Helmet>
        <title>Đổi mật khẩu | Shopee clone</title>
        <meta name='description' content='Trang đổi mật khẩu user' />
      </Helmet>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-left'>Mật khẩu cũ</div>
            <div className='w-[80%] sm:pl-5'>
              <Input
                classNameEye='w-6 h-6 top-1.5'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='password'
                type='password'
                placeholder='Mật khẩu cũ'
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-left'>Mật khẩu mới</div>
            <div className='w-[80%] sm:pl-5'>
              <Input
                classNameEye='w-6 h-6 top-1.5'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='new_password'
                type='password'
                placeholder='Mật khẩu mới'
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-left'>Nhập laị mật khẩu mới</div>
            <div className='w-[80%] sm:pl-5'>
              <Input
                classNameEye='w-6 h-6 top-1.5'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='confirm_password'
                type='password'
                placeholder='Nhập lại mật khẩu mới'
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>
          <div className='mt-8 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='w-[80%] sm:pl-5'>
              <div className='flex justify-between'>
                <Button
                  type='submit'
                  className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
